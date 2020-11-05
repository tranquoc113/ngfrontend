import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IClientModel } from '../../../../../shared/fleio-api/client-user/model/client.model';
import {
  ServiceDynamicUsagesApiService
} from '../../../../../shared/fleio-api/billing/service-dynamic-usage/service-dynamic-usages-api.service';
import { FleioObjectsList } from '../../../../../shared/fleio-api/fleio-objects-list';
import { IServiceDynamicUsageModel } from '../../../../../shared/fleio-api/billing/model/service-dynamic-usage.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-client-details-billing',
  templateUrl: './client-details-billing.component.html',
  styleUrls: ['./client-details-billing.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ClientDetailsBillingComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  serviceDynamicUsageList: FleioObjectsList<IServiceDynamicUsageModel> = null;
  incomeSDUList: IServiceDynamicUsageModel[] = null;
  costSDUList: IServiceDynamicUsageModel[] = null;
  dynamicUsage: IServiceDynamicUsageModel = null;
  dynamicUsageCost: IServiceDynamicUsageModel = null;

  constructor(private serviceDynamicUsagesApiService: ServiceDynamicUsagesApiService) {
    super();
  }

  selectFirstServiceDynamicUsage() {
    this.dynamicUsage = this.incomeSDUList[0];
    this.dynamicUsageCost = this.costSDUList[0];
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.object) {
      this.serviceDynamicUsagesApiService.getForClient(this.object.id as number).subscribe((list) => {
        this.serviceDynamicUsageList = list;
        this.incomeSDUList = [];
        this.costSDUList = [];
        for (const serviceDynamicUsage of list.objects) {
          if (serviceDynamicUsage.service_cycle) {
            this.incomeSDUList.push(serviceDynamicUsage);
          } else {
            this.costSDUList.push(serviceDynamicUsage);
          }
        }

        this.selectFirstServiceDynamicUsage();
      });
    }
  }
}
