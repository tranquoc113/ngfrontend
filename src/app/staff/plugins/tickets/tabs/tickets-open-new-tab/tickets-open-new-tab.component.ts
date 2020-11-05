import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { ITicketModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ITicketCreateOptionsModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket-create-options.model';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { ITicketDepartmentModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket-department.model';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IClientModel } from '../../../../../shared/fleio-api/client-user/model/client.model';
import { TicketDepartmentsApiService } from '../../../../../shared/fleio-api/plugins/tickets/ticket-departments-api.service';
import { ClientsApiService } from '../../../../../shared/fleio-api/client-user/client/clients-api.service';
import { UsersApiService } from '../../../../../shared/fleio-api/client-user/user/users-api.service';
import { IUserModel } from '../../../../../shared/fleio-api/client-user/model/user.model';
import { ConfigService } from '../../../../../shared/config/config.service';
import { TicketsApiService } from '../../../../../shared/fleio-api/plugins/tickets/tickets-api.service';
import { UploadInterfaceComponent } from '../../../../../shared/ui/upload-interface/upload-interface.component';
import { HttpResponse } from '@angular/common/http';
import { ITicketAttachmentModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket-attachment.model';
import { TicketAttachmentsApiService } from '../../../../../shared/fleio-api/plugins/tickets/ticket-attachments-api.service';
import { AppLocalStorageService } from '../../../../../shared/ui-api/app-local-storage.service';

@Component({
  selector: 'app-tickets-open-new-tab',
  templateUrl: './tickets-open-new-tab.component.html',
  styleUrls: ['./tickets-open-new-tab.component.scss']
})
export class TicketsOpenNewTabComponent extends DetailsFormBase<ITicketModel>implements OnInit {
  @ViewChild('uploadInterface') uploadInterface: UploadInterfaceComponent;
  openTicketForm = this.formBuilder.group({
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
              private config: ConfigService, private ticketAttachmentsApiService: TicketAttachmentsApiService,
              private appLocalStorageService: AppLocalStorageService) {
    super();
  }

  openTicket() {
    this.loading = true;
    const value = this.openTicketForm.value;
    const fileInputs = this.uploadInterface.getFileInputs();
    const allFiles = [];
    for (const fileInput of fileInputs) {
      if (fileInput.nativeElement.files.length) {
        // on ticket reply, for one input there is at most one file
        allFiles.push(fileInput.nativeElement.files[0]);
      }
    }
    if (allFiles.length) {
      let fd: FormData;
      const queriesList = [];
      for (const file of allFiles) {
        fd = new FormData();
        fd.append('data', file);
        fd.append('file_name', file.name);
        queriesList.push(this.ticketAttachmentsApiService.createWithUpload(fd))
      }
      forkJoin(queriesList).subscribe(responses => {
        let attachmentIDs = '';
        responses.forEach((queryResponse: HttpResponse<ITicketAttachmentModel>, index) => {
          attachmentIDs += queryResponse.body.id;
          if (index < responses.length - 1) {
            attachmentIDs += ',';
          }
        });
        this.addTicket(value, attachmentIDs, true);
        return of(null);
      }, error => {
        this.loading = false;
      });
      return of(null);
    } else {
      this.addTicket(value, '');
      return of(null);
    }
  }

  addTicket(value, associatedAttachmentsIds: string, resetFileInputs=false) {
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
    if (associatedAttachmentsIds) {
      value.associated_attachment_ids = associatedAttachmentsIds;
    }
    this.createOrUpdate(this.ticketsApiService, value).subscribe((response: any) => {
      if (resetFileInputs) {
        this.uploadInterface.resetFileInputs();
      }
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
    return dep.name || dep.id;
  }

  displayClientFn(client) {
    return client.name || client.id;
  }

  displayAssignedToFn(user) {
    return user.username || user.id;
  }

  clickedAutocompleteInput(formField: string) {
    this.openTicketForm.get(formField).setValue('');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.createOptions) {
      this.prioritiesKeys = Object.keys(this.createOptions.priorities);
      this.statusesKeys = Object.keys(this.createOptions.statuses);
      this.internalStatusesKeys = Object.keys(this.createOptions.internal_statuses);
    }
    if (this.objectController) {
      this.objectController.actionCallback = () => this.openTicket();
    }
    if (this.config.current) {
      this.tinyMCEOptions = this.config.current.settings.tinyMCEOptions;
    }
    this.openTicketForm.valueChanges.subscribe(
      ticketForm => {
        this.appLocalStorageService.setTicketOpenData(ticketForm);
      }
    );
    const temporarySavedCreateForm = this.appLocalStorageService.getTicketOpenData();
    if (temporarySavedCreateForm) {
      this.openTicketForm.patchValue(temporarySavedCreateForm);
    }
    if (!this.openTicketForm.controls.description.value) {
      if (this.createOptions && this.createOptions.user_signature) {
        this.openTicketForm.controls.description.setValue('<br>' + this.createOptions.user_signature);
      }
    }

    this.activatedRoute.params.subscribe(value => {
      if (value && value.forclient) {
        this.clientsApiService.get(value.forclient).subscribe(response => {
          this.openTicketForm.controls.client.setValue(response);
        })
      }
    });

    this.openTicketForm.get('department').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.ticketDepartmentsApiService.list({
          search: value,
        }).pipe()),
      ).subscribe((departments: { objects: Array<ITicketDepartmentModel> }) => {
      this.filteredDepartments = departments.objects;
    });

    this.openTicketForm.get('client').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.clientsApiService.list({
          search: value,
        }).pipe()),
      ).subscribe((clients: { objects: Array<IClientModel> }) => {
      this.filteredClients = clients.objects;
    });

    this.openTicketForm.get('assigned_to').valueChanges
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
