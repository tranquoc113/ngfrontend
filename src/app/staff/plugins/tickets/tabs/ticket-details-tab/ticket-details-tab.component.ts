import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { ITicketModel } from '@fleio-api/plugins/tickets/model/ticket.model';
import { ConfigService } from '@shared/config/config.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITicketCreateOptionsModel } from '@fleio-api/plugins/tickets/model/ticket-create-options.model';
import { forkJoin, of } from 'rxjs';
import { TicketsApiService } from '@fleio-api/plugins/tickets/tickets-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { UploadInterfaceComponent } from '@shared/ui/upload-interface/upload-interface.component';
import { TicketAttachmentsApiService } from '@fleio-api/plugins/tickets/ticket-attachments-api.service';
import { HttpResponse } from '@angular/common/http';
import { ITicketAttachmentModel } from '@fleio-api/plugins/tickets/model/ticket-attachment.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { DatePipe } from '@angular/common';
import { IUserModel } from '@fleio-api/client-user/model/user.model';
import { TicketUpdatesApiService } from '@fleio-api/plugins/tickets/ticket-updates-api.service';
import { TicketNotesApiService } from '@fleio-api/plugins/tickets/ticket-notes-api.service';
import { AppLocalStorageService } from '@shared/ui-api/app-local-storage.service';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { RemoveTicketLinkDialogComponent } from '../../dialogs/remove-ticket-link-dialog/remove-ticket-link-dialog.component';
import { TicketLinkingApiService } from '@fleio-api/plugins/tickets/ticket-linking-api.service';
import { TicketEditMessageDialogComponent } from '../../dialogs/ticket-edit-message-dialog/ticket-edit-message-dialog.component';
import { ITicketReplyModel } from '@fleio-api/plugins/tickets/model/ticket-reply.model';
import { IAction } from '@objects-view/interfaces/actions/action';

@Component({
  selector: 'app-ticket-details-tab',
  templateUrl: './ticket-details-tab.component.html',
  styleUrls: ['./ticket-details-tab.component.scss']
})
export class TicketDetailsTabComponent extends DetailsFormBase<ITicketModel>implements OnInit, AfterViewInit {
  @ViewChild('uploadInterface') uploadInterface: UploadInterfaceComponent;
  @ViewChild('textareaWrapper') textareaWrapper: ElementRef;
  public readonly datePipe: DatePipe;
  tinyMCEOptions = null;
  createOptions: ITicketCreateOptionsModel;
  replyForm = this.formBuilder.group({
    replyText: ['']
  })
  loading = false;
  hoveredItems: {
    [itemId: string]: boolean;
  } = {};

  constructor(public config: ConfigService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private ticketsApiService: TicketsApiService, private router: Router,
              private notificationService: NotificationService,
              private ticketAttachmentsApiService: TicketAttachmentsApiService,
              private ticketUpdatesApiService: TicketUpdatesApiService,
              private ticketNotesApiService: TicketNotesApiService,
              private appLocalStorageService: AppLocalStorageService,
              private ticketLinkingApiService: TicketLinkingApiService,
              private readonly matDialog: MatDialog,) {
    super();
    this.datePipe = new DatePipe(config.locale);
  }

  refreshTicket() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
    }).then(after => {
      this.loading = false; // for when we refresh the form due to reply adding
    }).catch(() => {
      // error would be handled by interceptor
    });
  }

  updateInternalStatus(newStatus: string = null) {
    this.object.internal_status = newStatus;
    this.ticketsApiService.update(this.object.id, this.object).subscribe(response => {
      this.refreshTicket();
      this.notificationService.showMessage('Internal status successfully updated.');
    });
  }

  replyToReply(quote: string, createdBy: IUserModel) {
      let splitQuote;
      splitQuote = quote.split('\n');
      const newQuote = [];
      splitQuote.forEach((element) => {
          element = element.replace('>', '> > ');
          newQuote.push(element);
      });
      let newQuoteJoined;
      newQuoteJoined = newQuote.join('\n');
      let replyText;
      if (createdBy) {
          replyText = newQuoteJoined + '<em>' + 'Quoted from ' + createdBy.full_name +'</em><p></p>';
      } else {
          replyText = newQuoteJoined;
      }
      this.replyForm.controls.replyText.setValue(replyText);
      if (this.textareaWrapper) {
        this.textareaWrapper.nativeElement.scrollIntoView();
      }
  };

  removeMessage(replyId, messageType: string) {
    if (messageType === 'ticketupdate') {
      this.notificationService.confirmDialog(
        {
          title: `Remove reply`,
          message: 'Do you want to remove the reply?'
        }
      ).subscribe(result => {
        if (result === 'yes') {
          this.refreshTicket();
          this.ticketUpdatesApiService.delete(replyId).subscribe(response => {
            this.notificationService.showMessage('Reply removed.');
          });
        }
      })
    } else {
      this.notificationService.confirmDialog(
        {
          title: `Remove note ${replyId}`,
          message: 'Do you want to remove the note?'
        }
      ).subscribe(result => {
        if (result === 'yes') {
          this.refreshTicket();
          this.ticketNotesApiService.delete(replyId).subscribe(response => {
            this.notificationService.showMessage('Note removed.');
          });
        }
      })
    }
  }

  openAttachment(attachmentId: FleioId) {
    if (this.config && this.config.current) {
      const url = `${this.config.current.urls.backendApiUrl}plugins/tickets/ticket_attachments/${attachmentId}/load_file`;
      window.open(url);
    } else {
      this.notificationService.showMessage('Cannot get config settings.');
    }
  }

  downloadAttachment(attachmentId: FleioId) {
    if (this.config && this.config.current) {
      const url = `${this.config.current.urls.backendApiUrl}plugins/tickets/ticket_attachments/${attachmentId}/download_file`;
      window.open(url);
    } else {
      this.notificationService.showMessage('Cannot get config settings.');
    }
  }

  removeAttachment(attachmentId: FleioId, fileName: string) {
    this.notificationService.confirmDialog(
      {
        title: `Remove attachment ${fileName || attachmentId}`,
        message: 'Do you want to remove the attachment?'
      }
    ).subscribe(result => {
      if (result === 'yes') {
        this.refreshTicket();
        this.ticketAttachmentsApiService.delete(attachmentId).subscribe(response => {
          this.notificationService.showMessage('Attachment removed.');
        });
      }
    })
  }

  replyToTicketActions(action: IAction) {
    const value = this.replyForm.value;
    if (!value.replyText) {
      this.notificationService.showMessage('Please add a message.');
      return of(null);
    }
    this.loading = true;
    const fileInputs = this.uploadInterface.getFileInputs();
    const allFiles = [];
    for (const fileInput of fileInputs) {
      if (fileInput && fileInput.nativeElement.files.length) {
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
        if (action.name === 'Add note') {
          this.addNote(value.replyText, attachmentIDs, true);
        } else if (action.name === 'Reply') {
          this.addReply(value.replyText, attachmentIDs, true);
        }
        return of(null);
      }, error => {
        this.loading = false;
      });
      return of(null);
    } else {
      if (action.name === 'Add note') {
        this.addNote(value.replyText, '');
      } else if (action.name === 'Reply') {
        this.addReply(value.replyText, '');
      }
      return of(null);
    }
  }

  addReply(replyText: string, associatedAttachments: string, resetFileInputs=false) {
    this.ticketsApiService.addReply(this.object.id, replyText, associatedAttachments).subscribe(resp => {
      if (resetFileInputs) {
        this.uploadInterface.resetFileInputs();
      }
      this.notificationService.showMessage('Reply added');
      if (this.createOptions && this.createOptions.user_signature) {
        this.replyForm.controls.replyText.setValue('<br>' + this.createOptions.user_signature);
      } else {
        this.replyForm.controls.replyText.setValue('');
      }
      this.refreshTicket();
    }, error => {
      this.loading = false;
      if (error && error.error && error.error.detail) {
        this.notificationService.showMessage(error.error.detail);
      }
    })
  }

  addNote(noteText: string, associatedAttachments: string, resetFileInputs=false) {
    this.ticketsApiService.addNote(this.object.id, noteText, associatedAttachments).subscribe(resp => {
      if (resetFileInputs) {
        this.uploadInterface.resetFileInputs();
      }
      this.notificationService.showMessage('Note added');
      if (this.createOptions && this.createOptions.user_signature) {
        this.replyForm.controls.replyText.setValue('<br>' + this.createOptions.user_signature);
      } else {
        this.replyForm.controls.replyText.setValue('');
      }
      this.refreshTicket();
    }, error => {
      this.loading = false;
      if (error && error.error && error.error.detail) {
        this.notificationService.showMessage(error.error.detail);
      }
    })
  }

  getLinkedTicketRedirect(ticketId: string) {
    if (this.config) {
      return this.config.getPanelUrl(`plugins/tickets/${ticketId}`);
    }
    return '#';
  }

  removeLinking(ticketId: string) {
    this.ticketLinkingApiService.list({
      ticket: this.object.id,
      linked_ticket: ticketId
    }).subscribe(response => {
      if (response && response.objects && response.objects.length) {
        const linkingId = response.objects[0].id;
        return this.matDialog.open(
          RemoveTicketLinkDialogComponent, {
            data: {
              ticket: this.object,
              linkingId,
            }
          }).afterClosed().subscribe(result => {
            if (!result) {
              return;
            }
            this.notificationService.showMessage('Ticket linking removed successfully.');
            this.router.navigateByUrl(
              this.config.getPanelUrl(`plugins/tickets/${this.object.id}`)
            ).catch();
            return {message: result} as IActionResult;
        });
      } else {
        this.notificationService.showMessage('Could not retrieve ticket link relation');
      }
    }, error => {
      this.notificationService.showMessage('Could not retrieve ticket link relation');
    });
  }

  editMessage(item: ITicketReplyModel) {
    return this.matDialog.open(
      TicketEditMessageDialogComponent, {
        data: {
          ticketReply: item,
        }
      }).afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
        this.notificationService.showMessage('Message updated successfully.');
        this.router.navigateByUrl(
          this.config.getPanelUrl(`plugins/tickets/${this.object.id}`)
        ).catch();
        return {message: result} as IActionResult;
    });
  }

  ngOnInit(): void {
    if (this.config.current) {
      this.tinyMCEOptions = this.config.current.settings.tinyMCEOptions;
    }
    if (this.objectController) {
      this.objectController.actionCallback = (action: IAction) => this.replyToTicketActions(action);
    }
    this.createOptions = this.activatedRoute.snapshot.data.createOptions;
    if (this.object && this.object.unread) {
      this.ticketsApiService.markAsRead(this.object.id).subscribe(response => {});
    }
    if (this.object) {
      this.replyForm.controls.replyText.valueChanges.subscribe(
        replyText => {
          this.appLocalStorageService.setTicketsReplyText(this.object.id, replyText);
        }
      );
    }
    if (this.object) {
      const temporarySavedReply = this.appLocalStorageService.getTicketsReplyText(this.object.id);
      if (temporarySavedReply) {
        this.replyForm.controls.replyText.setValue(temporarySavedReply);
      } else if (this.createOptions.user_signature) {
        this.replyForm.controls.replyText.setValue('<br>' + this.createOptions.user_signature);
      }
    }
  }

  ngAfterViewInit() {
    if (this.textareaWrapper) {
      this.textareaWrapper.nativeElement.scrollIntoView();
    }
  }

}
