import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { ServicesApiService } from '@fleio-api/billing/services/service-api.service';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-client-details-services',
  templateUrl: './client-details-services.component.html',
  styleUrls: ['./client-details-services.component.scss']
})
export class ClientDetailsServicesComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  displayedColumns: string[] = ['display_name', 'cycle', 'activated', 'paid_until', 'status'];
  services: IServiceModel[];

  constructor(
    private servicesApiService: ServicesApiService,
    public config: ConfigService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupRefreshTimer(3000);
  }

  protected refreshData() {
    this.servicesApiService.list({
      client: this.object.id,
      page_size: 50,
    }).subscribe(servicesResp => {
      this.services = servicesResp.objects;
    });
  }

}
