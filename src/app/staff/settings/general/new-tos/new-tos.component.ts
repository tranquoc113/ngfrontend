import { Component, OnInit } from '@angular/core';
import { IObjectController } from '@objects-view/interfaces/object-controller';
import { StaticObjectController } from '@objects-view/static-object-controller';
import { CurrenciesComponent } from '../tabs/currencies/currencies.component';
import { SignUpFormComponent } from '../tabs/sign-up/sign-up-form.component';
import { AuthenticationComponent } from '../tabs/authentication/authentication.component';
import { TermsOfServiceComponent } from '../tabs/terms-of-service/terms-of-service.component';
import { LicenseComponent } from '../tabs/license/license.component';
import { FrontendCustomizationComponent } from '../tabs/frontend-customization/frontend-customization.component';
import { EditTermsOfServiceFormComponent } from '../tabs/edit-terms-of-service-form/edit-terms-of-service-form.component';

@Component({
  selector: 'app-new-tos',
  templateUrl: './new-tos.component.html',
  styleUrls: ['./new-tos.component.scss']
})
export class NewTosComponent implements OnInit {
  public objectController: IObjectController = new StaticObjectController({
    header: {
      title: {
        text: 'New terms of service',
      }
    },
    tabs: [
      {
        tabName: 'Create tos',
        component: EditTermsOfServiceFormComponent,
      },
    ],
  });

  constructor() { }

  ngOnInit(): void {
  }
}
