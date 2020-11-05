import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPluginComponent } from '@shared/plugins/interfaces/plugin-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModuleSettingsHelper } from '@fleio-api/billing/products/product-module-settings-helper';
import { ConfigService } from '@shared/config/config.service';
import { IServerGroupModel } from '@fleio-api/servers/model/server-group.model';
import { ServerGroupsApiService } from '@fleio-api/servers/server-groups-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit, OnDestroy, IPluginComponent {
  productSettingsForm = this.formBuilder.group({
    cpanel_package_id: ['', Validators.required],
    cpanel_group_id: ['', Validators.required],
  });
  serverGroups: Array<IServerGroupModel> = [];
  public data: {
    productModuleSettingsHelper: ProductModuleSettingsHelper,
    productModuleSettings: any
  };
  backendErrors = {};
  mainFormSubmittedSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private serverGroupsApiService: ServerGroupsApiService,
    public config: ConfigService,
  ) { }

  displayFormErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).map(name => {
      const control = formGroup.controls[name];
      if (control instanceof FormGroup) {
        this.displayFormErrors(control);
      } else {
        if (control.invalid) {
          control.markAsTouched();
        }
      }
    });
  }

  onMainFormSubmit() {
    if (this.productSettingsForm.invalid) {
      this.displayFormErrors(this.productSettingsForm);
    }
  }

  ngOnInit(): void {
    this.serverGroupsApiService.list().subscribe(response => {
      this.serverGroups = response.objects;
    });
    if (this.data) {
      this.data.productModuleSettingsHelper.form = this.productSettingsForm;
      this.mainFormSubmittedSubscription = this.data.productModuleSettingsHelper.observableMainFormSubmitted
        .subscribe(value => {
          if (value === true) {
            this.onMainFormSubmit();
          }
        });
    }
    if (this.data && this.data.productModuleSettings) {
      this.productSettingsForm.patchValue(this.data.productModuleSettings);
      this.productSettingsForm.addControl(
        'product', this.formBuilder.control(this.data.productModuleSettings.product)
      );
    }
    this.productSettingsForm.valueChanges.subscribe(value => {
      this.data.productModuleSettingsHelper.moduleSettings = value;
    });
  }

  ngOnDestroy() {
    if (this.data) {
      this.data.productModuleSettingsHelper.mainFormSubmitted.next(false);
    }
    if (this.mainFormSubmittedSubscription) {
      this.mainFormSubmittedSubscription.unsubscribe();
      this.mainFormSubmittedSubscription = null;
    }
  }

}
