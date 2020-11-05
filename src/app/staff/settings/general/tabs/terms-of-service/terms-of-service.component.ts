import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FormBuilder, Validators } from '@angular/forms';
import { SettingsApiService } from '@fleio-api/core/settings-api.service';
import { ITOSSettingsModel } from '@fleio-api/core/model/tos-settings.model';
import { ITermsOfServiceModel } from '@fleio-api/core/model/terms-of-service.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { NotificationService } from '@shared/ui-api/notification.service';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { of } from 'rxjs';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnInit, OnDestroy {

  @ViewChild('formErrors') formErrors;
  tosSettings: ITOSSettingsModel;
  termsOfService: FleioObjectsList<ITermsOfServiceModel>;
  backendErrors = {};

  tosSettingsForm = this.formBuilder.group({
    require_end_users_to_agree_with_latest_tos: [false],
    ask_again_after: [0, Validators.required],
    forbid_access_after: [''],
  });
  displayedColumns = ['version', 'title', 'content', 'draft', '(actions)'];
  tosActions = {};

  constructor(
    private formBuilder: FormBuilder, private settingsAPI: SettingsApiService,
    private notificationService: NotificationService, private router: Router,
    public config: ConfigService,
  ) {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.tosSettingsForm.controls.require_end_users_to_agree_with_latest_tos.valueChanges.subscribe(require => {
      if (require) {
        this.tosSettingsForm.controls.ask_again_after.enable();
        this.tosSettingsForm.controls.forbid_access_after.enable();
      } else {
        this.tosSettingsForm.controls.ask_again_after.disable();
        this.tosSettingsForm.controls.forbid_access_after.disable();
      }
    })
  }

  protected initTabData() {
    this.refreshData();
  }

  refreshData() {
    this.settingsAPI.getTOSSettings().subscribe(tosSettings => {
      this.tosSettings = tosSettings;
      this.tosSettingsForm.patchValue(tosSettings);
    });

    this.settingsAPI.getTermsOfService().subscribe(termsOfService => {
      this.termsOfService = termsOfService;
      this.tosActions = {};
      for (const tos of this.termsOfService.objects) {
        this.tosActions[tos.id] = [
          new RouterLinkAction({
            icon: {name: 'edit'},
            tooltip: 'Edit terms of service',
            name: 'Edit',
            routerUrl: this.config.getPanelUrl(`settings/general/edit-tos/${tos.id}`),
            router: this.router,
          }),
          new CallbackAction({
            icon: {name: 'delete'},
            tooltip: 'Delete terms of service',
            name: 'Delete',
            callback: () => {
              this.notificationService.confirmDialog({
                title: 'Delete terms of service',
                message: `Do you really want to delete terms of service '${tos.title}'?`,
              }).subscribe(result => {
                if (result === 'yes') {
                  this.settingsAPI.deleteTermsOfService(tos.id).subscribe(
                    () => {
                      this.notificationService.showMessage('Terms of service deleted');
                    },
                    () => {
                      this.notificationService.showMessage('Failed to delete terms of service');
                    }
                  ).add(() => {
                    this.refreshData()
                  });
                }
              })
              return of(null);
            },
          }),
        ]
      }
    });
  }

  ngOnDestroy(): void {
  }

  saveTosSettings() {
    this.tosSettings = this.tosSettingsForm.value;
    this.settingsAPI.saveTOSSettings(this.tosSettings).subscribe(
      () => {
        this.initTabData();
        this.notificationService.showMessage('Terms of service settings saved')
      },
      error => {
        if (error.error && error.error.detail) {
          this.notificationService.showMessage(error.error.detail);
        } else {
          this.notificationService.showMessage('Failed to save settings, check logs for details');
        }
      }
    );
  }

  protected setErrors(backendErrors: {}) {
    this.backendErrors = backendErrors;
    this.formErrors.setBackendErrors(backendErrors);
  }
}
