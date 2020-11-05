import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-instance-rename-dialog',
  templateUrl: './instance-rename-dialog.component.html',
  styleUrls: ['./instance-rename-dialog.component.scss']
})
export class InstanceRenameDialogComponent implements OnInit {
  instanceRenameForm = this.formBuilder.group({
    name: ['', Validators.required],
  });
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<InstanceRenameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { instance: IInstanceModel },
    private instancesApiService: InstancesApiService,
    private formBuilder: FormBuilder,
    ) {
  }

  public close() {
    this.dialogRef.close(false);
  }

  public rename() {
    if (this.instanceRenameForm.invalid) {
      return;
    }
    this.loading = true;
    this.instancesApiService.objectPostAction(
      this.data.instance.id,
      'rename',
      {
        name: this.instanceRenameForm.controls.name.value
      }
    ).subscribe(result => {
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
    });
  }

  ngOnInit() {
    if (this.data && this.data.instance) {
      this.instanceRenameForm.controls.name.setValue(this.data.instance.name);
    }
  }

}
