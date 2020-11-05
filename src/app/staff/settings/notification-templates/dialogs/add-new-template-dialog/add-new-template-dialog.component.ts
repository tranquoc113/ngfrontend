import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ITemplateLanguageModel } from '../../../../../shared/fleio-api/notification-templates/model/template-language.model';

@Component({
  selector: 'app-add-new-template-dialog',
  templateUrl: './add-new-template-dialog.component.html',
  styleUrls: ['./add-new-template-dialog.component.scss']
})
export class AddNewTemplateDialogComponent implements OnInit {
  addTemplateForm = this.formBuilder.group({
    language: ['', Validators.required],
  })

  constructor(
    public dialogRef: MatDialogRef<AddNewTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { availableLanguages: ITemplateLanguageModel[], templateName: string },
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close('close');
  }

  create() {
    this.dialogRef.close(this.addTemplateForm.controls.language.value);
  }
}
