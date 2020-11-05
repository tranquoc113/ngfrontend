import { Component, OnDestroy } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { SettingsApiService } from '@fleio-api/core/settings-api.service';
import { SfaTypesApiService } from '@fleio-api/core/sfa-types-api.service';
import { IAuthSettingsModel } from '@fleio-api/core/model/auth-settings.model';
import { ISfaSettingsModel } from '@fleio-api/core/model/sfa-settings.model';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { catchError, combineAll } from 'rxjs/operators';
import { combineLatest, EMPTY, merge, Observable, zip } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnDestroy {

  authSettings: IAuthSettingsModel;
  sfaSettings: ISfaSettingsModel;
  sfaTypes: ISfaTypeModel[];
  authSettingsForm = this.formBuilder.group({
    allow_auth_with_email_and_username: [false],
  });

  sfaSettingsForm = this.formBuilder.group({
    require_staff_users_to_use_sfa: [false],
    require_end_users_to_use_sfa: [false],
  });

  disableSfaTooltip = 'Once disabled, users that use this\nmethod will not be ' +
    'required anymore\nto complete second factor auth step.\nThey will also need to reconfigure second\nfactor' +
    ' authentication if you\'ll re-enable this.'

  sfaSwitching: boolean;

  constructor(
    private settingsApi: SettingsApiService, private sfaTypesApi: SfaTypesApiService, private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) {
    super()
  }

  protected initTabData() {
    this.settingsApi.getAuthSettings().subscribe(authSettings => {
      this.authSettings = authSettings;
      this.authSettingsForm.patchValue(authSettings);
    });
    this.settingsApi.getSfaSettings().subscribe(sfaSettings => {
      this.sfaSettings = sfaSettings;
      this.sfaSettingsForm.patchValue(sfaSettings);
    });
    this.sfaTypesApi.getForSettings().subscribe(sfaTypes => {
      this.sfaTypes = sfaTypes.objects;
    });
  }

  ngOnDestroy(): void {
  }

  switchEnableToStaff(sfa: ISfaTypeModel) {
    sfa.enabled_to_staff = !sfa.enabled_to_staff;
    this.sfaTypesApi.update(sfa.id, sfa).pipe(catchError(() => {
      this.notificationService.showMessage('Failed to switch enabled to staff');
      this.initTabData();
      return EMPTY;
    })).subscribe(() => {
    });
  }

  switchEnableToEndUser(sfa: ISfaTypeModel) {
    sfa.enabled_to_enduser = !sfa.enabled_to_enduser;
    this.sfaTypesApi.update(sfa.id, sfa).pipe(catchError(() => {
      this.notificationService.showMessage('Failed to switch enabled to end-user');
      this.initTabData();
      return EMPTY;
    })).subscribe(() => {
    });
  }

  saveAuthSettings(): Observable<any> {
    const authSettings = this.authSettingsForm.value;
    return this.settingsApi.saveAuthSettings(authSettings);
  }

  saveSfaSettings(): Observable<any> {
    const sfaSettings = this.sfaSettingsForm.value;
    return this.settingsApi.saveSfaSettings(sfaSettings);
  }

  saveSfaTypes(): Observable<any> {
    const requests = [];
    for (const sfaType of this.sfaTypes) {
      requests.push(this.sfaTypesApi.update(sfaType.id, sfaType))
    }

    return zip(...requests);
  }

  saveSettings() {
    const saveSettings = zip(
      this.saveAuthSettings(),
      this.saveSfaSettings(),
      this.saveSfaTypes(),
    );

    saveSettings.subscribe(() => {
      this.notificationService.showMessage('Authentication settings saved');
    })
  }
}
