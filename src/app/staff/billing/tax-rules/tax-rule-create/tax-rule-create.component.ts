import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';
import { TaxRulesListUiService } from '../tax-rules-list-ui.service';

@Component({
  selector: 'app-tax-rule-create',
  templateUrl: './tax-rule-create.component.html',
  styleUrls: ['./tax-rule-create.component.scss']
})
export class TaxRuleCreateComponent extends DetailsBase<ITaxRuleModel> {
  constructor(route: ActivatedRoute, taxRulesListUiService: TaxRulesListUiService) {
    super(route, taxRulesListUiService, 'create', null, ['createOptions']);
  }
}
