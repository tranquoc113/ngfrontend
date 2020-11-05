import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketsSignaturesApiService } from '@fleio-api/plugins/tickets/tickets-signatures-api.service';
import { ITicketDepartmentModel } from '@fleio-api/plugins/tickets/model/ticket-department.model';
import { debounceTime, switchMap } from 'rxjs/operators';
import { TicketDepartmentsApiService } from '@fleio-api/plugins/tickets/ticket-departments-api.service';

@Component({
  selector: 'app-add-signature-dialog',
  templateUrl: './add-signature-dialog.component.html',
  styleUrls: ['./add-signature-dialog.component.scss']
})
export class AddSignatureDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  addSignatureForm = this.formBuilder.group({
    department: [null],
    content: ['']
  });
  backendErrors = {};
  filteredDepartments: Array<ITicketDepartmentModel>;

  constructor(
    public dialogRef: MatDialogRef<AddSignatureDialogComponent>,
    private formBuilder: FormBuilder,
    private ticketsSignaturesApiService: TicketsSignaturesApiService,
    private ticketDepartmentsApiService: TicketDepartmentsApiService,
  ) { }

  public close() {
    this.dialogRef.close(false);
  }

  displayDepartmentFn(dep) {
    if (dep) {
      return dep.name || dep.id;
    }
  }

  clickedAutocompleteInput(formField: string) {
    this.addSignatureForm.get(formField).setValue('');
  }

  public addSignature() {
    if (!this.addSignatureForm.valid) {
      return;
    }
    const data = this.addSignatureForm.value;
    if (data.department) {
      data.department = data.department.id;
    }
    this.ticketsSignaturesApiService.create(
        data
      ).subscribe(result => {
      this.dialogRef.close(true);
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(error.error);
    });
  }

  ngOnInit(): void {
    this.addSignatureForm.get('department').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.ticketDepartmentsApiService.list({
          search: value,
        }).pipe()),
      ).subscribe((departments: { objects: Array<ITicketDepartmentModel> }) => {
      this.filteredDepartments = departments.objects;
    });
  }

}
