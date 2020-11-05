import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { SmsAuthenticatorApiService } from '@fleio-api/plugins/sms-authenticator/sms-authenticator-api.service';
import { UserProfileApiService } from '@fleio-api/profile/user-profile/user-profile-api.service';
import { IUserProfileDataModel } from '@shared/auth/models/user.model';

@Component({
  selector: 'app-sms-authenticator-details-tab',
  templateUrl: './sms-authenticator-details-tab.component.html',
  styleUrls: ['./sms-authenticator-details-tab.component.scss']
})
export class SmsAuthenticatorDetailsTabComponent extends DetailsFormBase<any> implements OnInit {
  @ViewChild('phoneNumberInputComponent') phoneNumberInputComponent;
  smsForm = this.formBuilder.group({
    code: ['', Validators.required]
  });
  userProfile: IUserProfileDataModel;
  status: {
    enabled: boolean;
    default: boolean;
  };
  loading = false;
  phoneNumber: string;
  constructor(
    private smsAuthenticatorApiService: SmsAuthenticatorApiService,
    public config: ConfigService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userProfileApiService: UserProfileApiService,
  ) {
    super();
  }

  getSMSData() {
    this.loading = true;
    this.smsAuthenticatorApiService.getStatus().subscribe(response => {
      this.status = response;
      this.loading = false;
      this.userProfileApiService.getProfile().subscribe(value => {
        this.userProfile = value.user;
        this.phoneNumber = JSON.parse(JSON.stringify(this.userProfile.mobile_phone_number));
        if (!this.phoneNumber) {
          this.smsForm.controls.code.disable();
        } else {
          if (this.smsForm.controls.code.disabled) {
            this.smsForm.controls.code.enable();
          }
        }
      });
    }, error => {
      if (error.status === 403) {
        this.notificationService.showMessage('You need to confirm password');
        this.router.navigateByUrl(this.config.getPanelUrl('sfa/confirm-password'));
        this.loading = false;
      } else {
        this.notificationService.showMessage('Failed to get second factor auth method status');
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this.getSMSData();
  }

  savePhone() {
    if (!this.phoneNumber) {
      this.notificationService.showMessage('Please enter phone number');
      return of(null);
    }
    const value = JSON.parse(JSON.stringify(this.userProfile)); // deep copy
    value.mobile_phone_number = this.phoneNumber;
    this.userProfileApiService.putAction(
      'update',
      value
    ).subscribe(response => {
      if (this.phoneNumberInputComponent.error) {
        this.phoneNumberInputComponent.error = null;
      }
      this.notificationService.showMessage('User profile updated.');
      this.getSMSData();
    }, error => {
      this.backendErrors = error.error;
      if (this.backendErrors.mobile_phone_number) {
        this.notificationService.showMessage(this.backendErrors.mobile_phone_number);
      }
    });
  }

  onChangedPhone(newNumber) {
    this.phoneNumber = newNumber;
  }

  requestCode() {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Send code?',
        message: `You will receive a new code on your mobile phone number (${this.userProfile.mobile_phone_number}).` +
        ' Go to your profile to change your phone number.'
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.smsAuthenticatorApiService.sendCode().subscribe(response => {
          this.getSMSData();
        }, error => {
          this.notificationService.showMessage('Failed to send code.')
        })
      }
    });
  }

  enable() {
    this.validate();
    if (this.smsForm.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    const value = this.smsForm.value;

    this.smsAuthenticatorApiService.enable(value.code).subscribe(response => {
      this.getSMSData();
    }, error => {
      if (error.error) {
        this.setErrors(error.error);
      }
      this.getSMSData();
    });
  }

  disable() {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Disable google authenticator?',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.smsAuthenticatorApiService.disable().subscribe(response => {
          this.getSMSData();
        }, error => {
          this.notificationService.showMessage('Failed to disable second factor auth method.')
        })
      }
    });
  }

  makeDefault() {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'Set google authenticator as default',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.smsAuthenticatorApiService.makeDefault().subscribe(response => {
          this.getSMSData();
        }, error => {
          this.notificationService.showMessage(
            'Failed to make google authenticator the default second factor auth method.'
          );
        })
      }
    });
  }

}
