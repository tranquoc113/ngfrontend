import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IConfigurationModel } from '../../../../shared/fleio-api/configurations/model/configuration.model';
import { ConfigurationListUIService } from '../configuration-list-ui.service';

@Component({
  selector: 'app-configuration-create',
  templateUrl: './configuration-create.component.html',
  styleUrls: ['./configuration-create.component.scss']
})
export class ConfigurationCreateComponent extends DetailsBase<IConfigurationModel> implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private configurationListUIService: ConfigurationListUIService) {
    super(activatedRoute, configurationListUIService, 'create', null);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
