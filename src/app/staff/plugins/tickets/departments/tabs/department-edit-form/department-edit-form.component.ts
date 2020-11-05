import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../../shared/ui/objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '../../../../../../shared/ui/objects-view/interfaces/actions/action-result';
import { ITicketDepartmentModel } from '../../../../../../shared/fleio-api/plugins/tickets/model/ticket-department.model';
import { IDepartmentCreateOptionsModel } from '../../../../../../shared/fleio-api/plugins/departments/model/department-create-options.model';
import { TicketDepartmentsApiService } from '../../../../../../shared/fleio-api/plugins/tickets/ticket-departments-api.service';

@Component({
  selector: 'app-department-edit-form',
  templateUrl: './department-edit-form.component.html',
  styleUrls: ['./department-edit-form.component.scss']
})
export class DepartmentEditFormComponent extends DetailsFormBase<ITicketDepartmentModel> implements OnInit {
  departmentForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    ticket_id_format: ['', Validators.required],
    notification_on_ticket_open_to_staff: [false, Validators.required],
    notification_on_staff_user_reply_to_staff: [false, Validators.required],
    notification_on_user_reply_to_staff: [false, Validators.required],
    notification_to_user_on_ticket_opened: [false, Validators.required],
    notification_to_user_on_ticket_closed: [false, Validators.required],
    notification_on_staff_user_reply_to_user: [false, Validators.required],
    notify_cc_recipients_on_ticket_open: [false, Validators.required],
    notify_cc_recipients_on_ticket_close: [false, Validators.required],
    notify_cc_recipients_on_ticket_reply: [false, Validators.required],
  });
  createOptions: IDepartmentCreateOptionsModel;

  constructor(
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private config: ConfigService,
    private ticketDepartmentsApiService: TicketDepartmentsApiService, private router: Router,
  ) {
    super();
  }

  addTicketIdShortKey(key: string) {
    const currentIdFormat = this.departmentForm.controls.ticket_id_format.value;
    const newIdFormat = currentIdFormat + key;
    this.departmentForm.controls.ticket_id_format.setValue(newIdFormat);
  }

  ngOnInit() {
    super.ngOnInit();
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveDepartment();
    }
    if (this.object) {
      this.departmentForm.patchValue(this.object);
    }
    if (this.createOptions && this.object && !this.object.ticket_id_format) {
      this.departmentForm.controls.ticket_id_format.setValue(this.createOptions.ticket_id_default_format);
    }
  }

  private saveDepartment(): Observable<IActionResult> {
    const value = this.departmentForm.value as any;

    this.createOrUpdate(this.ticketDepartmentsApiService, value).subscribe(() => {
      this.router.navigateByUrl(
        this.config.getPrevUrl('plugins/tickets/departments')
      ).catch(() => {});
    });

    return of(null);
  }
}
