import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { ConfigOptionListUIService } from '../config-option-list-ui.service';
import { IConfigOptionModel } from '../../../../shared/fleio-api/billing/model/config-option.model';

@Component({
  selector: 'app-config-option-list',
  templateUrl: './config-option-list.component.html',
  styleUrls: ['./config-option-list.component.scss']
})
export class ConfigOptionListComponent extends ListBase<IConfigOptionModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private configOptionListUIService: ConfigOptionListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, configOptionListUIService, refreshService, 'configOptions');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
