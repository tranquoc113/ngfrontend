import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-cluster-details-nodes',
  templateUrl: './cluster-details-nodes.component.html',
  styleUrls: ['./cluster-details-nodes.component.scss']
})
export class ClusterDetailsNodesComponent extends DetailsComponentBase<IClusterModel> implements OnInit {
  masterAddresses: Array<string> = [];
  nodeAddresses: Array<string> = [];

  constructor(
    public config: ConfigService,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.object) {
      if (this.object.master_addresses) {
        this.masterAddresses = JSON.parse(this.object.master_addresses.replace(/'/g, '"'));
      }
      if (this.object.node_addresses) {
        this.nodeAddresses = JSON.parse(this.object.node_addresses.replace(/'/g, '"'));
      }
    }
  }

}
