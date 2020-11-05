import { Component } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { SettingsOpenstackApiService } from '@fleio-api/core/settings-openstack-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { IVolumeSizesModel } from '@fleio-api/core/model/volume-sizes.model';

@Component({
  selector: 'app-volume-size-increments',
  templateUrl: './volume-size-increments.component.html',
  styleUrls: ['./volume-size-increments.component.scss']
})
export class VolumeSizeIncrementsComponent extends DetailsFormBase<IBaseFleioObjectModel> {
  volumeSizes: IVolumeSizesModel;
  regions: string[] = [];

  constructor(
    private settingsOpenstackApi: SettingsOpenstackApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  protected initTabData() {
    this.settingsOpenstackApi.getVolumeSizes().subscribe(volumeSizes => {
      this.volumeSizes = volumeSizes;
      this.regions = Object.keys(volumeSizes.volume_size_increments);
    })
  }

  save() {
    this.settingsOpenstackApi.saveVolumeSizes(this.volumeSizes).subscribe(
      (response) => {
        this.notificationService.showMessage(response.detail);
      },
      (error) =>{
        if (error.error.volume_size_increments) {
          this.notificationService.showMessage(
            `Cannot save volume size increments: ${error.error.volume_size_increments[0]}`
          )
        }
        if (error.error.volume_minimum_sizes) {
          this.notificationService.showMessage(
            `Cannot save volume minimum sizes: ${error.error.volume_minimum_sizes[0]}`
          )
        }
      },
    );
  }
}
