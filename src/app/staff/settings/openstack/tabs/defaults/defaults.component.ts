import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FormBuilder, Validators } from '@angular/forms';
import { SettingsOpenstackApiService } from '../../../../../shared/fleio-api/core/settings-openstack-api.service';
import { IOpenstackDefaultsModel } from '../../../../../shared/fleio-api/core/model/openstack-defaults.model';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-defaults',
  templateUrl: './defaults.component.html',
  styleUrls: ['./defaults.component.scss']
})
export class DefaultsComponent extends DetailsFormBase<IBaseFleioObjectModel> {
  defaultsLoading = false;
  defaultsForm = this.formBuilder.group({
    timeout: [60, Validators.required],
    default_role: ['', Validators.required],
    default_region: ['', Validators.required],
    project_domain_id: ['', Validators.required],
    default_project_name: ['', Validators.required],
    default_project_description: ['', Validators.required],
    force_config_drive_for_instance_creation: [false],
    auto_allocated_topology: [true],
    hide_projects_and_api_users: [false],
    hide_project_ids: [''],
    prefix_api_users_with_username: [false],
  })

  defaults: IOpenstackDefaultsModel;

  constructor(
    private formBuilder: FormBuilder, private settingsOpenstackApi: SettingsOpenstackApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  initTabData() {
    this.defaultsLoading = true;
    this.settingsOpenstackApi.getDefaults().subscribe(defaults => {
      this.defaults = defaults;
      this.defaultsForm.patchValue(defaults);
    }).add(() => {
      this.defaultsLoading = false;
    });
  }

  save() {
    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    const defaults = this.defaultsForm.value;

    return this.settingsOpenstackApi.saveDefaults(defaults).pipe(catchError((error) => {
      if (error.error) {
        this.setErrors(error.error);
        return EMPTY;
      } else {
        throw error;
      }
    })).subscribe((response) => {
      this.notificationService.showMessage(response.detail);
    });
  }
}
