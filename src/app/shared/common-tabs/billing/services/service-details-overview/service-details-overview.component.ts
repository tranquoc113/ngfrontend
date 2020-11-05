import { Component, OnInit } from '@angular/core';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ConfigService } from '@shared/config/config.service';
import { AuthService } from '@shared/auth/auth.service';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { ServicesApiService } from '@fleio-api/billing/services/service-api.service';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-service-details-overview',
  templateUrl: './service-details-overview.component.html',
  styleUrls: ['./service-details-overview.component.scss']
})
export class ServiceDetailsOverviewComponent extends DetailsComponentBase<IServiceModel> implements OnInit {
  showOrder: boolean;
  initialServerId: FleioId;

  constructor(
    public config: ConfigService,
    public auth: AuthService,
    private servicesApiService: ServicesApiService,
    private refreshService: RefreshService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.object && this.object.hosting_account) {
      this.initialServerId = this.object.hosting_account.server;
    }
    this.showOrder = this.auth.feature('ui.billing.services.show-order');
  }

  get showUpgradeButtons() {
    return this.auth.feature(
      'ui.billing.services.upgrade-downgrade'
    ) && ['pending', 'active'].includes(this.object.status);
  }

  updateServer() {
    this.servicesApiService.updateHostingAccount(this.object.id, this.object.hosting_account).subscribe(
      () => {
        this.notificationService.showMessage('Server updated');
        this.refreshService.refresh();
      },
      () => {
        this.notificationService.showMessage('Failed to update server');
      }
    )
  }
}
