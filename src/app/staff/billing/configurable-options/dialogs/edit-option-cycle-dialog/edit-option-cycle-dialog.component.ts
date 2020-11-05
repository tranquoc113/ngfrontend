import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IConfigurableOptionCreateOptionsModel } from '@fleio-api/billing/model/configurable-option-create-options.model';
import { IConfigurableOptionCycleModel } from '@fleio-api/billing/model/configurable-option-cycle.model';
import { ConfigurableOptionsCycleApiService } from '@fleio-api/billing/configurable-options/configurable-option-cycle-api.service';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { IConfigurableOptionChoiceModel } from '@fleio-api/billing/model/configurable-option-choice.model';

@Component({
  selector: 'app-edit-option-cycle-dialog',
  templateUrl: './edit-option-cycle-dialog.component.html',
  styleUrls: ['./edit-option-cycle-dialog.component.scss']
})
export class EditOptionCycleDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  backendErrors: {} = {};
  editCycleForm: FormGroup = this.formBuilder.group({
    cycle: ['month', Validators.required],
    cycle_multiplier: [1, Validators.required],
    price: [0, Validators.required],
    is_relative_price: [true],
    setup_fee: [0, Validators.required],
    currency: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<EditOptionCycleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      createOptions: IConfigurableOptionCreateOptionsModel,
      cycle?: IConfigurableOptionCycleModel,
      option?: IConfigOptionModel,
      choice?: IConfigurableOptionChoiceModel
    },
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private configurableOptionsCycleApiService: ConfigurableOptionsCycleApiService,
  ) {
  }

  ngOnInit() {
    if (this.data.cycle) {
      this.editCycleForm.patchValue(this.data.cycle);
    }

    this.editCycleForm.controls.currency.valueChanges.subscribe(() => {
      this.updateControls();
    })

    this.editCycleForm.controls.is_relative_price.valueChanges.subscribe(() => {
      this.updateControls()
    })

    this.updateControls();
  }

  defaultCurrencySelected() {
    if (this.data.createOptions) {
      const selectedCurrency = this.data.createOptions.currencies.find(
        c => c.code === this.editCycleForm.controls.currency.value
      );

      return !!selectedCurrency && selectedCurrency.is_default;
    } else {
      return false;
    }
  }

  updateControls() {
    if (this.editCycleForm.controls.is_relative_price.value) {
      this.editCycleForm.controls.price.disable({emitEvent: false});
      this.editCycleForm.controls.setup_fee.disable({emitEvent: false});
    } else {
      this.editCycleForm.controls.price.enable({emitEvent: false});
      this.editCycleForm.controls.setup_fee.enable({emitEvent: false});
    }

    if (this.defaultCurrencySelected()) {
      this.editCycleForm.controls.is_relative_price.setValue(false, {emitEvent: false});
      this.editCycleForm.controls.is_relative_price.disable({emitEvent: false});
      this.editCycleForm.controls.price.enable({emitEvent: false});
      this.editCycleForm.controls.setup_fee.enable({emitEvent: false});
    } else {
      this.editCycleForm.controls.is_relative_price.enable({emitEvent: false});
    }
  }


  close() {
    this.dialogRef.close(false);
  }

  addCycle() {
    const value = this.editCycleForm.value as IConfigurableOptionCycleModel;

    if (this.data.option) {
      value.option = this.data.option.id;
    }

    if (this.data.choice && this.data.choice.id) {
      value.option = undefined;
      value.value = this.data.choice.id;
    }

    let request;

    if (this.data.cycle) {
      value.id = this.data.cycle.id;
      request = this.configurableOptionsCycleApiService.update(value.id, value);
    } else {
      request = this.configurableOptionsCycleApiService.create(value);
    }

    request.subscribe(() => {
        this.dialogRef.close(true);
      }
    )
  }
}
