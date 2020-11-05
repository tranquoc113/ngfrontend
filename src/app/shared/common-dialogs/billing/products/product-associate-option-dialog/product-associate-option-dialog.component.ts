import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';

@Component({
  selector: 'app-product-associate-option-dialog',
  templateUrl: './product-associate-option-dialog.component.html',
  styleUrls: ['./product-associate-option-dialog.component.scss']
})
export class ProductAssociateOptionDialogComponent implements OnInit {
  associateOptionForm = this.formBuilder.group({
    selectedOption: [null, Validators.required]
  })
  loading = false;

  selectedOption = this.associateOptionForm.controls.selectedOption;
  availableOptions: Array<{}>;

  constructor(
    public dialogRef: MatDialogRef<ProductAssociateOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: IProductModel },
    private formBuilder: FormBuilder,
    private productsApiService: ProductsApiService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    if (this.data && this.data.product) {
      this.loading = true;
      this.productsApiService.getConfigurableOptions(this.data.product.id).subscribe(response => {
        this.loading = false;
        this.availableOptions = response.available_options;
      }, error => {
        this.dialogRef.close(false);
        this.loading = false;
        this.notificationService.showMessage('Failed to get configurable options for product.');
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  associateOption() {
    this.productsApiService.associateOption(
      this.data.product.id,
      this.selectedOption.value
    ).subscribe(response => {
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showMessage('Failed to associate option.');
    });
  }
}
