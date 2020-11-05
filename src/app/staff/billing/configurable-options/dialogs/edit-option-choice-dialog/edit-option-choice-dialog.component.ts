import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ConfigurableOptionsChoiceApiService } from '@fleio-api/billing/configurable-options/configurable-option-choice-api.service';
import { IConfigurableOptionChoiceModel } from '@fleio-api/billing/model/configurable-option-choice.model';

@Component({
  selector: 'app-edit-option-choice-dialog',
  templateUrl: './edit-option-choice-dialog.component.html',
  styleUrls: ['./edit-option-choice-dialog.component.scss']
})
export class EditOptionChoiceDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  backendErrors: {} = {};
  editChoiceForm: FormGroup = this.formBuilder.group({
    label: ['', Validators.required],
    choice: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<EditOptionChoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      option?: IConfigOptionModel,
      choice?: IConfigurableOptionChoiceModel,
    },
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private configurableOptionsChoiceApiService: ConfigurableOptionsChoiceApiService,
  ) {
  }

  ngOnInit() {
    if (this.data.choice) {
      this.editChoiceForm.patchValue(this.data.choice);
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  addChoice() {
    const value = this.editChoiceForm.value as IConfigurableOptionChoiceModel;

    if (this.data.option) {
      value.option = this.data.option.id;
    }

    let request;

    if (this.data.choice && this.data.choice.id) {
      value.id = this.data.choice.id;
      request = this.configurableOptionsChoiceApiService.update(value.id, value);
    } else {
      request = this.configurableOptionsChoiceApiService.create(value);
    }

    request.subscribe(() => {
        this.dialogRef.close(true);
      }
    )
  }
}
