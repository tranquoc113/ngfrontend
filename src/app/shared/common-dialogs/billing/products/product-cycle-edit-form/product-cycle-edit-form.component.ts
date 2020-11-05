import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProductCycleModel } from '@fleio-api/billing/model/product-cycle.model';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductCyclesApiService } from '@fleio-api/billing/product-cycles/product-cycles-api.service';
import { IProductCycleCreateOptionsModel } from '@fleio-api/billing/model/product-cycle-create-options.model';
import { ICurrencyModel } from '@fleio-api/billing/model/currency.model';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-product-cycle-edit-form',
  templateUrl: './product-cycle-edit-form.component.html',
  styleUrls: ['./product-cycle-edit-form.component.scss']
})
export class ProductCycleEditFormComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  productCycleForm = this.formBuilder.group({
    product: [this.initProduct()],
    cycle: ['', Validators.required],
    cycle_multiplier: ['', [Validators.min(1), Validators.required]],
    currency: ['', Validators.required],
    is_relative_price: [false],
    fixed_price: [0, [Validators.min(0), Validators.required]],
    setup_fee: [0, [Validators.min(0), Validators.required]],
    status: ['', Validators.required],
    setup_fee_entire_quantity: [false]
  });
  createOptions: IProductCycleCreateOptionsModel;
  defaultCurrency: ICurrencyModel;
  backendErrors: {} = {};
  addForm: boolean;
  priceLabel: string;
  loading = false;
  initProduct() {
    if (this.data && this.data.product) {
      return this.data.product.id;
    }
    return '';
  }

  constructor(
    public dialogRef: MatDialogRef<ProductCycleEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      productCycle: IProductCycleModel,
      product: IProductModel,
    },
    private formBuilder: FormBuilder,
    private productCyclesApiService: ProductCyclesApiService,
    private notificationService: NotificationService,
  ) { }

  close() {
    this.dialogRef.close(false);
  }

  saveCycle() {
    if (!this.productCycleForm.valid) {
      return;
    }
    const value = this.productCycleForm.value;
    if (this.productCycleForm.controls.is_relative_price.disabled) {
      value.is_relative_price = false; // needed to be submitted because by default backend will set it to true
    }
    this.loading = true;
    if (this.addForm) {
      this.productCyclesApiService.create(
        value
      ).subscribe(result => {
        this.loading = false;
        this.dialogRef.close(true);
      }, error => {
        this.loading = false;
        this.backendErrors = error.error;
        this.formErrors.setBackendErrors(error.error);
      });
    } else {
      this.productCyclesApiService.update(this.data.productCycle.id, value).subscribe(response => {
        this.loading = false;
        this.dialogRef.close(true);
      }, error => {
        this.loading = false;
        this.backendErrors = error.error;
        this.formErrors.setBackendErrors(error.error);
      });
    }
  }

  changedCycle() {
    const cycleValue = this.productCycleForm.controls.cycle.value
    if (cycleValue !== 'onetime') {
      if (this.data.product.price_model === 'fixed_and_dynamic') {
        this.priceLabel = 'Fixed price';
      } else if (this.data.product.price_model === 'dynamic_or_fixed') {
        this.priceLabel = 'Minimum price';
      }
      this.productCycleForm.controls.cycle_multiplier.enable();
      this.productCycleForm.controls.setup_fee.enable();
    } else {
      this.productCycleForm.controls.cycle_multiplier.disable();
      this.productCycleForm.controls.setup_fee.disable();
      this.priceLabel = 'Price';
    }
  }

  changedRelativePrice() {
    if (this.productCycleForm.controls.is_relative_price.value === true) {
      this.productCycleForm.controls.fixed_price.disable();
      this.productCycleForm.controls.setup_fee.disable();
    } else {
      this.productCycleForm.controls.fixed_price.enable();
      this.productCycleForm.controls.setup_fee.enable();
    }
  }

  changedCurrency() {
    if (this.productCycleForm.controls.currency.value === this.defaultCurrency.code) {
      this.productCycleForm.controls.is_relative_price.setValue(false);
      this.productCycleForm.controls.is_relative_price.disable();
      this.changedRelativePrice();
    } else {
      this.productCycleForm.controls.is_relative_price.enable();
      this.changedRelativePrice();
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.addForm = this.data.product && !this.data.productCycle;
    this.productCyclesApiService.createOptions().subscribe((response: any) => {
      this.createOptions = response.create_options;
      for (const currency of this.createOptions.currencies) {
        if (currency.is_default) {
          this.defaultCurrency = currency;
        }
      }
      if (this.addForm) {
        this.productCycleForm.controls.cycle.setValue(this.createOptions.cycles[0][0]);
        this.productCycleForm.controls.status.setValue(this.createOptions.statuses[0][0]);
        // first option is onetime, disable cycle multiplier
        this.productCycleForm.controls.cycle_multiplier.disable();
        this.productCycleForm.controls.currency.setValue(this.createOptions.currencies[0].code);
        this.changedCurrency();
      } else {
        this.productCycleForm.patchValue(this.data.productCycle);
        this.changedCurrency();
        this.changedCycle();
        this.changedRelativePrice();
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.close();
      this.notificationService.showMessage('Error while retrieving form options');
    });
  }

}
