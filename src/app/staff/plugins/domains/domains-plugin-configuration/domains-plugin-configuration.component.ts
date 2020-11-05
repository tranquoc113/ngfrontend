import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigurationsApiService } from '@fleio-api/configurations/configurations-api.service';
import { ConfigService } from '@shared/config/config.service';
import { EMPTY, Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IConfigurationDomainsModel } from '@fleio-api/configurations/model/configuration-domains.model';

@Component({
  selector: 'app-domains-plugin-configuration',
  templateUrl: './domains-plugin-configuration.component.html',
  styleUrls: ['./domains-plugin-configuration.component.scss']
})
export class DomainsPluginConfigurationComponent extends DetailsFormBase<IConfigurationDomainsModel> implements OnInit {
  configurationDomainsForm = this.formBuilder.group({
    // Domain options
    allow_domain_registration: [false],
    allow_domain_transfer: [false],
    // Default TLD
    enable_default_tld: [false],
    default_tld: ['', Validators.required],
    // Default nameservers
    enable_default_nameservers: [false],
    default_nameserver1: ['', Validators.required],
    default_nameserver2: [''],
    default_nameserver3: [''],
    default_nameserver4: [''],
  });

  updatingControls = false;
  domainsConfiguration: IConfigurationDomainsModel;

  constructor(
    private formBuilder: FormBuilder, private configurationsApiService: ConfigurationsApiService,
    private config: ConfigService, private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.domainsConfiguration =
        this.objectController.additionalObjects.domainsConfiguration as IConfigurationDomainsModel;
    }

    this.configurationDomainsForm.valueChanges.subscribe(() => {
      if (!this.updatingControls) {
        this.updatingControls = true;
        this.updateControls();
        this.updatingControls = false;
      }
    });

    if (this.domainsConfiguration) {
      this.configurationDomainsForm.patchValue(this.domainsConfiguration);
    }
  }

  protected initTabData() {
    this.objectController.actionCallback = () => this.saveConfiguration();
  }

  updateControls() {
    const controls = this.configurationDomainsForm.controls;
    if (controls.enable_default_tld.value) {
      controls.default_tld.enable();
    } else {
      controls.default_tld.disable();
    }
    if (controls.enable_default_nameservers.value) {
      controls.default_nameserver1.enable();
      controls.default_nameserver2.enable();
      controls.default_nameserver3.enable();
      controls.default_nameserver4.enable();
    } else {
      controls.default_nameserver1.disable();
      controls.default_nameserver2.disable();
      controls.default_nameserver3.disable();
      controls.default_nameserver4.disable();
    }
  }

  saveConfiguration(): Observable<IActionResult> {
    this.validate();
    if (this.configurationDomainsForm.invalid) {
      this.displayControlErrors();
      return of(null);
    }

    const value = this.configurationDomainsForm.getRawValue();
    let request;

    value.id = this.object.id;

    request = this.configurationsApiService.objectPutAction(value.id, 'domains', value);

    request.subscribe((response) => {
      this.notificationService.showMessage(response.detail);
    }, (error) => {
      this.setErrors(error.error);
    });

    return of(null);
  }
}
