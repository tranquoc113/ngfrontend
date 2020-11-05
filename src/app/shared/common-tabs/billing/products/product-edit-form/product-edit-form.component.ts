import { ChangeDetectorRef, Component, OnInit, Optional } from '@angular/core';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IProductCreateOptions } from '@fleio-api/billing/model/product-create-options.model';
import { IBillingModuleModel } from '@fleio-api/billing/model/billing-module.model';
import { PanelLayoutComponent } from '@shared/layout/panel-layout/panel-layout.component';
import { ProductModuleSettingsHelper } from '@fleio-api/billing/products/product-module-settings-helper';
import { EMPTY, of } from 'rxjs';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-product-edit-form',
  templateUrl: './product-edit-form.component.html',
  styleUrls: ['./product-edit-form.component.scss']
})
export class ProductEditFormComponent extends DetailsFormBase<IProductModel> implements OnInit {
  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    description: [''],
    billing_type: ['', Validators.required],
    group: ['', Validators.required],
    module: ['', Validators.required],
    product_type: ['', Validators.required],
    status: ['', Validators.required],
    price_model: ['', Validators.required],
    auto_setup: ['', Validators.required],
    taxable: [true],
    requires_domain: [false],
    hide_services: [false],
  });
  createOptions: IProductCreateOptions;
  createForm = false;
  modules: Array<IBillingModuleModel> = [];
  plugin: string;
  productModuleSettings: {};

  constructor(
    private formBuilder: FormBuilder,
    private productsApiService: ProductsApiService,
    private router: Router,
    private config: ConfigService,
    changeDetectorRef: ChangeDetectorRef,
    public productModuleSettingsHelper: ProductModuleSettingsHelper,
    @Optional() public panelLayout?: PanelLayoutComponent,
  ) {
    super(null, changeDetectorRef);
  }

  changedModule() {
    this.productModuleSettingsHelper.form = null;
    this.plugin = null;
    this.changeDetectorRef.detectChanges();
    this.plugin = this.createOptions.modules[this.productForm.controls.module.value].plugin;
  }

  saveProduct() {
    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return of(null);
    }

    if (this.productModuleSettingsHelper.form && this.productModuleSettingsHelper.form.invalid) {
      this.productModuleSettingsHelper.mainFormSubmitted.next(true);
      return of(null);
    }

    const value = this.productForm.value;
    if (!this.createForm && !this.productModuleSettingsHelper.moduleSettings) {
      if (this.object.hasOwnProperty(this.productModuleSettingsHelper.moduleSettingsFormMap[this.plugin])) {
        value[this.productModuleSettingsHelper.moduleSettingsFormMap[this.plugin]] =
          this.object[this.productModuleSettingsHelper.moduleSettingsFormMap[this.plugin]];
      }
    } else {
      value[this.productModuleSettingsHelper.moduleSettingsFormMap[this.plugin]] =
        this.productModuleSettingsHelper.moduleSettings;
    }

    this.createOrUpdate(this.productsApiService, value).subscribe((response: any) => {
      if (this.createForm) {
        this.router.navigateByUrl(
          this.config.getPanelUrl(`billing/products/${response.id}`)
        ).catch(() => {
        });
      } else {
        this.router.navigateByUrl(
          this.config.getPrevUrl('billing/products')
        ).catch(() => {
        });
      }
    });
    return of(null);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.createOptions = this.objectController.additionalObjects.createOptions;
      this.objectController.actionCallback = () => this.saveProduct();
    }
    if (this.object && !this.object.id) {
      this.createForm = true;
    }
    if (this.createOptions) {
      for (const modId in this.createOptions.modules) {
        if (this.createOptions.modules.hasOwnProperty(modId)) {
          this.modules.push(this.createOptions.modules[modId]);
        }
      }
    }
    if (this.createForm && this.createOptions) {
      this.productForm.controls.billing_type.setValue(this.createOptions.billing_types[0][0]);
      this.productForm.controls.group.setValue(this.createOptions.groups[0].id);
      this.productForm.controls.module.setValue(this.modules[0].id);
      this.changedModule();
      this.productForm.controls.product_type.setValue(this.createOptions.product_types[0][0]);
      this.productForm.controls.status.setValue(this.createOptions.statuses[0][0]);
      this.productForm.controls.price_model.setValue(this.createOptions.price_models[0][0]);
      this.productForm.controls.auto_setup.setValue(this.createOptions.auto_setups[0][0]);
    } else {
      if (this.object) {
        this.productForm.patchValue(this.object);
        this.productForm.controls.group.patchValue(this.object.group.id);
        this.productForm.controls.module.patchValue(this.object.module.id);
        this.changedModule();
        this.productModuleSettings = this.object[this.productModuleSettingsHelper.moduleSettingsFormMap[this.plugin]];
      }
    }
  }

}
