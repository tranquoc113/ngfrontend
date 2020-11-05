import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';

@Component({
  selector: 'app-instance-move-dialog',
  templateUrl: './instance-move-dialog.component.html',
  styleUrls: ['./instance-move-dialog.component.scss']
})
export class InstanceMoveDialogComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  loading = false;
  instanceMoveForm = this.formBuilder.group({
    client: ['', Validators.required],
  });
  filteredClients: IClientModel[];
  backendErrors = {};
  constructor(
    public dialogRef: MatDialogRef<InstanceMoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { instance: IInstanceModel },
    private instancesApiService: InstancesApiService,
    private formBuilder: FormBuilder,
    private clientApiService: ClientsApiService
    ) {
  }

  public close() {
    this.dialogRef.close(false);
  }

  public move() {
    const client = this.instanceMoveForm.controls.client.value as IClientModel;
    if (!client) {
      return;
    }
    this.loading = true;
    this.instancesApiService.objectPostAction(
      this.data.instance.id,
      'move',
      {
        client: client.id
      }
    ).pipe().subscribe(
      response => {
        this.loading = false;
        this.dialogRef.close(true);
      }, error => {
        this.loading = false;
        this.backendErrors = error.error;
        this.formErrors.setBackendErrors(this.backendErrors);
      }
    );
  }

  displayClientFn(client: IClientModel) {
    return client.name || client.id;
  }

  clickedClientInput() {
    this.instanceMoveForm.get('client').setValue('');
  }

  ngOnInit() {
    this.instanceMoveForm.get('client').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.clientApiService.list({search: value}).pipe()),
      ).subscribe((clients: {objects: IClientModel[]}) => {
        this.filteredClients = clients.objects;
      });
  }

}
