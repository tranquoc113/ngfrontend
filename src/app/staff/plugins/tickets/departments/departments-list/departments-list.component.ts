import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../../shared/ui-api/refresh.service';
import { ITicketDepartmentModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket-department.model';
import { DepartmentsListUiService } from '../departments-list-ui.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.scss']
})
export class DepartmentsListComponent extends ListBase<ITicketDepartmentModel> implements OnInit {
  constructor(
    private route: ActivatedRoute, private departmentsListUiService: DepartmentsListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, departmentsListUiService, refreshService, 'departments');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
