import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ITicketModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { TicketsApiService } from '../../../../../shared/fleio-api/plugins/tickets/tickets-api.service';
import { TicketLinkingApiService } from '../../../../../shared/fleio-api/plugins/tickets/ticket-linking-api.service';

@Component({
  selector: 'app-remove-ticket-link-dialog',
  templateUrl: './remove-ticket-link-dialog.component.html',
  styleUrls: ['./remove-ticket-link-dialog.component.scss']
})
export class RemoveTicketLinkDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  backendErrors: {} = {};
  removeTicketLinkingForm: FormGroup = this.formBuilder.group({
    delete_symmetrical: [false, Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<RemoveTicketLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      ticket: ITicketModel,
      linkingId: string,
    },
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private ticketsApiService: TicketsApiService,
    private ticketLinkingApiService: TicketLinkingApiService,
  ) {
  }


  ngOnInit() {
  }

  close() {
    this.dialogRef.close(false);
  }

  removeLinking() {
    const value = this.removeTicketLinkingForm.value;
    this.ticketLinkingApiService.removeLinking(this.data.linkingId, value.delete_symmetrical)
      .subscribe(response => {
        this.dialogRef.close(true);
      }, error => {
        this.formErrors.setBackendErrors(error.error.detail);
      });
  }
}
