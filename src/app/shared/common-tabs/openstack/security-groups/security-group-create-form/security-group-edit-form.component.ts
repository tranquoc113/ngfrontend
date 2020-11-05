import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';
import { Observable, of } from 'rxjs';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { ISecurityGroupCreateOptionsModel } from '@fleio-api/openstack/model/security-group-create-options.model';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-security-group-edit-form',
  templateUrl: './security-group-edit-form.component.html',
  styleUrls: ['./security-group-edit-form.component.scss']
})
export class SecurityGroupEditFormComponent extends DetailsFormBase<ISecurityGroupModel> implements OnInit {
  securityGroupForm = this.formBuilder.group({
    client: ['', Validators.required],
    region: ['', Validators.required],
    name: ['', Validators.required],
    description: ['']
  });
  filteredClients$: Observable<IClientModel[]>;
  createOptions: ISecurityGroupCreateOptionsModel;
  clientField = this.securityGroupForm.controls.client;
  isCreateForm = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private securityGroupsApiService: SecurityGroupsApiService,
    private clientsApi: ClientsApiService,
    private router: Router,
    private config: ConfigService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  saveSecGroup() {
    let value = this.securityGroupForm.value;
    if (this.isCreateForm) {
      if (value.client) {
        if (!value.client.id) {
          this.setErrors({client: 'Select a valid value.'});
          return of(null);
        }
        value.client = value.client.id;
      }
    } else {
      const name = value.name;
      const description = value.description;
      value = this.object;
      value.name = name;
      value.description = description;
    }
    if (!this.securityGroupForm.invalid) {
      this.loading = true;
    }
    this.createOrUpdate(
      this.securityGroupsApiService,
      value,
      true
    ).subscribe(() => {
      if (this.isCreateForm) {
        this.router.navigateByUrl(
          this.config.getPrevUrl('openstack/security-groups')
        ).catch(() => {
        });
      } else {
        this.notificationService.showMessage('Security group update scheduled');
        this.router.navigateByUrl(
          this.config.getPanelUrl(`openstack/security-groups/${this.object.id}`)
        ).catch(() => {
        });
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
    return of(null);
  }

  clickedAutocompleteInput(formField: string) {
    this.securityGroupForm.get(formField).setValue('');
  }

  displayClientFn(client) {
    if (client) {
      return client.name || client.id;
    }
    return '';
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveSecGroup();
    }
    if (this.object && this.object.id) {
      this.securityGroupForm.patchValue(this.object);
      this.securityGroupForm.controls.region.disable();
      this.securityGroupForm.controls.client.disable();
    } else {
      this.isCreateForm = true;
      if (this.objectController) {
        this.createOptions = this.objectController.additionalObjects.createOptions;
      }
      if (this.createOptions && this.createOptions.selected_region) {
        this.securityGroupForm.controls.region.setValue(this.createOptions.selected_region);
      }
    }
    this.filteredClients$ = this.clientField.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.clientsApi.list({
          search: value,
        }).pipe(map(clientsList => clientsList.objects));
      })
    );
  }

}
