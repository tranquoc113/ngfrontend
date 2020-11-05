import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { Observable, of } from 'rxjs';
import { IInstanceRescueOptionsModel } from '@fleio-api/openstack/model/instance-rescue-options.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ConfigService } from '@shared/config/config.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';

export interface IRescueParams {
  image: string;
  root_password?: string;
}

@Component({
  selector: 'app-instance-rescue-form',
  templateUrl: './instance-rescue-form.component.html',
  styleUrls: ['./instance-rescue-form.component.scss']
})
export class InstanceRescueFormComponent extends DetailsFormBase<IInstanceModel> implements OnInit {
  @ViewChild('imagesAsCards') imagesAsCards;
  loading = false;
  imageTypes = [
    {
      value: 'pub',
      display: 'Standard images',
    },
    {
      value: 'own',
      display: 'Client images',
    },
    {
      value: 'shr',
      display: 'Shared images',
    }
  ]; // rescue options image options format
  imageType = this.imageTypes[0];
  rescueOptions: IInstanceRescueOptionsModel;
  rescueForm = this.formBuilder.group({
    image: ['', Validators.required],
    root_password: [''],
  });
  backendErrors = {};
  showPassword = false;
  bootFromIso = false;
  hasImages = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private instancesApi: InstancesApiService,
    private notificationService: NotificationService,
    private router: Router,
    private config: ConfigService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  private rescueInstance(): Observable<IActionResult> {
    if (!this.hasImages) {
      this.notificationService.showMessage('No usable images to boot from found');
      return of(null);
    }
    const image = this.imagesAsCards.selectedImage as IImageModel;
    if (!image) {
      this.notificationService.showMessage('Select an image');
      return of(null);
    }
    let actionName = 'rescue';
    if (this.bootFromIso === true) {
      actionName = 'boot_from_iso';
    }
    const params = {
      image: image.id
    } as IRescueParams;
    if (this.bootFromIso === false) {
      params.root_password = this.rescueForm.controls.root_password.value;
    }
    this.loading = true;
    this.instancesApi.objectPostAction(
      this.object.id,
      actionName,
      params
    ).subscribe(() => {
      if (!this.bootFromIso) {
        this.notificationService.showMessage('Instance rescue scheduled');
      } else {
        this.notificationService.showMessage('Instance boot from ISO scheduled');
      }
      this.router.navigateByUrl(
        this.config.getPanelUrl(`openstack/instances/${this.object.id}`)
      ).catch(() => {
      });
    }, error => {
      this.backendErrors = error.error;
      this.formErrors.setBackendErrors(this.backendErrors);
    }).add(() => {
      this.loading = false;
    });
    return of(null);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.router.url.endsWith('boot-from-iso')) {
      this.bootFromIso = true;
    }
    this.rescueOptions = this.activatedRoute.snapshot.data.bootOptions;
    this.hasImages = this.rescueOptions && (
      this.rescueOptions.image.own.length +
      this.rescueOptions.image.pub.length +
      this.rescueOptions.image.shr.length) > 0;
    if (this.objectController) {
      this.objectController.actionCallback = () => this.rescueInstance();
    }
  }
}
