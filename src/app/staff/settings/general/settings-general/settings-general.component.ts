import { Component, OnInit } from '@angular/core';
import { CurrenciesComponent } from '../tabs/currencies/currencies.component';
import { SignUpFormComponent } from '../tabs/sign-up/sign-up-form.component';
import { AuthenticationComponent } from '../tabs/authentication/authentication.component';
import { TermsOfServiceComponent } from '../tabs/terms-of-service/terms-of-service.component';
import { LicenseComponent } from '../tabs/license/license.component';
import { FrontendCustomizationComponent } from '../tabs/frontend-customization/frontend-customization.component';
import { IObjectController } from '../../../../shared/ui/objects-view/interfaces/object-controller';
import { StaticObjectController } from '../../../../shared/ui/objects-view/static-object-controller';

@Component({
  selector: 'app-settings-general',
  templateUrl: './settings-general.component.html',
  styleUrls: ['./settings-general.component.scss']
})

export class SettingsGeneralComponent implements OnInit {
  public objectController: IObjectController = new StaticObjectController({
    header: {
      title: {
        text: 'General settings',
      }
    },
    tabs: [
      {
        tabName: 'Currencies',
        component: CurrenciesComponent,
      },
      {
        tabName: 'Sign up',
        component: SignUpFormComponent,
      },
      {
        tabName: 'Authentication',
        component: AuthenticationComponent,
      },
      {
        tabName: 'Terms of service',
        component: TermsOfServiceComponent,
      },
      {
        tabName: 'License',
        component: LicenseComponent,
      },
      {
        tabName: 'Frontend customization',
        component: FrontendCustomizationComponent,
      },
    ],
  });

  constructor() {
  }

  ngOnInit() {
  }
}
