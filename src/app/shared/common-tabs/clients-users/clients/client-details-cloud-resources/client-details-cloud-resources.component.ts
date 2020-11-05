import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { OpenstackClientsApiService } from '@fleio-api/client-user/client/openstack-clients-api.service';
import { ConfigService } from '@shared/config/config.service';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

@Component({
  selector: 'app-client-details-cloud-resources',
  templateUrl: './client-details-cloud-resources.component.html',
  styleUrls: ['./client-details-cloud-resources.component.scss']
})
export class ClientDetailsCloudResourcesComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  cloudSummary: {
    [key: string]: {
      name: string;
      objects: {}[];
      count: number;
      load_count: number;
    }
  };
  cloudSummaryKeys: Array<string> = [];
  clientOsProjectId: FleioId;
  users: {}[];

  constructor(
    private clientsApiService: ClientsApiService,
    private openstackClientsApiService: OpenstackClientsApiService,
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
    if (this.object) {
      this.openstackClientsApiService.openstackServices(this.object.id).subscribe(servicesResponse => {
        if (servicesResponse.services.length) {
          const serviceId = servicesResponse.services[0].id;
          this.clientOsProjectId = servicesResponse.projects[serviceId].project_id;
          this.clientsApiService.getUsers(this.object.id).subscribe(usersResponse => {
            this.users = usersResponse.users;
          });
        }
        this.clientsApiService.getCloudSummary(this.object.id).subscribe(cloudSummary => {
          this.cloudSummary = cloudSummary;
          this.cloudSummaryKeys = Object.keys(this.cloudSummary);
        })
      })
    }
  }
}
