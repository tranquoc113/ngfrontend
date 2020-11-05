import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { IUserProfileModel } from '../../../../fleio-api/profile/model/user-profile.model';
import { UserProfileApiService } from '../../../../fleio-api/profile/user-profile/user-profile-api.service';
import { NotificationService } from '../../../../ui-api/notification.service';
import { IUserProfileCreateOptionsModel } from '../../../../fleio-api/profile/model/user-profile-create-options.model';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../config/config.service';
import { ThemingService } from '../../../../ui/theming/theming.service';

@Component({
  selector: 'app-user-profile-edit-form',
  templateUrl: './user-profile-edit-form.component.html',
  styleUrls: ['./user-profile-edit-form.component.scss']
})
export class UserProfileEditFormComponent extends DetailsFormBase<IUserProfileModel> implements OnInit {
  @ViewChild('phoneNumberInputComponent') phoneNumberInputComponent;
  profileForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    mobile_phone_number: [''],
    old_password: [''],
    password: [''],
    language: [''],
    theme: [''],
  });
  showOldPasswordText = false;
  showPasswordText = false;
  phoneNumber = '';
  createOptions: IUserProfileCreateOptionsModel;
  constructor(private formBuilder: FormBuilder, private userProfileApiService: UserProfileApiService,
              private notificationService: NotificationService, private activatedRoute: ActivatedRoute,
              public config: ConfigService, private themingService: ThemingService) {
    super();
  }

  private saveProfile() {
    if (this.profileForm.invalid) {
      return of(null);
    }
    const value = this.profileForm.value as any;
    let selectedTheme = null;
    if (value.hasOwnProperty('theme')) {
      selectedTheme = value.theme;
      delete value.theme;
    }
    if (selectedTheme) {
      this.themingService.setNewActiveTheme(selectedTheme);
    }
    this.userProfileApiService.putAction(
      'update',
      value
    ).subscribe(response => {
      if (this.phoneNumberInputComponent.error) {
        this.phoneNumberInputComponent.error = null;
      }
      this.notificationService.showMessage('User profile updated.');
    }, error => {
      this.backendErrors = error.error;
      if (this.backendErrors.mobile_phone_number) {
        this.phoneNumberInputComponent.error = this.backendErrors.mobile_phone_number;
      } else {
        this.phoneNumberInputComponent.error = null;
      }
      this.formErrors.setBackendErrors(this.backendErrors);
    });
    return of(null);
  }

  public onChangedPhone(newNumber) {
    this.profileForm.controls.mobile_phone_number.setValue(newNumber);
  }

  ngOnInit() {
    super.ngOnInit();
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveProfile();
    }
    if (this.object) {
      this.profileForm.patchValue(this.object.user);
    }
    this.profileForm.controls.theme.setValue(this.themingService.getActiveThemeName());
    if (this.object && this.object.user.mobile_phone_number) {
      this.phoneNumber = this.object.user.mobile_phone_number;
    }
  }

}
