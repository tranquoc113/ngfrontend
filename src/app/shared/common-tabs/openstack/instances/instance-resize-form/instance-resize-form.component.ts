import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { Observable, of } from 'rxjs';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';

@Component({
  selector: 'app-instance-resize-form',
  templateUrl: './instance-resize-form.component.html',
  styleUrls: ['./instance-resize-form.component.scss']
})
export class InstanceResizeFormComponent extends DetailsFormBase<IInstanceModel> implements OnInit {
  @ViewChild('flavorsAsCards') flavorsAsCards;
  loading = false;
  flavors: IFlavorModel[];
  selectedFlavor: IFlavorModel | null;
  flavorIncompatibility = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private config: ConfigService,
              private notificationService: NotificationService, private instancesApi: InstancesApiService) {
    super();
  }

  private resizeInstance() {
    this.selectedFlavor = this.flavorsAsCards.selectedFlavor;
    if (!this.selectedFlavor) {
      this.notificationService.showMessage('Select a flavor');
      return of(null);
    }
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
      title: 'Resize instance?',
      message: 'Instance resize will cause downtime. The instance will shutdown and the disk image will be copied ' +
        'to a new disk. This may take a while, depending on the disk size.',
    });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.loading = true;
        this.instancesApi.objectPostAction(
          this.object.id,
          'resize',
          {
            flavor: this.selectedFlavor.id
          }).pipe().subscribe(response => {
          this.notificationService.showMessage('Resize instance started');
          this.router.navigateByUrl(
            this.config.getPanelUrl(`openstack/instances/${this.object.id}`)
          ).catch(() => {
          });
        }, error => {
          this.notificationService.showMessage(error.error.detail);
        }).add(() => {
          this.loading = false;
        });
      }
    });
    return of(null);
  }

  ngOnInit() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.resizeInstance();
    }
    this.selectedFlavor = null;
    if (this.activatedRoute && this.activatedRoute.snapshot && this.activatedRoute.snapshot.data &&
      this.activatedRoute.snapshot.data.resizeOptions) {
      this.flavors = this.activatedRoute.snapshot.data.resizeOptions.flavors;
    }
  }

}
