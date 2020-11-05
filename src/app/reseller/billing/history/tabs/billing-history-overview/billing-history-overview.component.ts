import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '../../../../../shared/fleio-api/fleio-objects-list';
import { IServiceDynamicUsageModel } from '../../../../../shared/fleio-api/billing/model/service-dynamic-usage.model';
import {
  ServiceDynamicUsagesApiService
} from '../../../../../shared/fleio-api/billing/service-dynamic-usage/service-dynamic-usages-api.service';

@Component({
  selector: 'app-billing-history-overview',
  templateUrl: './billing-history-overview.component.html',
  styleUrls: ['./billing-history-overview.component.scss']
})
export class BillingHistoryOverviewComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnInit, OnDestroy {
  serviceDynamicUsageList: FleioObjectsList<IServiceDynamicUsageModel> = null;
  usage: { [serviceId: string]: { income?: IServiceDynamicUsageModel, cost?: IServiceDynamicUsageModel } } = {};

  constructor(private serviceDynamicUsagesApiService: ServiceDynamicUsagesApiService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.serviceDynamicUsagesApiService.list().subscribe((list) => {
      this.serviceDynamicUsageList = list;
      for (const serviceDynamicUsage of list.objects) {
        if (!this.usage[serviceDynamicUsage.service_id]) {
          this.usage[serviceDynamicUsage.service_id] = {};
        }
        if (!serviceDynamicUsage.is_cost) {
          this.usage[serviceDynamicUsage.service_id].income = serviceDynamicUsage;
        } else {
          this.usage[serviceDynamicUsage.service_id].cost = serviceDynamicUsage;
        }
      }
    });
  }
}
