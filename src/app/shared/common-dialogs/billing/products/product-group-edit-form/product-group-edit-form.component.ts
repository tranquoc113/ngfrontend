import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IProductGroupModel } from '@fleio-api/billing/model/product-group.model';
import { ProductGroupsApiService } from '@fleio-api/billing/product-groups/product-groups-api.service';

@Component({
  selector: 'app-product-group-edit-form',
  templateUrl: './product-group-edit-form.component.html',
  styleUrls: ['./product-group-edit-form.component.scss']
})
export class ProductGroupEditFormComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  productGroupForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });
  backendErrors: {} = {};
  loading = false;
  addForm: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProductGroupEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      productGroup: IProductGroupModel,
    },
    private formBuilder: FormBuilder,
    private productGroupsApiService: ProductGroupsApiService,
    private notificationService: NotificationService,
  ) { }

  close() {
    this.dialogRef.close(false);
  }

  saveProductGroup() {
    if (!this.productGroupForm.valid) {
      return;
    }
    const value = this.productGroupForm.value;
    this.loading = true;
    if (this.addForm) {
      this.productGroupsApiService.create(
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
      this.productGroupsApiService.update(this.data.productGroup.id, value).subscribe(response => {
        this.loading = false;
        this.dialogRef.close(true);
      }, error => {
        this.loading = false;
        this.backendErrors = error.error;
        this.formErrors.setBackendErrors(error.error);
      });
    }
  }

  ngOnInit(): void {
    this.addForm = !this.data.productGroup;
    if (!this.addForm) {
      this.productGroupForm.patchValue(this.data.productGroup);
    }
  }

}
