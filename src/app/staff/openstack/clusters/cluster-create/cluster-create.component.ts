import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ClusterListUiService } from '../cluster-list-ui.service';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: ['./cluster-create.component.scss']
})
export class ClusterCreateComponent extends DetailsBase<IClusterModel> implements OnInit {

  constructor(route: ActivatedRoute, clusterListUiService: ClusterListUiService) {
    super(route, clusterListUiService, 'create', null, ['createOptions']);
  }
}
