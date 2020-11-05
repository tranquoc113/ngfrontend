import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { ConfigurableOptionListUiService } from '../configurable-option-list-ui.service';

@Component({
  selector: 'app-configurable-option-list',
  templateUrl: './configurable-option-list.component.html',
  styleUrls: ['./configurable-option-list.component.scss']
})
export class ConfigurableOptionListComponent extends ListBase<IConfigOptionModel> {

  constructor(
    private route: ActivatedRoute, private configurableOptionListUiService: ConfigurableOptionListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, configurableOptionListUiService, refreshService, 'configurableOptions');
  }
}
