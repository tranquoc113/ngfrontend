import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() maxWidth = 'unset';
  errorMessages: string[];
  visible = false;

  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.visible = false;
  }

  setBackendErrors(backendErrors: {[field: string]: string} | string) {
    if (typeof backendErrors === 'string') {
      this.showError(backendErrors as string);
      return;
    }

    const nonFieldErrors: string[] = [];

    Object.keys(backendErrors).map(fieldName => {
      const control = this.formGroup.get(fieldName);
      if (control && !control.disabled) {
        control.markAsTouched();
        control.setErrors({backend: true});
      } else {
        nonFieldErrors.push(`${fieldName}: ${backendErrors[fieldName]}`);
      }
    });

    if (nonFieldErrors.length > 0) {
      this.showMultipleErrors(nonFieldErrors);
    }
  }

  showMultipleErrors(errorMessages: string[]) {
    this.errorMessages = errorMessages;
    this.visible = true;
  }

  showError(errorMessage: string) {
    this.showMultipleErrors([errorMessage]);
  }
}
