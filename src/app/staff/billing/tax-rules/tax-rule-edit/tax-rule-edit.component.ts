import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';
import { TaxRulesListUiService } from '../tax-rules-list-ui.service';

@Component({
  selector: 'app-tax-rule-edit',
  templateUrl: './tax-rule-edit.component.html',
  styleUrls: ['./tax-rule-edit.component.scss']
})
export class TaxRuleEditComponent extends DetailsBase<ITaxRuleModel> {
  constructor(route: ActivatedRoute, taxRulesListUiService: TaxRulesListUiService) {
    super(route, taxRulesListUiService, 'edit', 'taxRule', ['createOptions']);
  }
}
