import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ClusterListUiService } from '../cluster-list-ui.service';

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.scss']
})
export class ClusterListComponent extends ListBase<IClusterModel> {

  constructor(
    private route: ActivatedRoute, private clusterListUiService: ClusterListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, clusterListUiService, refreshService, 'clusters');
  }
}
