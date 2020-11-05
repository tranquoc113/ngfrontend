import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';
import { HttpClient } from '@angular/common/http';
import { ThemingService } from '../../ui/theming/theming.service';
import { RefreshTimer } from '../../ui-api/helpers/refresh-timer';
import { Location } from '@angular/common';

@Component({
  selector: 'app-disconnected-from-server',
  templateUrl: './disconnected-from-server.component.html',
  styleUrls: ['./disconnected-from-server.component.scss']
})
export class DisconnectedFromServerComponent implements OnInit, OnDestroy {
  refreshTimer: RefreshTimer;

  constructor(
    private authService: AuthService,
    private router: Router,
    private config: ConfigService,
    private httpClient: HttpClient,
    public themingService: ThemingService,
    private location: Location,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  redirectIfReconnected() {
    this.httpClient.get(
      this.config.getPanelApiUrl('current-user'),
    ).toPromise().then(response => {
      if (response) {
        if (document.referrer !== '') {
          this.location.back();
        } else {
          window.location.href = this.config.getPanelHomeUrl();
        }
      }
    }).catch(error => {
      throw error;
    })
  }

  ngOnInit(): void {
    this.redirectIfReconnected();
    this.refreshTimer = new RefreshTimer(5000, () => {
      this.redirectIfReconnected();
    }, this.config, this.ngZone, this.changeDetectorRef,true);
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.stop();
      delete this.refreshTimer;
    }
  }

}
