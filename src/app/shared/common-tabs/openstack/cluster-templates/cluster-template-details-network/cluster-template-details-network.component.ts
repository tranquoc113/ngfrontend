import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-cluster-template-details-network',
  templateUrl: './cluster-template-details-network.component.html',
  styleUrls: ['./cluster-template-details-network.component.scss']
})
export class ClusterTemplateDetailsNetworkComponent extends DetailsComponentBase<IClusterTemplateModel> implements OnInit {

  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
