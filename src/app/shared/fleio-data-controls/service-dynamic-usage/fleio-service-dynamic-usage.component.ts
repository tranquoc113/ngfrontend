import { Component, Input, OnInit } from '@angular/core';
import { IServiceDynamicUsageModel } from '../../fleio-api/billing/model/service-dynamic-usage.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IUsageDetails } from '../../fleio-api/billing/model/usage-details';

@Component({
  selector: 'app-fleio-service-dynamic-usage',
  templateUrl: './fleio-service-dynamic-usage.component.html',
  styleUrls: ['./fleio-service-dynamic-usage.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FleioServiceDynamicUsageComponent implements OnInit {
  @Input() dynamicUsage: IServiceDynamicUsageModel;
  @Input() dynamicUsageCost: IServiceDynamicUsageModel;
  public readonly detailColumns = ['name', 'region', 'price'];
  expandedElement: object;

  constructor() {
  }

  ngOnInit() {
  }

  getCostUsageDetails(usageDetails: IUsageDetails) {
    if (this.dynamicUsageCost && this.dynamicUsageCost.usage && this.dynamicUsageCost.usage.usage_details) {
      for (const costUsageDetails of this.dynamicUsageCost.usage.usage_details) {
        if (costUsageDetails.resource_name === usageDetails.resource_name &&
          costUsageDetails.resource_type === usageDetails.resource_type) {
          return costUsageDetails;
        }
      }
    }

    return null;
  }

  getCostUsage(usageDetails: IUsageDetails, usage: any) {
    const costUsageDetails = this.getCostUsageDetails(usageDetails);
    if (costUsageDetails) {
      for (const costUsage of costUsageDetails.usage) {
        if (costUsage.resource_id === usage.resource_id) {
          return costUsage;
        }
      }
    }

    return null;
  }
}
