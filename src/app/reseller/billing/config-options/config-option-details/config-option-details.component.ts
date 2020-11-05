import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IConfigOptionModel } from '../../../../shared/fleio-api/billing/model/config-option.model';
import { ConfigOptionListUIService } from '../config-option-list-ui.service';

@Component({
  selector: 'app-config-option-details',
  templateUrl: './config-option-details.component.html',
  styleUrls: ['./config-option-details.component.scss']
})
export class ConfigOptionDetailsComponent extends DetailsBase<IConfigOptionModel> {
  constructor(route: ActivatedRoute, configOptionListUIService: ConfigOptionListUIService) {
    super(route, configOptionListUIService, 'details', 'configOption');
  }
}
