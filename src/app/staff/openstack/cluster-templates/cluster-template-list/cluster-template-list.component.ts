import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { ClusterTemplateListUiService } from '../cluster-template-list-ui.service';

@Component({
  selector: 'app-cluster-template-list',
  templateUrl: './cluster-template-list.component.html',
  styleUrls: ['./cluster-template-list.component.scss']
})
export class ClusterTemplateListComponent extends ListBase<IClusterTemplateModel> {

  constructor(
    private route: ActivatedRoute, private clusterTemplateListUiService: ClusterTemplateListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, clusterTemplateListUiService, refreshService, 'clusterTemplates');
  }
}
