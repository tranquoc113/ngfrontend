import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { ITicketSignatureModel } from '@fleio-api/plugins/tickets/model/ticket-signature.model';
import { ConfigService } from '@shared/config/config.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { IAction } from '@objects-view/interfaces/actions/action';
import { EMPTY, Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { TicketsSignaturesApiService } from '@fleio-api/plugins/tickets/tickets-signatures-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@shared/ui-api/notification.service';
import { AddSignatureDialogComponent } from './add-signature-dialog/add-signature-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

@Component({
  selector: 'app-ticket-edit-signatures-form',
  templateUrl: './ticket-edit-signatures-form.component.html',
  styleUrls: ['./ticket-edit-signatures-form.component.scss']
})
export class TicketEditSignaturesFormComponent extends DetailsFormBase<any> implements OnInit {
  signaturesForm = this.initBasicForm();
  signatures: Array<ITicketSignatureModel> = [];
  tinyMCEOptions: any;

  initBasicForm() {
    return this.formBuilder.group({
      objects: this.formBuilder.array([])
    });
  }

  initSignatureObj(){
    return this.formBuilder.group({
      id: [''],
      content: [''],
      user: [null],
      department: [null],
      department_display: ['']
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private config: ConfigService,
    private ticketsSignaturesApiService: TicketsSignaturesApiService,
    private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
  ) {
    super();
  }

  public get signaturesObjects() {
    return this.signaturesForm.get('objects') as FormArray;
  }

  protected refreshData() {
    super.refreshData();
    this.ticketsSignaturesApiService.getSignaturesForCurrentUser().subscribe(result => {
      this.objectController.object = result;
      this.initFormData();
    });
  }

  addGlobalSignature() {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
      title: 'Add global signature?',
      message: 'This will add the global signature',
    });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.ticketsSignaturesApiService.addGlobalSignature().subscribe(response => {
          this.notificationService.showMessage('Successfully added global signature.');
          this.refreshData();
        }, error => {
          this.notificationService.showMessage('Could not add global signature.');
        })
      }
    });
  }

  private signaturesActions(action: IAction): Observable<IActionResult> {
    if (action.name === 'Add signature') {
      if (this.signatures.length === 0) {
        this.addGlobalSignature();
        return of(null);
      }
      this.matDialog.open(
        AddSignatureDialogComponent
      ).afterClosed().subscribe(result => {
        if (result === true) {
          this.refreshData();
        }
      });
      return of(null);
    }
    const value = this.signaturesForm.value;

    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    this.ticketsSignaturesApiService.saveSignatures(value).subscribe(response => {
      this.refreshData();
      this.notificationService.showMessage('Successfully saved signatures.');
    }, error => {
      if (error.error) {
        this.setErrors(error.error);
      }
      this.notificationService.showMessage('Failed to save signatures');
    })

    return of(null);
  }

  deleteSignature(id: FleioId) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
      title: 'Delete signature?',
      message: 'This will delete the signature',
    });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.ticketsSignaturesApiService.delete(id).subscribe(response => {
          this.notificationService.showMessage('Successfully deleted signature.');
          this.refreshData();
        }, error => {
          this.notificationService.showMessage('Could not delete signature.');
        })
      }
    });
  }

  initFormData() {
    this.signaturesForm = this.initBasicForm();
    if (this.object) {
      this.signatures = this.object.objects;
      let i = 0;
      while (i < this.signatures.length) {
        this.signaturesObjects.push(this.initSignatureObj());
        i++;
      }
      if (this.object && this.object.objects && this.object.objects.length) {
        this.signaturesForm.patchValue(this.object);
      }
    }
  }

  ngOnInit(): void {
    if (this.objectController) {
      this.objectController.actionCallback = (action: IAction) => this.signaturesActions(action);
    }
    this.initFormData();
    if (this.config && this.config.current) {
      this.tinyMCEOptions = this.config.current.settings.tinyMCEOptions;
    }
  }

}
