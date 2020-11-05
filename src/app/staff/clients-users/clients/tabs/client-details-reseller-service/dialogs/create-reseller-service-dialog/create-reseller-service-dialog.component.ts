import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientModel } from '../../../../../../../shared/fleio-api/client-user/model/client.model';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../../../shared/ui-api/notification.service';
import { ClientsApiService } from '../../../../../../../shared/fleio-api/client-user/client/clients-api.service';
import { IProductModel } from '../../../../../../../shared/fleio-api/billing/model/product.model';

@Component({
  selector: 'app-create-reseller-service-dialog',
  templateUrl: './create-reseller-service-dialog.component.html',
  styleUrls: ['./create-reseller-service-dialog.component.scss']
})
export class CreateResellerServiceDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  createResellerServiceForm = this.formBuilder.group({
    product: [null, Validators.required],
    product_cycle: [null, Validators.required]
  });

  backendErrors: {} = {};
  products: Array<IProductModel>;
  productsById: {
    [key: number]: IProductModel;
  }

  constructor(
    public dialogRef: MatDialogRef<CreateResellerServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      client: IClientModel,
    },
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private clientsApi: ClientsApiService,
  ) { }

  close() {
    this.dialogRef.close(false);
  }

  createResellerService(){
    const formValue = this.createResellerServiceForm.value;
    this.clientsApi.createResellerService(
      this.data.client.id,
      formValue.product.id,
      formValue.product_cycle.id,
    ).subscribe(response => {
      this.dialogRef.close(true);
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.client) {
      this.clientsApi.objectGetAction(this.data.client.id, 'new_reseller_service_data').subscribe(value => {
        this.products = value.products;
        this.productsById = {};
        for (const product of this.products) {
          this.productsById[product.id] = product;
        }
        if (this.products.length) {
          const preSelectedProduct = this.products[0];
          this.createResellerServiceForm.controls.product.setValue(preSelectedProduct);
          if (this.productsById[preSelectedProduct.id].cycles.length) {
            this.createResellerServiceForm.controls.product_cycle.setValue(
              this.productsById[preSelectedProduct.id].cycles[0]
            );
          }
        }
      })
    }
  }

}
