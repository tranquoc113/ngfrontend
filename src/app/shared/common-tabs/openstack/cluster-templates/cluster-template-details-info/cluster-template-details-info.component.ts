import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ConfigService } from '@shared/config/config.service';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';

@Component({
  selector: 'app-cluster-template-details-info',
  templateUrl: './cluster-template-details-info.component.html',
  styleUrls: ['./cluster-template-details-info.component.scss']
})
export class ClusterTemplateDetailsInfoComponent extends DetailsComponentBase<IClusterTemplateModel> implements OnInit {

  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
