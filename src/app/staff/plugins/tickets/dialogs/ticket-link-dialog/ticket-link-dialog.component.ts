import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { ITicketModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket.model';
import { debounceTime, switchMap } from 'rxjs/operators';
import { TicketsApiService } from '../../../../../shared/fleio-api/plugins/tickets/tickets-api.service';
import { TicketLinkingApiService } from '../../../../../shared/fleio-api/plugins/tickets/ticket-linking-api.service';

@Component({
  selector: 'app-ticket-link-dialog',
  templateUrl: './ticket-link-dialog.component.html',
  styleUrls: ['./ticket-link-dialog.component.scss']
})
export class TicketLinkDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  backendErrors: {} = {};
  filteredTickets: Array<ITicketModel>;
  linkTicketForm: FormGroup = this.formBuilder.group({
    linked_ticket: ['', Validators.required],
    symmetrical: [false, Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<TicketLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticket: ITicketModel },
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private ticketsApiService: TicketsApiService,
    private ticketLinkingApiService: TicketLinkingApiService,
  ) {
  }

  displayTicketFn(ticket: ITicketModel) {
    if (ticket) {
      return `#${ticket.id} - ${ticket.title}`;
    }
    return '';
  }

  clickedTicketInput() {
    this.linkTicketForm.get('linked_ticket').setValue('');
  }

  ngOnInit() {
    this.linkTicketForm.get('linked_ticket').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.ticketsApiService.getTicketsForLinking(this.data.ticket.id, value).pipe()),
      ).subscribe((tickets: { objects: Array<ITicketModel> }) => {
      this.filteredTickets = tickets.objects;
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  linkTicket() {
    if (this.linkTicketForm.invalid) {
      return;
    }
    const value = this.linkTicketForm.value;
    this.ticketLinkingApiService.create({
      ticket: this.data.ticket.id,
      linked_ticket: value.linked_ticket.id,
      symmetrical: value.symmetrical,
    }).subscribe(result => {
      this.dialogRef.close('Ticket linking done successfully.');
    }, error => {
      this.formErrors.setBackendErrors(error.error.detail);
    })
  }
}
