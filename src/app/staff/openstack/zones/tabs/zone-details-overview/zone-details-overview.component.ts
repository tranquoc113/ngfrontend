import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRecordListModel } from '@fleio-api/openstack/zone/model/record-list.model';
import { IRecordsetModel } from '@fleio-api/openstack/zone/model/recordset.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { timer } from 'rxjs';

@Component({
  selector: 'app-zone-details-overview',
  templateUrl: './zone-details-overview.component.html',
  styleUrls: ['./zone-details-overview.component.scss']
})
export class ZoneDetailsOverviewComponent extends DetailsComponentBase<IZoneModel> implements OnInit {
  @ViewChild('formErrors') formErrors;
  recordsForm = this.formBuilder.group({
    recordsets: this.formBuilder.array([]),
  });

  recordsetControls = this.recordsForm.controls.recordsets as FormArray;
  recordsetGroups: {
    recordset: FormGroup,
    recordArray?: FormGroup[],
    canDeleteRecords?: boolean;
    fieldNames: string[];
    flex: string;
  }[] = [];
  recordsList: IRecordListModel;
  permissions: IPermissionsModel;
  displayRecordsets: IRecordsetModel[];
  loading = false;
  totalCount: number;
  loadedCount: number;
  saving = false;

  constructor(
    private zonesApiService: ZonesApiService,
    private refreshService: RefreshService,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.objectController) {
      if (this.objectController.additionalObjects) {
        this.recordsList = this.objectController.additionalObjects.records;
        this.permissions = this.objectController.additionalObjects.permissions;
      }
    }

    if (this.recordsList) {
      this.totalCount = this.recordsList.read_only_recordsets.length + this.recordsList.recordsets.length;
      this.loadedCount = this.recordsList.read_only_recordsets.length;
      this.displayRecordsets = [];

      // do not display all recordsets at once to avoid page locking up
      if (this.recordsList.recordsets.length > 0) {
        this.loading = true;
        let index = 0;
        const subscription = timer(0, 100).subscribe(() => {
          for (let i = 0; i < 25; i++) {
            this.displayRecordsets.push(this.recordsList.recordsets[index]);
            this.loadedCount++;
            index++;
            if (index >= this.recordsList.recordsets.length) {
              subscription.unsubscribe();
              this.loading = false;
              break;
            }
          }
        });
      }

      this.createRecordsetControls();
    }
  }

  recordsetTrackBy(recordset: IRecordsetModel) {
    return recordset.id;
  }

  getFieldNames(recordType: string): string[] {
    switch (recordType) {
      case 'MX':
        return ['priority', 'server'];
      case 'SSHFP':
        return ['algorithm', 'type', 'fingerprint'];
      case 'SRV':
        return ['priority', 'weight', 'port', 'hostname'];
      default:
        return ['text'];
    }
  }

  createRecordGroup(fieldNames: string[]): FormGroup {
    const recordGroup = this.formBuilder.group({});
    for (const fieldName of fieldNames) {
      recordGroup.addControl(
        fieldName,
        this.formBuilder.control(
          {value: ''}, [Validators.required]
        )
      );
    }

    return recordGroup;
  }

  textToObj(text: string, fieldNames: string[]): {} {
    const parts = text.split(' ');
    const obj = {};
    for (const [index, fieldName] of fieldNames.entries()) {
      obj[fieldName] = parts.length > index ? parts[index] : '';
    }
    return obj;
  }

  objToText(obj: {}, fieldNames: string[]): string {
    let text = '';
    for (const fieldName of fieldNames) {
      if (text) {
        text += ' '
      }
      text += obj[fieldName] ? obj[fieldName] : '';
    }

    return text;
  }

  addSingleRecordsetControls(recordsetIndex: number, recordset: IRecordsetModel) {
    const recordsetGroup = this.formBuilder.group({
      name: [recordset.name, Validators.required],
      ttl: [recordset.ttl, Validators.required],
      type: [recordset.type, Validators.required],
      records: this.formBuilder.array([]),
    });

    const recordControls = recordsetGroup.controls.records as FormArray;
    const recordArray = [];
    const fieldNames = this.getFieldNames(recordset.type);

    for (const record of recordset.records) {
      const recordControl = this.createRecordGroup(fieldNames);
      recordControl.setValue(this.textToObj(record, fieldNames));
      recordControls.push(recordControl);
      recordArray.push(recordControl);
    }

    if (!recordset.created) {
      recordsetGroup.controls.name.disable();
      recordsetGroup.controls.type.disable();
    }

    recordsetGroup.valueChanges.subscribe(() => {
      recordset.changed = true;
    });

    recordsetGroup.controls.type.valueChanges.subscribe((newType) => {
      this.updateRecordsetValues();
      this.recordsList.recordsets[recordsetIndex].type = newType;
      this.createRecordsetControls();
    })

    this.recordsetControls.controls.push(recordsetGroup);
    this.recordsetGroups.push({
      recordset: recordsetGroup,
      recordArray,
      canDeleteRecords: recordset.records.length > 1,
      fieldNames,
      flex: ((600 - 10 * (fieldNames.length - 1)) / fieldNames.length).toString() + 'px',
    });
  }

  createRecordsetControls() {
    this.recordsetControls.clear();
    this.recordsetGroups = [];
    for (const [recordsetIndex, recordset] of this.recordsList.recordsets.entries()) {
      if (this.recordsetControls)
        this.addSingleRecordsetControls(recordsetIndex, recordset);
    }
  }

  updateRecordsetValues() {
    for (const [index, recordsetGroup] of this.recordsetGroups.entries()) {
      if (recordsetGroup.recordset.dirty) {
        this.recordsList.recordsets[index] = {...this.recordsList.recordsets[index], ...recordsetGroup.recordset.value};
        const textRecords = [];
        for (const record of this.recordsList.recordsets[index].records) {
          textRecords.push(this.objToText(record, recordsetGroup.fieldNames));
        }
        this.recordsList.recordsets[index].records = textRecords;
      }
    }
  }

  addRecordset() {
    this.updateRecordsetValues();
    const recordset = {
      name: '',
      records: [''],
      ttl: 1800,
      type: 'A',
      created: true,
      zone_id: this.object.id,
    };
    this.recordsList.recordsets.push(recordset);
    this.displayRecordsets = [...this.recordsList.recordsets];
    this.createRecordsetControls();
  }

  deleteRecordset(recordsetIndex: number) {
    const recordset = this.recordsList.recordsets[recordsetIndex];
    this.notificationService.confirmDialog({
      message: 'Are you sure?',
      title: `Delete recordset ${recordset.id || ''}`,
    }).subscribe((response) => {
      if (response === 'yes') {
        this.updateRecordsetValues();
        this.recordsList.recordsets[recordsetIndex].deleted = true;
        this.displayRecordsets = [...this.recordsList.recordsets];
        this.createRecordsetControls();
      }
    })
  }

  addRecord(recordsetIndex: number) {
    this.updateRecordsetValues();
    this.recordsList.recordsets[recordsetIndex].records.push('');
    this.createRecordsetControls();
  }

  deleteRecord(recordsetIndex: number, recordIndex: number) {
    this.updateRecordsetValues();
    this.recordsList.recordsets[recordsetIndex].records.splice(recordIndex, 1);
    this.recordsList.recordsets[recordsetIndex].changed = true;
    this.createRecordsetControls();
  }

  saveChanges() {
    this.recordsForm.markAllAsTouched();
    const isInvalid = this.recordsetGroups.filter(
      recordsetGroup => recordsetGroup.recordset.valid === false
    ).length > 0;
    if (isInvalid) {
      return;
    }

    const recordsets: IRecordsetModel[] = [];
    this.updateRecordsetValues();
    for (const recordset of this.recordsList.recordsets) {
      if (recordset.changed || (recordset.deleted && !recordset.created)) {
        recordsets.push(recordset);
      }
    }

    this.formErrors.hide();
    this.saving = true;
    this.zonesApiService.synchronizeRecords(
      this.object.id, recordsets
    ).subscribe(
      (recordList: IRecordListModel) => {
        this.recordsList = recordList;
        this.displayRecordsets = [...recordList.recordsets];
        this.createRecordsetControls();
        this.notificationService.showMessage(recordList.detail);
      },
      (error) => {
        this.formErrors.setBackendErrors(error.error);
      }
    ).add(() => this.saving = false);
  }
}
