import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ActivatedRoute } from '@angular/router';
import { ClusterListUiService } from '../cluster-list-ui.service';

@Component({
  selector: 'app-cluster-upgrade',
  templateUrl: './cluster-upgrade.component.html',
  styleUrls: ['./cluster-upgrade.component.scss']
})
export class ClusterUpgradeComponent extends DetailsBase<IClusterModel> implements OnInit {

  constructor(route: ActivatedRoute, clusterListUiService: ClusterListUiService) {
    super(route, clusterListUiService, 'upgrade', 'cluster');
  }
}
