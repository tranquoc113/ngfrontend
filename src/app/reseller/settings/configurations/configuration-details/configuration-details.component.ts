import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IConfigurationModel } from '../../../../shared/fleio-api/configurations/model/configuration.model';
import { ConfigurationListUIService } from '../configuration-list-ui.service';

@Component({
  selector: 'app-configuration-details',
  templateUrl: './configuration-details.component.html',
  styleUrls: ['./configuration-details.component.scss']
})
export class ConfigurationDetailsComponent extends DetailsBase<IConfigurationModel> {
  constructor(route: ActivatedRoute, configurationListUIService: ConfigurationListUIService) {
    super(
      route, configurationListUIService, 'details', 'configuration',
      ['billingConfiguration'],
    );
  }
}
