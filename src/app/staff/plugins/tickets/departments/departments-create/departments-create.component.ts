import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ITicketDepartmentModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket-department.model';
import { DepartmentsListUiService } from '../departments-list-ui.service';

@Component({
  selector: 'app-departments-create',
  templateUrl: './departments-create.component.html',
  styleUrls: ['./departments-create.component.scss']
})
export class DepartmentsCreateComponent extends DetailsBase<ITicketDepartmentModel> {
  constructor(route: ActivatedRoute, departmentsListUiService: DepartmentsListUiService) {
    super(route, departmentsListUiService, 'create', null);
  }
}
