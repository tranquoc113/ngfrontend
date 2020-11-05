import { DetailsComponentBase } from './details-component-base';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { AfterViewChecked, Directive, ViewChild } from '@angular/core';
import { FleioApiService } from '@fleio-api/fleio-api.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { FormArray, FormGroup } from '@angular/forms';
import { HttpEvent } from '@angular/common/http';

@Directive()
export class DetailsFormBase<ObjectType extends IBaseFleioObjectModel>
  extends DetailsComponentBase<ObjectType> implements AfterViewChecked {
  @ViewChild('formErrors') protected formErrors;
  public backendErrors: any = {};
  public validationErrors: any = {};
  public fieldErrors: any = {};
  protected formGroup: FormGroup;

  private validated = false;

  ngAfterViewChecked() {
    if (!this.formGroup) {
      if (!this.formErrors) {
        this.validated = false;
        return;
      } else {
        this.formGroup = this.formErrors.formGroup;
        if (this.formGroup) {
          this.formGroup.valueChanges.subscribe(() => {
            this.validate();
          })
        }
      }
    }
  }

  private updateFieldErrors(formGroup: FormGroup, prefix: string) {
    for (const controlName of Object.keys(formGroup.controls)) {
      const control = formGroup.controls[controlName];
      const errorName = prefix ? `${prefix}.${controlName}` : controlName;
      if (control instanceof FormGroup) {
        this.updateFieldErrors(control, errorName);
      } else {
        if (this.backendErrors[controlName]) {
          this.fieldErrors[errorName] = this.backendErrors[controlName];
        }
      }
    }
    for (const fieldName in Object.keys(this.backendErrors)) {
      if (formGroup && formGroup.controls[fieldName]) {
        this.fieldErrors[fieldName] = this.backendErrors[fieldName];
      }
    }
  }

  private setValidationErrors(formGroup: FormGroup, prefix: string) {
    for (const controlName of Object.keys(formGroup.controls)) {
      const control = formGroup.controls[controlName];
      const errorName = prefix ? `${prefix}.${controlName}` : controlName;
      if (!control.valid) {
        if (control instanceof FormGroup) {
          this.setValidationErrors(control, errorName);
        } else {
          if (control.errors) {
            if (control.errors.required) {
              this.validationErrors[errorName] = `This field is required`;
            }
            if (control.errors.doesNotExists) {
              this.validationErrors[errorName] = `Select an existing value`;
            }
            if (control.errors.min) {
              this.validationErrors[errorName] = `The value is lower than minimum(${control.errors.min.min})`;
            }
            if (control.errors.max) {
              this.validationErrors[errorName] = `The value is greater than maximum(${control.errors.max.max})`;
            }
          }
        }
      }
    }
  }

  protected validate() {
    // clear errors before validation
    this.validationErrors = {};
    this.fieldErrors = {};

    if (this.formGroup) {
      if (this.formGroup.invalid) {
        this.setValidationErrors(this.formGroup, '');
        this.fieldErrors = {...this.validationErrors};
        // ensure backend errors are displayed if form is invalid
        this.updateFieldErrors(this.formGroup, '');
      } else {
        // clear backend errors if from is valid
        this.backendErrors = {};
      }
      this.validated = true;
    } else {
      console.error('Form cannot be validated, no <app-form-errors> component found.');
    }
  }

  protected setErrors(backendErrors: {}) {
    if (!this.validated) {
      console.error('Form cannot be validated, no <app-form-errors> component found.');
      console.error('setErrors called on a non validated form, aborting');
      return;
    }
    this.backendErrors = backendErrors;
    this.formErrors.setBackendErrors(backendErrors);
    this.updateFieldErrors(this.formGroup, '');
  }

  private displayFormGroupErrors(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).map(name => {
      const control = formGroup.controls[name];
      if (control instanceof FormGroup) {
        this.displayFormGroupErrors(control);
      } else if (control instanceof FormArray) {
        this.displayFormGroupErrors(control);
      } else {
        if (control.invalid) {
          control.markAsTouched();
        }
      }
    });
  }

  protected displayControlErrors() {
    this.displayFormGroupErrors(this.formGroup);
  }

  // TODO: rework this so it can be easily used in sub components
  protected createOrUpdate(
    api: FleioApiService<ObjectType>,
    value: ObjectType | FormData,
    raise: boolean = false,
    action?: string,
  ): Observable<ObjectType | HttpEvent<ObjectType>> {
    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    let request;
    if (this.object.id) {
      if (value instanceof FormData) {
        throw new Error('Form data not supported on update');
      }
      value.id = this.object.id;
      request = api.update(value.id, value);
    } else {
      if (value instanceof FormData) {
        request = api.createWithUpload(value, action);
      } else {
        request = api.create(value);
      }
    }

    return request.pipe(catchError((error) => {
      if (error.error) {
        this.setErrors(error.error);
        if (raise) {
          throw error;
        } else {
          return EMPTY;
        }
      } else {
        throw error;
      }
    }));
  }
}
