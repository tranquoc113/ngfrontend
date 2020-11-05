import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigurationsApiService } from '../../../../shared/fleio-api/configurations/configurations-api.service';
import { ConfigService } from '../../../../shared/config/config.service';
import { IConfigurationOpenstackModel } from '../../../../shared/fleio-api/configurations/model/configuration-openstack.model';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { NotificationService } from '../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-openstack-plugin-configuration',
  templateUrl: './openstack-plugin-configuration.component.html',
  styleUrls: ['./openstack-plugin-configuration.component.scss']
})
export class OpenstackPluginConfigurationComponent extends DetailsFormBase<IConfigurationOpenstackModel> implements OnInit {
  configurationOpenstackForm = this.formBuilder.group({
    // Openstack
    auto_cleanup_images: [false],
    auto_cleanup_number_of_days: ['', Validators.required],
    auto_cleanup_image_types: ['', Validators.required],
  });

  updatingControls = false;
  openstackConfiguration: IConfigurationOpenstackModel;

  constructor(
    private formBuilder: FormBuilder, private configurationsApiService: ConfigurationsApiService,
    private config: ConfigService, private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.openstackConfiguration =
        this.objectController.additionalObjects.openstackConfiguration as IConfigurationOpenstackModel;
    }
    this.configurationOpenstackForm.valueChanges.subscribe(() => {
      if (!this.updatingControls) {
        this.updatingControls = true;
        this.updateControls();
        this.updatingControls = false;
      }
    });
    if (this.openstackConfiguration) {
      this.configurationOpenstackForm.patchValue(this.openstackConfiguration);
    }
  }

  protected initTabData() {
    this.objectController.actionCallback = () => this.saveConfiguration();
  }

  updateControls() {
    const controls = this.configurationOpenstackForm.controls;
    if (controls.auto_cleanup_images.value) {
      controls.auto_cleanup_number_of_days.enable();
      controls.auto_cleanup_image_types.enable();
    } else {
      controls.auto_cleanup_number_of_days.disable();
      controls.auto_cleanup_image_types.disable();
    }
  }

  saveConfiguration(): Observable<IActionResult> {
    const value = this.configurationOpenstackForm.value;
    let request;

    value.id = this.object.id;
    if (typeof value.auto_cleanup_image_types === 'string') {
      value.auto_cleanup_image_types = value.auto_cleanup_image_types.split(',');
    }

    request = this.configurationsApiService.objectPutAction(value.id, 'openstack', value);

    request.subscribe((response) => {
      this.notificationService.showMessage(response.detail);
    }, (error) => {
      this.setErrors(error.error);
    });

    return of(null);
  }
}
