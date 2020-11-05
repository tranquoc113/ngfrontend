import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ActivatedRoute } from '@angular/router';
import { ClusterListUiService } from '../cluster-list-ui.service';

@Component({
  selector: 'app-cluster-resize',
  templateUrl: './cluster-resize.component.html',
  styleUrls: ['./cluster-resize.component.scss']
})
export class ClusterResizeComponent extends DetailsBase<IClusterModel> implements OnInit {

  constructor(route: ActivatedRoute, clusterListUiService: ClusterListUiService) {
    super(route, clusterListUiService, 'resize', 'cluster');
  }
}
