import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ClusterTemplateListUiService } from '../cluster-template-list-ui.service';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';

@Component({
  selector: 'app-cluster-template-create',
  templateUrl: './cluster-template-create.component.html',
  styleUrls: ['./cluster-template-create.component.scss']
})
export class ClusterTemplateCreateComponent extends DetailsBase<IClusterTemplateModel> implements OnInit {

  constructor(route: ActivatedRoute, clusterTemplateListUiService: ClusterTemplateListUiService) {
    super(route, clusterTemplateListUiService, 'create', null, ['createOptions']);
  }
}
