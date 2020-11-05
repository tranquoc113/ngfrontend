import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

@Component({
  selector: 'app-change-credit-dialog',
  templateUrl: './change-credit-dialog.component.html',
  styleUrls: ['./change-credit-dialog.component.scss']
})
export class ChangeCreditDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  changeCreditForm = this.formBuilder.group({
    change_type: ['add', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.01)]],
  });
  submitText = 'Add credit';
  loading = false;
  backendErrors = {};

  constructor(
    public dialogRef: MatDialogRef<ChangeCreditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      client: IClientModel,
      credit: {
        client: FleioId;
        amount: number;
        currency: string;
      }
    },
    private formBuilder: FormBuilder,
    private clientsApiService: ClientsApiService,
  ) { }

  ngOnInit(): void {
    this.changeCreditForm.controls.change_type.valueChanges.subscribe(value => {
      if (value === 'add') {
        this.submitText = 'Add credit';
      } else {
        this.submitText = 'Subtract credit';
      }
    });
  }

  public changeCredit() {
    if (!this.changeCreditForm.valid) {
      return;
    }
    this.loading = true;
    this.clientsApiService.changeCredit(
        this.data.client.id,
        this.changeCreditForm.controls.change_type.value === 'add',
        this.changeCreditForm.controls.amount.value,
        this.data.credit.currency,
        this.data.credit.currency,
      ).subscribe(result => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }

  public close() {
    this.dialogRef.close(false);
  }

}
