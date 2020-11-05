import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ITermsOfServiceModel } from '@fleio-api/core/model/terms-of-service.model';
import { SettingsApiService } from '@fleio-api/core/settings-api.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-terms-of-service-form',
  templateUrl: './edit-terms-of-service-form.component.html',
  styleUrls: ['./edit-terms-of-service-form.component.scss']
})
export class EditTermsOfServiceFormComponent extends DetailsFormBase<ITermsOfServiceModel> implements OnInit {
  termsOfServiceForm = this.formBuilder.group({
    title: ['', Validators.required],
    version: ['', Validators.required],
    draft: [false],
    content: ['', Validators.required],
  });
  tinyMCEOptions = null;
  isNew = false;
  tosSaveSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private settingsApi: SettingsApiService,
    private router: Router,
    public config: ConfigService,
    private notificationService: NotificationService,
    private settingsAPI: SettingsApiService,
  ) {
    super();
  }

  ngOnInit() {
    if (this.object && this.object.id) {
      this.termsOfServiceForm.patchValue(this.object);
    } else {
      this.isNew = true;
    }

    if (this.config && this.config.current) {
      this.tinyMCEOptions = this.config.current.settings.tinyMCEOptions;
    }
  }

  saveTermsOfService() {
    this.tosSaveSubmitted = true;
    if (this.termsOfServiceForm.invalid) {
      this.displayControlErrors()
      return;
    }

    const termsOfService = this.termsOfServiceForm.value as ITermsOfServiceModel;
    let request;
    if (this.isNew) {
      request = this.settingsAPI.createTermsOfService(termsOfService);
    } else {
      termsOfService.id = this.object.id;
      request = this.settingsAPI.saveTermsOfService(termsOfService);
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
        this.isNew ? 'Terms of service created' : 'Terms of service saved',
      );
      this.router.navigateByUrl(
        this.config.getPanelUrl('settings/general#terms of service'),
      ).then(() => {
      });
    })
  }
}
