import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { ProjectListUiService } from '../project-list-ui.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent extends ListBase<IProjectModel> {

  constructor(
    private route: ActivatedRoute, private projectListUiService: ProjectListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, projectListUiService, refreshService, 'projects');
  }
}
