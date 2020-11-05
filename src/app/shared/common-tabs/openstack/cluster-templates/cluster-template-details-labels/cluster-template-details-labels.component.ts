import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-cluster-template-details-labels',
  templateUrl: './cluster-template-details-labels.component.html',
  styleUrls: ['./cluster-template-details-labels.component.scss']
})
export class ClusterTemplateDetailsLabelsComponent extends DetailsComponentBase<IClusterTemplateModel>
  implements OnInit {
  labels: {};

  constructor(
    public config: ConfigService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.object) {
      this.labels = JSON.parse(
        this.object.labels
          .replace(/'/g, '"')
          .replace(/None/g, 'null')
      );
    }
  }
}
