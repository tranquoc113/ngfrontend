import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { SecondFactorAuthListUiService } from '../second-factor-auth-list-ui.service';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';

@Component({
  selector: 'app-sfa-options',
  templateUrl: './sfa-options.component.html',
  styleUrls: ['./sfa-options.component.scss']
})
export class SfaOptionsComponent extends DetailsBase<ISfaTypeModel> {
  constructor(route: ActivatedRoute, secondFactorAuthListUiService: SecondFactorAuthListUiService) {
    super(route, secondFactorAuthListUiService, 'options', 'sfaOptions');
  }
}
