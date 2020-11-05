import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IConfigOptionModel } from '../../../../../shared/fleio-api/billing/model/config-option.model';

@Component({
  selector: 'app-config-option-details-overview',
  templateUrl: './config-option-details-overview.component.html',
  styleUrls: ['./config-option-details-overview.component.scss']
})
export class ConfigOptionDetailsOverviewComponent extends DetailsComponentBase<IConfigOptionModel> {

  constructor() {
    super();
  }
}
