import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { SettingsOpenstackApiService } from '../../../../../shared/fleio-api/core/settings-openstack-api.service';
import { IServiceVersionsModel } from '../../../../../shared/fleio-api/core/model/service-versions.model';

@Component({
  selector: 'app-discovered-services',
  templateUrl: './discovered-services.component.html',
  styleUrls: ['./discovered-services.component.scss']
})
export class DiscoveredServicesComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnDestroy {

  servicesVersions: { [key: string]: IServiceVersionsModel };
  servicesVersionsKeys: string[];
  loadServices: boolean;

  constructor(private settingsOpenstackApi: SettingsOpenstackApiService) {
    super();
  }

  initTabData() {
    this.loadServices = true;
    this.settingsOpenstackApi.getServicesVersions().subscribe(serviceVersions => {
      this.servicesVersions = serviceVersions;
      this.servicesVersionsKeys = Object.keys(this.servicesVersions);
      this.loadServices = false;
    })
  }

  isServiceVersionSupported(serviceVersions) {
    return (serviceVersions.min_version <= serviceVersions.version &&
      serviceVersions.version <= serviceVersions.max_version);
  }
}
