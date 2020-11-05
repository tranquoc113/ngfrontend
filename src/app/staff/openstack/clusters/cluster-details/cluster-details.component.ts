import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ActivatedRoute } from '@angular/router';
import { ClusterListUiService } from '../cluster-list-ui.service';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.scss']
})
export class ClusterDetailsComponent extends DetailsBase<IClusterModel> implements OnInit {

  constructor(route: ActivatedRoute, clusterListUiService: ClusterListUiService) {
    super(route, clusterListUiService, 'details', 'cluster');
  }
}
