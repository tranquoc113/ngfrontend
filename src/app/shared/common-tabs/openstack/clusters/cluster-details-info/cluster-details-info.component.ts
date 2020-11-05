import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-cluster-details-info',
  templateUrl: './cluster-details-info.component.html',
  styleUrls: ['./cluster-details-info.component.scss']
})
export class ClusterDetailsInfoComponent extends DetailsComponentBase<IClusterModel> implements OnInit{

  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
