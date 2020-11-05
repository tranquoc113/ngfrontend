import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { IInstanceRebuildOptionsModel } from '@fleio-api/openstack/model/instance-rebuild-options.model';
import { ISelectedBootSource } from '../instance-create-form/boot-source-select/boot-source-select.component';
import { ConfigService } from '@shared/config/config.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@shared/ui-api/notification.service';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';

@Component({
  selector: 'app-instance-rebuild-form',
  templateUrl: './instance-rebuild-form.component.html',
  styleUrls: ['./instance-rebuild-form.component.scss']
})
export class InstanceRebuildFormComponent extends DetailsFormBase<IInstanceModel> implements OnInit {
  rebuildOptions: IInstanceRebuildOptionsModel;
  showUserData = false;
  instanceRebuildForm = this.formBuilder.group({
    user_data: [null],
    ssh_keys: [[]],
    root_password: [''],
  });
  selectedBootSource: ISelectedBootSource | null;
  showPasswordText = false;
  backendErrors = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    public config: ConfigService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private instancesApi: InstancesApiService,
    private router: Router) {
    super();
  }

  private rebuildInstance() {
    if (!this.selectedBootSource) {
      this.notificationService.showMessage('You must choose a boot source!');
      return of(null);
    }
    const value = this.instanceRebuildForm.value;
    value.image = this.selectedBootSource.object.id;
    if (value.hasOwnProperty('ssh_keys') && value.ssh_keys.length === 0) {
      delete value.ssh_keys;
    } else {
      value.ssh_keys = JSON.stringify(value.ssh_keys);
    }
    if (value.hasOwnProperty('user_data') && !value.user_data) {
      delete value.user_data;
    }
    this.instancesApi.objectPostAction(
      this.object.id,
      'rebuild',
      value
    ).pipe().subscribe(response => {
      this.notificationService.showMessage('Instance rebuild scheduled');
      this.router.navigateByUrl(
        this.config.getPrevUrl('openstack/instances')
      ).catch(() => {
      });
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(this.backendErrors);
    });
    return of(null);
  }

  public switchUserData() {
    this.showUserData = !this.showUserData;
    if (this.showUserData === false) {
      this.instanceRebuildForm.controls.user_data.setValue(null);
    }
  }

  public onBootSourceChange(selectedBootSource: ISelectedBootSource) {
    this.selectedBootSource = selectedBootSource;
  }

  ngOnInit() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.rebuildInstance();
    }
    this.rebuildOptions = this.activatedRoute.snapshot.data.rebuildOptions as IInstanceRebuildOptionsModel;
  }

}
