import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { IServiceUpgradeOptionsModel } from '@fleio-api/billing/model/service-upgrade-options.model';
import { IServiceUpgradeModel } from '@fleio-api/billing/model/service-upgrade-.model';
import { ServicesApiService } from '@fleio-api/billing/services/service-api.service';

@Component({
  selector: 'app-service-change-options-form',
  templateUrl: './service-change-options-form.component.html',
  styleUrls: ['./service-change-options-form.component.scss']
})
export class ServiceChangeOptionsFormComponent extends DetailsFormBase<IServiceModel> implements OnInit {
  changeOptionsForm = this.formBuilder.group({
    newServiceCycle: ['', Validators.required],
  });

  upgradeOptions: IServiceUpgradeOptionsModel;
  upgradeInProgress: boolean;
  confirmChanges: boolean;
  optionsChanged: boolean;
  upgrade: IServiceUpgradeModel;
  configOptionValues: { [key: number]: string } = {}

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicesApi: ServicesApiService,
    public config: ConfigService,
  ) {
    super();
  }

  checkIfCycleChanged() {
    this.optionsChanged = this.changeOptionsForm.controls.newServiceCycle.value !== this.upgradeOptions.cycle.id;
  }

  ngOnInit() {
    if (!this.objectController) {
      return;
    }
    this.upgradeOptions = this.objectController.additionalObjects.upgradeOptions as IServiceUpgradeOptionsModel;
    this.upgradeInProgress = !!this.upgradeOptions.existing_upgrade_invoice;
    if (!this.upgradeInProgress) {
      this.changeOptionsForm.patchValue({
        newServiceCycle: this.upgradeOptions.cycle.id,
      })

      for (const option of this.upgradeOptions.configurable_options_upgrades) {
        this.configOptionValues[option.id] = null;
      }

      for (const option of this.upgradeOptions.configurable_options) {
        this.configOptionValues[option.option] = option.option_value;
      }

      this.changeOptionsForm.controls.newServiceCycle.valueChanges.subscribe(value => {
        this.checkIfCycleChanged();
      })
    }
  }

  checkUpgrade() {
    const configOptions = [];
    for (const option of this.upgradeOptions.configurable_options_upgrades) {
      if (this.configOptionValues[option.id]) {
        configOptions.push({option: option.id, option_value: this.configOptionValues[option.id]})
      }
    }

    this.upgrade = {
      configurable_options: configOptions,
      cycle: this.changeOptionsForm.controls.newServiceCycle.value,
      product: this.object.product.id,
    }
    this.servicesApi.upgrade(this.object.id, this.upgrade).subscribe(upgrade => {
      this.upgrade = upgrade;
      this.confirmChanges = true;
    })
  }

  placeOrder() {
    this.upgrade.confirm = true;
    this.upgrade.cycle = this.changeOptionsForm.controls.newServiceCycle.value;
    this.upgrade.product = this.object.product.id;
    this.servicesApi.upgrade(this.object.id, this.upgrade).subscribe(invoice => {
      this.router.navigateByUrl(
        this.config.getPanelUrl(`billing/invoices/${invoice.invoice}`)
      ).catch(() => {});
    })
  }
}
