import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { SettingsApiService } from '../../../../../shared/fleio-api/core/settings-api.service';
import { ISignupSettingsModel } from '../../../../../shared/fleio-api/core/model/signup-settings.model';
import { INotificationTemplateModel } from '../../../../../shared/fleio-api/core/model/notification-template.model';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent
  extends DetailsFormBase<IBaseFleioObjectModel> implements OnInit, OnDestroy {

  loadingSettings: boolean;
  updatingControls: boolean;
  signupSettings: ISignupSettingsModel;
  notificationTemplates: INotificationTemplateModel[];

  signupSettingsForm = this.formBuilder.group({
    require_confirmation: [false],
    email_confirmation_template: ['', Validators.required],
    allow_free_email_addresses: [true],
    forbidden_domains_for_email_signup: [''],
    domains_for_email_signup_whitelist: [''],
  });

  constructor(
    private formBuilder: FormBuilder, private settingsApi: SettingsApiService,
    private notificationService: NotificationService,
  ) {
    super()
  }

  protected initTabData() {
    this.loadingSettings = true;
    this.settingsApi.getSignupSettings().subscribe(signupInfo => {
      this.signupSettings = signupInfo.signup_settings;
      this.notificationTemplates = signupInfo.notification_templates;
      this.signupSettingsForm.patchValue(this.signupSettings);
      this.loadingSettings = false;
    })
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.signupSettingsForm.valueChanges.subscribe(() => {
      if (!this.updatingControls) {
        this.updatingControls = true;
        this.updateControls();
        this.updatingControls = false;
      }
    });
  }

  private updateControls() {
    const require_confirmation = this.signupSettingsForm.controls.require_confirmation;
    if (require_confirmation.value) {
      this.signupSettingsForm.controls.email_confirmation_template.enable()
    } else {
      this.signupSettingsForm.controls.email_confirmation_template.disable()
    }
  }

  ngOnDestroy(): void {
  }

  saveSettings() {
    if (this.signupSettingsForm.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    this.signupSettings = this.signupSettingsForm.value as ISignupSettingsModel;
    this.settingsApi.saveSignupSettings(this.signupSettings).pipe(catchError((error) => {
      if (error.error) {
        this.setErrors(error.error);
        return EMPTY;
      } else {
        throw error;
      }
    })).subscribe(() => {
      this.notificationService.showMessage('Signup settings saved');
    })
  }
}
