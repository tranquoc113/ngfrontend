import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../ui-api/notification.service';
import { ApiUsersApiService } from '@fleio-api/openstack/api-user/api-users-api.service';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';
import { RegionsApiService } from '@fleio-api/openstack/region/regions-api.service';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';

@Component({
  selector: 'app-api-user-download-openrc',
  templateUrl: './api-user-download-openrc.component.html',
  styleUrls: ['./api-user-download-openrc.component.scss']
})
export class ApiUserDownloadOpenrcComponent implements OnInit {
  regionsResponse: FleioObjectsList<IRegionModel> | null;
  selectedRegion: IRegionModel;
  constructor(
    public dialogRef: MatDialogRef<ApiUserDownloadOpenrcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { apiUser: IApiUserModel },
    private apiUsersApiService: ApiUsersApiService,
    private notificationService: NotificationService,
    private regionsApiService: RegionsApiService,
    ) {
  }

  public close() {
    this.dialogRef.close(false);
  }

  public getOpenRCFile() {
    if (!this.selectedRegion) {
      return;
    }
    this.apiUsersApiService.postAction(
      'get_openrc_file_content',
      {
        user_name: this.data.apiUser.name,
        default_project_id: this.data.apiUser.default_project_id,
        region: this.selectedRegion,
      }
    ).pipe().subscribe(responseData => {
      const blob = new Blob([responseData.content], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'openrc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.dialogRef.close(true);
    });
  }

  ngOnInit() {
    this.regionsResponse = null;
    this.regionsApiService.list().pipe().subscribe(response => {
      this.regionsResponse = response;
    });
  }

}
