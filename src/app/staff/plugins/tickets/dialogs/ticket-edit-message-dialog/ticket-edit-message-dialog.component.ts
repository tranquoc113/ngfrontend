import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { ITicketReplyModel } from '../../../../../shared/fleio-api/plugins/tickets/model/ticket-reply.model';
import { ConfigService } from '../../../../../shared/config/config.service';
import { TicketUpdatesApiService } from '../../../../../shared/fleio-api/plugins/tickets/ticket-updates-api.service';
import { TicketNotesApiService } from '../../../../../shared/fleio-api/plugins/tickets/ticket-notes-api.service';

@Component({
  selector: 'app-ticket-edit-message-dialog',
  templateUrl: './ticket-edit-message-dialog.component.html',
  styleUrls: ['./ticket-edit-message-dialog.component.scss']
})
export class TicketEditMessageDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  backendErrors: {} = {};
  editTicketMessageForm: FormGroup = this.formBuilder.group({
    reply_text: ['', Validators.required]
  });
  tinyMCEOptions = null;

  constructor(
    public dialogRef: MatDialogRef<TicketEditMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      ticketReply: ITicketReplyModel,
    },
    private config: ConfigService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private ticketUpdatesApiService: TicketUpdatesApiService,
    private ticketNotesApiService: TicketNotesApiService,
  ) {
  }


  ngOnInit() {
    if (this.config && this.config.current) {
      this.tinyMCEOptions = this.config.current.settings.tinyMCEOptions;
    }
    if (this.data && this.data.ticketReply) {
      this.editTicketMessageForm.controls.reply_text.setValue(this.data.ticketReply.message);
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  save() {
    const ticketReply = this.data.ticketReply;
    const value = this.editTicketMessageForm.value;
    if (ticketReply.message_type === 'ticketupdate') {
      // @ts-ignore
      this.ticketUpdatesApiService.update(ticketReply.id, {reply_text: value.reply_text})
        .subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          this.backendErrors = error.error;
          this.formErrors.setBackendErrors(error.error);
        })
    } else {
      // @ts-ignore
      this.ticketNotesApiService.update(ticketReply.id, {note_text: value.reply_text})
        .subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          this.backendErrors = error.error;
          this.formErrors.setBackendErrors(error.error);
        })
    }
  }
}
