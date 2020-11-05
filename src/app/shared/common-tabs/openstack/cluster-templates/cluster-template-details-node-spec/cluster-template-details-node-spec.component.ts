import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-cluster-template-details-node-spec',
  templateUrl: './cluster-template-details-node-spec.component.html',
  styleUrls: ['./cluster-template-details-node-spec.component.scss']
})
export class ClusterTemplateDetailsNodeSpecComponent extends DetailsComponentBase<IClusterTemplateModel> implements OnInit {

  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
