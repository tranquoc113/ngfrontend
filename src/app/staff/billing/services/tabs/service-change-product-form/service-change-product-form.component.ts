import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IServiceUpgradeOptionsModel } from '@fleio-api/billing/model/service-upgrade-options.model';
import { IServiceUpgradeModel } from '@fleio-api/billing/model/service-upgrade-.model';
import { ServicesApiService } from '@fleio-api/billing/services/service-api.service';

@Component({
  selector: 'app-service-change-product-form',
  templateUrl: './service-change-product-form.component.html',
  styleUrls: ['./service-change-product-form.component.scss']
})
export class ServiceChangeProductFormComponent extends DetailsFormBase<IServiceModel> implements OnInit {
  changeProductForm = this.formBuilder.group({
    newServiceCycle: ['', Validators.required],
  });

  upgradeOptions: IServiceUpgradeOptionsModel;
  upgradeInProgress: boolean;
  confirmChanges: boolean;
  cycleChanged: boolean;
  upgrade: IServiceUpgradeModel;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicesApi: ServicesApiService,
    public config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    if (!this.objectController) {
      return;
    }
    this.upgradeOptions = this.activatedRoute.snapshot.data.upgradeOptions;
    this.upgradeInProgress = !!this.upgradeOptions.existing_upgrade_invoice;

    if (!this.upgradeInProgress) {
      this.changeProductForm.controls.newServiceCycle.valueChanges.subscribe(value => {
        this.cycleChanged = true;
      })
    }
  }

  checkUpgrade() {
    this.upgrade = {
      configurable_options: [],
      cycle: this.changeProductForm.controls.newServiceCycle.value.cycle,
      product: this.changeProductForm.controls.newServiceCycle.value.product,
    }
    this.servicesApi.upgrade(this.object.id, this.upgrade).subscribe(upgrade => {
      this.upgrade = upgrade;
      this.confirmChanges = true;
    })
  }

  placeOrder() {
    this.upgrade.confirm = true;
    this.upgrade.cycle = this.changeProductForm.controls.newServiceCycle.value.cycle;
    this.upgrade.product = this.changeProductForm.controls.newServiceCycle.value.product
    this.servicesApi.upgrade(this.object.id, this.upgrade).subscribe(invoice => {
      this.router.navigateByUrl(
        this.config.getPanelUrl(`billing/invoices/${invoice.invoice}`)
      ).catch(() => {});
    })
  }
}
