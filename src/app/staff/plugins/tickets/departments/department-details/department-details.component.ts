import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ITicketDepartmentModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket-department.model';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsListUiService } from '../departments-list-ui.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent extends DetailsBase<ITicketDepartmentModel> {
  constructor(route: ActivatedRoute, departmentsListUiService: DepartmentsListUiService) {
    super(route, departmentsListUiService, 'details', 'department');
  }
}
