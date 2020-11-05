import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { IConfigurationModel } from '../../../../shared/fleio-api/configurations/model/configuration.model';
import { ConfigurationListUIService } from '../configuration-list-ui.service';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.scss']
})
export class ConfigurationListComponent extends ListBase<IConfigurationModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private configurationListUIService: ConfigurationListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, configurationListUIService, refreshService, 'configurations', );
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
