import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { ProjectListUiService } from '../project-list-ui.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent extends DetailsBase<IProjectModel> {

  constructor(route: ActivatedRoute, projectListUiService: ProjectListUiService) {
    super(route, projectListUiService, 'edit', 'project');
  }
}
