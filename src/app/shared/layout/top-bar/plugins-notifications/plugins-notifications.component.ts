import { ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PluginsApiService } from '@fleio-api/core/plugins-api.service';
import { IPluginsWithNotificationsModel } from '@fleio-api/core/model/plugins-with-notifications.model';
import { RefreshTimer } from '@shared/ui-api/helpers/refresh-timer';
import { AuthService } from '@shared/auth/auth.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-plugins-notifications',
  templateUrl: './plugins-notifications.component.html',
  styleUrls: ['./plugins-notifications.component.scss']
})
export class PluginsNotificationsComponent implements OnInit, OnDestroy {
  @Input() panel: string;
  notificationsSubscription: Subscription;
  constructor(private pluginsApi: PluginsApiService, private authService: AuthService,
              private configService: ConfigService, private ngZone: NgZone,
              private changeDetectorRef: ChangeDetectorRef,) { }

  public pluginsNotifications: IPluginsWithNotificationsModel;
  private refreshTimer: RefreshTimer;

  ngOnInit(): void {
    if (this.panel === 'staff') {
      // plugin notifications are implemented only for staff for now
      this.refreshData();
      this.refreshTimer = new RefreshTimer(5000, () => {
        this.refreshData();
      }, this.configService, this.ngZone, this.changeDetectorRef);
    }
  }

  private refreshData() : void {
    if (this.authService.userData && this.authService.userData.user) {
      this.notificationsSubscription = this.pluginsApi.pluginsWithNotifications()
        .subscribe(pluginNotifications => {
          this.pluginsNotifications = pluginNotifications;
        });
    }
  }

  ngOnDestroy() {
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
      this.notificationsSubscription = null;
    }
  }

}
