import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { IAction } from '@objects-view/interfaces/actions/action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { INetworkInterfaceModel } from '@fleio-api/openstack/model/network-interface.model';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { ConfigService } from '@shared/config/config.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-router-details-overview',
  templateUrl: './router-details-overview.component.html',
  styleUrls: ['./router-details-overview.component.scss']
})
export class RouterDetailsOverviewComponent extends DetailsComponentBase<IRouterModel> implements OnInit {
  commentText: string;
  interfaceActions: { [id: string]: IAction[] };

  constructor(
    private routersApiService: RoutersApiService,
    private refreshService: RefreshService,
    private configService: ConfigService,
    private notificationService: NotificationService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.object && this.object.interfaces) {
      this.updateInterfaceActions();
    }
    if (this.configService && this.configService.current && this.configService.current.settings &&
      this.configService.current.settings.refreshIntervals) {
      this.setupRefreshTimer(this.configService.current.settings.refreshIntervals.routerDetailsInterval);
      this.refreshTimer.start();
    }

    if (this.objectController) {
      this.objectController.dataChanged$.subscribe(() => {
        this.updateInterfaceActions();
      })
    }
  }

  private updateInterfaceActions() {
    this.interfaceActions = {};
    for (const netInt of this.object.interfaces) {
      this.interfaceActions[netInt.id] = this.getInterfaceActions(netInt);
    }
  }

  protected refreshData() {
    this.refreshService.refresh();
  }

  getInterfaceActions(netInt: INetworkInterfaceModel): IAction[] {
    return [
      new CallbackAction({
        icon: {name: 'delete'},
        tooltip: 'Remove interface',
        name: 'Remove interface',
        options: {displayMessages: false, displayConfirmation: true},
        confirmOptions: {
          confirm: true,
          title: 'Remove interface',
          message: `Are you sure you want to remove interface ${netInt.network_name} from router`,
        },
        refreshAfterExecute: true,
        callback: () => {
          return this.routersApiService.removeInterface(netInt.id, this.object.id).pipe(map(() => {
            this.notificationService.showMessage('Interface removed');
            this.refreshService.refresh();
            return null;
          }));
        }
      }),
    ];
  }
}
