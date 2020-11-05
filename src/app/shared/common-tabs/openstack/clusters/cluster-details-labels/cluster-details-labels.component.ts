import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';

@Component({
  selector: 'app-cluster-details-labels',
  templateUrl: './cluster-details-labels.component.html',
  styleUrls: ['./cluster-details-labels.component.scss']
})
export class ClusterDetailsLabelsComponent extends DetailsComponentBase<IClusterModel> implements OnInit {
  labels: {};
  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.object) {
      this.labels = JSON.parse(this.object.labels);
    }
  }

}
