import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { ConfigService } from '../../../../config/config.service';
import { IConfigurationModel } from '../../../../fleio-api/configurations/model/configuration.model';
import { MatDialog } from '@angular/material/dialog';
import { ChangeConfigurationDialogComponent } from './dialogs/change-configuration-dialog/change-configuration-dialog.component';

@Component({
  selector: 'app-client-details-configurations',
  templateUrl: './client-details-configurations.component.html',
  styleUrls: ['./client-details-configurations.component.scss']
})
export class ClientDetailsConfigurationsComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  configuration: IConfigurationModel;

  constructor(
    private clientsApi: ClientsApiService,
    public config: ConfigService,
    private matDialog: MatDialog,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupRefreshTimer(3000);
  }

  protected refreshData() {
    this.clientsApi.objectGetAction(
      this.object.id, 'get_configuration'
    ).subscribe(configuration => {
      this.configuration = configuration;
    });
  }

  changeConfiguration() {
    this.matDialog.open(
      ChangeConfigurationDialogComponent, {
        data: {
          client: this.object,
          configuration: this.configuration,
        }
      }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.refreshData();
      }
    });
  }
}
