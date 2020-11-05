import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { OperationsApiService } from '@fleio-api/utils/operations/operations-api.service';
import { AuthService } from '@shared/auth/auth.service';
import { RefreshTimer } from '@shared/ui-api/helpers/refresh-timer';
import { ConfigService } from '@shared/config/config.service';
import { OrderingService } from '@shared/ui-api/ordering.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-operations-in-progress',
  templateUrl: './operations-in-progress.component.html',
  styleUrls: ['./operations-in-progress.component.scss']
})
export class OperationsInProgressComponent implements OnInit, OnDestroy {
  private refreshTimer: RefreshTimer;
  private operationsCount: number;
  public hasOperationsInProgress = false;
  public operationsTooltip = '';
  hasInProgressOperationsSubscription: Subscription;

  constructor(private operationsApiService: OperationsApiService, private authService: AuthService,
              private notificationService: NotificationService, public configService: ConfigService,
              public orderingService: OrderingService, private ngZone: NgZone,
              private changeDetectorRef: ChangeDetectorRef,) { }

  refresh() {
    if (this.authService.userData && this.authService.userData.user) {
      this.hasInProgressOperationsSubscription = this.operationsApiService.hasOperationsInProgress()
        .subscribe(value => {
          if (value.failed_operations) {
            for (const failedOperation of value.failed_operations) {
              this.notificationService.showMessageWithLink(
                'An operation has failed!',
                `utils/operations/${failedOperation}`,
                'See operation',
              );
            }
          }
          this.hasOperationsInProgress = value.has_operations_in_progress;
          this.operationsCount = value.operations_count;
          if (this.operationsCount) {
            this.operationsTooltip = this.operationsCount === 1 ? `${this.operationsCount} operation in progress` :
              `${this.operationsCount} operations in progress`;
          } else {
            this.operationsTooltip = '';
          }
      });
    }
  }

  getOperationsTooltip(): string {
    if (!this.operationsCount) {
      return '';
    }
    return this.operationsCount === 1 ? `${this.operationsCount} operation in progress` :
      `${this.operationsCount} operations in progress`;
  }

  ngOnInit(): void {
    if (this.authService && this.authService.userData && this.authService.userData.user) {
      if (this.configService && this.configService.current && this.configService.current.settings &&
      this.configService.current.settings.refreshIntervals) {
        this.refresh();
        this.refreshTimer = new RefreshTimer(
          this.configService.current.settings.refreshIntervals.operationsInProgressInterval, () => {
            this.refresh();
        }, this.configService, this.ngZone,this.changeDetectorRef,true);
      }
    }
  }

  ngOnDestroy() {
    if (this.refreshTimer) {
      this.refreshTimer.stop();
      delete this.refreshTimer;
    }
    if (this.hasInProgressOperationsSubscription) {
      this.hasInProgressOperationsSubscription.unsubscribe();
      this.hasInProgressOperationsSubscription = null;
    }
  }
}
