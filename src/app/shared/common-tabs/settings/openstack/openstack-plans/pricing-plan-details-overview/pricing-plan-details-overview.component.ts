import { Component } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IPricingPlanModel } from '@fleio-api/openstack/model/pricing-plan.model';
import { ConfigService } from '@shared/config/config.service';
import { Observable } from 'rxjs';
import { NotificationService } from '@shared/ui-api/notification.service';
import { PricingRulesApiService } from '@fleio-api/openstack/pricing-rule/pricing-rules-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';

@Component({
  selector: 'app-pricing-plan-details-overview',
  templateUrl: './pricing-plan-details-overview.component.html',
  styleUrls: ['./pricing-plan-details-overview.component.scss']
})
export class PricingPlanDetailsOverviewComponent extends DetailsComponentBase<IPricingPlanModel> {
  displayedColumns: string[] = ['display_name', 'resource_name', 'price', 'start_dt', 'end_dt', 'actions'];

  constructor(public config: ConfigService, private notificationService: NotificationService,
              private pricingRulesApiService: PricingRulesApiService, private router: Router,
              private route: ActivatedRoute, private refreshService: RefreshService) {
    super();
  }

  public deletePricingRule(id) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
      title: 'Delete pricing rule?',
      message: 'Deleting the pricing rule will apply to all calculated costs',
    });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.pricingRulesApiService.delete(id).subscribe(() => {
            this.notificationService.showMessage('Successfully deleted price rule.');
            this.refreshService.refresh();
          },
          () => {
            this.notificationService.showMessage('Could not delete price rule.');
          }
        )
      }
    });
  }
}
