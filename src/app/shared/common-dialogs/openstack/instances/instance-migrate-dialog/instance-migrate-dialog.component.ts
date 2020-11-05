import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { IInstanceMigrateOptionsModel } from '@fleio-api/openstack/model/instance-migrate-options.model';

@Component({
  selector: 'app-instance-migrate-dialog',
  templateUrl: './instance-migrate-dialog.component.html',
  styleUrls: ['./instance-migrate-dialog.component.scss']
})
export class InstanceMigrateDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  instanceMigrateForm = this.formBuilder.group({
    hypervisor: ['', Validators.required],
    block_migration: [false, Validators.required],
    current_hypervisor: [null],
    live_migrate: [true, Validators.required],
    over_commit: [false, Validators.required],
  });
  backendErrors = {};
  migrateOptions: IInstanceMigrateOptionsModel | null;
  constructor(
    public dialogRef: MatDialogRef<InstanceMigrateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { instance: IInstanceModel },
    private instancesApiService: InstancesApiService,
    private formBuilder: FormBuilder,
    ) {
  }

  public close() {
    this.dialogRef.close(false);
  }

  public migrate() {
    this.loading = true;
    if (!this.instanceMigrateForm.valid) {
      this.loading = false;
      return;
    }
    const value = this.instanceMigrateForm.value;
    if (value.hypervisor) {
      value.hypervisor = value.hypervisor.name;
    }
    if (this.data && this.data.instance) {
      this.instancesApiService.objectPostAction(
        this.data.instance.id,
        'migrate',
        value
      ).pipe().subscribe(response => {
        this.loading = false;
        this.dialogRef.close(true);
      }, error => {
        this.loading = false;
        this.backendErrors = error.error;
        this.formErrors.setBackendErrors(this.backendErrors);
      });
    }
  }

  ngOnInit() {
    this.loading = true;
    this.migrateOptions = null;
    if (this.data && this.data.instance) {
      this.instancesApiService.objectGetAction(
        this.data.instance.id,
        'migrate_options'
      ).pipe().subscribe((response: IInstanceMigrateOptionsModel) => {
        this.loading = false;
        this.migrateOptions = response;
        if (this.migrateOptions.hypervisors.length) {
          this.instanceMigrateForm.controls.hypervisor.setValue(this.migrateOptions.hypervisors[0]);
        }
      });
    }
  }

}
