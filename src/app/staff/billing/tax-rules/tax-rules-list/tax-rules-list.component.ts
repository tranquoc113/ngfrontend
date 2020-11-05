import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';
import { TaxRulesListUiService } from '../tax-rules-list-ui.service';

@Component({
  selector: 'app-tax-rules-list',
  templateUrl: './tax-rules-list.component.html',
  styleUrls: ['./tax-rules-list.component.scss']
})
export class TaxRulesListComponent extends ListBase<ITaxRuleModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private taxRulesListUiService: TaxRulesListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, taxRulesListUiService, refreshService, 'taxRules');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
