import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrenciesApiService } from '../../../../../../../shared/fleio-api/core/currencies-api.service';
import { ICurrencyModel } from '../../../../../../../shared/fleio-api/billing/model/currency.model';
import { ICurrencyCreateOptions } from '../../../../../../../shared/fleio-api/billing/model/currency-create-options';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-edit-currency-dialog',
  templateUrl: './edit-currency-dialog.component.html',
  styleUrls: ['./edit-currency-dialog.component.scss']
})
export class EditCurrencyDialogComponent implements OnInit {
  currencyForm: FormGroup = this.formBuilder.group({
    code: ['', Validators.required],
    rate: [1, Validators.required],
    is_default: [false],
  });
  currency: ICurrencyModel;
  creating: boolean;
  title: string;
  createOptions: ICurrencyCreateOptions;
  @ViewChild('formErrors') formErrors;
  backendErrors: {} = {};

  constructor(
    public dialogRef: MatDialogRef<EditCurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currency: ICurrencyModel, createOptions: ICurrencyCreateOptions },
    private formBuilder: FormBuilder,
    private currencyApi: CurrenciesApiService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    if (this.data) {
      this.createOptions = this.data.createOptions;
      if (this.data.currency) {
        this.currency = this.data.currency;
        this.creating = false;
        this.title = `Edit currency ${this.currency.code}`;
        this.currencyForm.patchValue(this.currency);
      } else {
        this.currency = { code: null, rate: null};
        this.creating = true;
        this.title = 'Create currency';
      }
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  protected displayControlErrors() {
    Object.keys(this.currencyForm.controls).map(name => {
      const control = this.currencyForm.controls[name];
      if (control.invalid) {
        control.markAsTouched();
      }
    });
  }

  protected setErrors(backendErrors: {}) {
    this.backendErrors = backendErrors;
    this.formErrors.setBackendErrors(backendErrors);
  }

  save() {
    if (this.currencyForm.invalid) {
      this.displayControlErrors();
      return;
    }

    this.currency = this.currencyForm.value

    let request;
    if (this.creating) {
      request = this.currencyApi.create(this.currency);
    } else {
      request = this.currencyApi.update(this.currency.code, this.currency);
    }

    request.pipe(catchError((error) => {
      if (error.error) {
        this.setErrors(error.error);
        return EMPTY;
      } else {
        throw error;
      }
    })).subscribe(() => {
      this.notificationService.showMessage(
        this.creating ? 'Currency created': 'Currency saved'
      );
      this.dialogRef.close(true);
    });
  }
}
