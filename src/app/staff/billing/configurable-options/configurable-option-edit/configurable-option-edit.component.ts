import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { ConfigurableOptionListUiService } from '../configurable-option-list-ui.service';

@Component({
  selector: 'app-configurable-option-edit',
  templateUrl: './configurable-option-edit.component.html',
  styleUrls: ['./configurable-option-edit.component.scss']
})
export class ConfigurableOptionEditComponent extends DetailsBase<IConfigOptionModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, configurableOptionListUiService: ConfigurableOptionListUiService) {
    super(
      route, configurableOptionListUiService, 'edit',
      'configurableOption', ['createOptions'],
    );
  }
}
