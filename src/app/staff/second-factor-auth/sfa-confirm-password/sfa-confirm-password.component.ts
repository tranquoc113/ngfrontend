import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';
import { ActivatedRoute } from '@angular/router';
import { SecondFactorAuthListUiService } from '../second-factor-auth-list-ui.service';

@Component({
  selector: 'app-sfa-confirm-password',
  templateUrl: './sfa-confirm-password.component.html',
  styleUrls: ['./sfa-confirm-password.component.scss']
})
export class SfaConfirmPasswordComponent extends DetailsBase<ISfaTypeModel> {
  constructor(route: ActivatedRoute, secondFactorAuthListUiService: SecondFactorAuthListUiService) {
    super(route, secondFactorAuthListUiService, 'confirm-password', null);
  }
}
