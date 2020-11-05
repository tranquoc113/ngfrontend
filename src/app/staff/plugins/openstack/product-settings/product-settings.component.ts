import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPluginComponent } from '@shared/plugins/interfaces/plugin-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionsApiService } from '@fleio-api/openstack/region/regions-api.service';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';
import { ProductModuleSettingsHelper } from '@fleio-api/billing/products/product-module-settings-helper';
import { ConfigService } from '@shared/config/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit, OnDestroy, IPluginComponent {
  productSettingsForm = this.formBuilder.group({
    run_get_me_a_network_on_auto_setup: [false],
    network_auto_allocated_topology_regions: ['', Validators.required]
  })
  public data: {
    productModuleSettingsHelper: ProductModuleSettingsHelper,
    productModuleSettings: any
  };
  regions: Array<IRegionModel> = [];
  mainFormSubmittedSubscription: Subscription;

  changedRun() {
    if (this.productSettingsForm.controls.run_get_me_a_network_on_auto_setup.value === false) {
      this.productSettingsForm.controls.network_auto_allocated_topology_regions.disable();
    } else {
      this.productSettingsForm.controls.network_auto_allocated_topology_regions.enable();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private regionsApiService: RegionsApiService,
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
    this.changedRun();
    this.regionsApiService.list().subscribe(response => {
      this.regions = response.objects;
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
    this.changedRun();
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
