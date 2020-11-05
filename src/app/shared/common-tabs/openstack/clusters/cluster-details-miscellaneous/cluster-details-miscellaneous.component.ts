import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';

@Component({
  selector: 'app-cluster-details-miscellaneous',
  templateUrl: './cluster-details-miscellaneous.component.html',
  styleUrls: ['./cluster-details-miscellaneous.component.scss']
})
export class ClusterDetailsMiscellaneousComponent extends DetailsComponentBase<IClusterModel> implements OnInit {

  constructor() {
    super();
  }

}
