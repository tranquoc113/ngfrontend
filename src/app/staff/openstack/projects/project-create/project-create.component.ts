import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectListUiService } from '../project-list-ui.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent extends DetailsBase<IProjectModel> {

  constructor(route: ActivatedRoute, projectListUiService: ProjectListUiService) {
    super(route, projectListUiService, 'create', null);
  }
}
