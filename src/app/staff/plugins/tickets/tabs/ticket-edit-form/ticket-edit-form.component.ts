import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { ITicketModel } from '@fleio-api/plugins/tickets/model/ticket.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ITicketDepartmentModel } from '@fleio-api/plugins/tickets/model/ticket-department.model';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { IUserModel } from '@fleio-api/client-user/model/user.model';
import { ITicketCreateOptionsModel } from '@fleio-api/plugins/tickets/model/ticket-create-options.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsApiService } from '@fleio-api/plugins/tickets/tickets-api.service';
import { TicketDepartmentsApiService } from '@fleio-api/plugins/tickets/ticket-departments-api.service';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { UsersApiService } from '@fleio-api/client-user/user/users-api.service';
import { ConfigService } from '@shared/config/config.service';
import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

@Component({
  selector: 'app-ticket-edit-form',
  templateUrl: './ticket-edit-form.component.html',
  styleUrls: ['./ticket-edit-form.component.scss']
})
export class TicketEditFormComponent extends DetailsFormBase<ITicketModel>implements OnInit {
  editTicketForm = this.formBuilder.group({
    title: ['', Validators.required],
    priority: ['medium', Validators.required],
    department: ['', Validators.required],
    status: ['open', Validators.required],
    internal_status: [''],
    cc_recipients: [''],
    client: [''],
    description: [''],
    assigned_to: [''],
  });

  filteredDepartments: Array<ITicketDepartmentModel>;
  filteredClients: Array<IClientModel>;
  filteredUsers: Array<IUserModel>;
  createOptions: ITicketCreateOptionsModel;
  prioritiesKeys: Array<string>;
  statusesKeys: Array<string>;
  internalStatusesKeys: Array<string>;
  tinyMCEOptions = null;
  loading = false;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private ticketsApiService: TicketsApiService, private router: Router,
              private ticketDepartmentsApiService: TicketDepartmentsApiService,
              private clientsApiService: ClientsApiService, private usersApiService: UsersApiService,
              private config: ConfigService,) {
    super();
  }

  saveTicket() {
    this.loading = true;
    const value = this.editTicketForm.value;
    this.editTicket(value);
    return of(null);
  }

  editTicket(value) {
    if (value.department) {
      value.department = value.department.id;
    }
    if (value.client) {
      value.client = value.client.id;
    }
    if (value.assigned_to) {
      value.assigned_to = value.assigned_to.id;
    }
    if (value.internal_status === '') {
      value.internal_status = null;
    }
    this.createOrUpdate(this.ticketsApiService, value).subscribe((response: any) => {
      this.loading = false;
      this.router.navigateByUrl(
        this.config.getPanelUrl(`plugins/tickets/${response.id}`)
      ).catch(() => {
      });
    }, error => {
      this.loading = false;
    });
  }

  displayDepartmentFn(dep) {
    if (dep) {
      return dep.name || dep.id;
    }
  }

  displayClientFn(client) {
    if (client) {
      return client.name || client.id;
    }
    return '';
  }

  displayAssignedToFn(user) {
    if (user) {
      return user.username || user.id;
    }
  }

  clickedAutocompleteInput(formField: string) {
    this.editTicketForm.get(formField).setValue('');
  }

  preselectDepartment(departmentId: FleioId) {
    this.ticketDepartmentsApiService.get(departmentId).subscribe(value => {
      this.editTicketForm.controls.department.setValue(value);
    })
  }

  preselectClient(clientId: FleioId) {
    this.clientsApiService.get(clientId).subscribe(value => {
      this.editTicketForm.controls.client.setValue(value);
    })
  }

  preselectAssignedTo(userId: FleioId) {
    this.usersApiService.get(userId).subscribe(value => {
      this.editTicketForm.controls.assigned_to.setValue(value);
    })
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.object) {
      this.editTicketForm.patchValue(this.object);
      if (this.object.department) {
        this.preselectDepartment(this.object.department);
      }
      if (this.object.client) {
        this.preselectClient(this.object.client);
      }
      if (this.object.assigned_to) {
        // @ts-ignore
        this.preselectAssignedTo(this.object.assigned_to as FleioId);
      }
      if (this.object.internal_status === null) {
        this.editTicketForm.controls.internal_status.setValue('');
      }
    }
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.createOptions) {
      this.prioritiesKeys = Object.keys(this.createOptions.priorities);
      this.statusesKeys = Object.keys(this.createOptions.statuses);
      this.internalStatusesKeys = Object.keys(this.createOptions.internal_statuses);
    }
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveTicket();
    }
    if (this.config.current) {
      this.tinyMCEOptions = this.config.current.settings.tinyMCEOptions;
    }
    this.editTicketForm.get('department').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.ticketDepartmentsApiService.list({
          search: value,
        }).pipe()),
      ).subscribe((departments: { objects: Array<ITicketDepartmentModel> }) => {
      this.filteredDepartments = departments.objects;
    });

    this.editTicketForm.get('client').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.clientsApiService.list({
          search: value,
        }).pipe()),
      ).subscribe((clients: { objects: Array<IClientModel> }) => {
      this.filteredClients = clients.objects;
    });

    this.editTicketForm.get('assigned_to').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.usersApiService.list({
          search: value,
          filtering: 'is_staff:True'
        }).pipe()),
      ).subscribe((users: { objects: Array<IUserModel> }) => {
      this.filteredUsers = users.objects;
    });
  }

}
