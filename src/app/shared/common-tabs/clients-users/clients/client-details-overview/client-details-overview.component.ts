import { Component } from '@angular/core';
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { AuthService } from '@shared/auth/auth.service';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ChangeCreditDialogComponent } from '@shared/common-dialogs/clients-users/clients/change-credit-dialog/change-credit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { RefreshService } from '@shared/ui-api/refresh.service';

@Component({
  selector: 'app-clients-details-overview',
  templateUrl: './client-details-overview.component.html',
  styleUrls: ['./client-details-overview.component.scss']
})
export class ClientDetailsOverviewComponent extends DetailsComponentBase<IClientModel> {
  constructor(
    public authService: AuthService,
    private clientsApiService: ClientsApiService,
    private notificationService: NotificationService,
    private readonly matDialog: MatDialog,
    private refreshService: RefreshService,
  ) {
    super();
  }

  updateUsage() {
    this.clientsApiService.updateUsage(this.object.id).subscribe(response => {
      this.notificationService.showMessage('Usage updated');
      this.refreshService.refresh();
    })
  }

  resetUsage(event: Event) {
    this.notificationService.confirmDialog(
      {
        title: 'Reset usage',
        message: 'This will permanently delete usage data.'
      }
    ).subscribe(result => {
      if (result === 'yes') {
        this.clientsApiService.resetUsage(this.object.id).subscribe(() => {
          this.notificationService.showMessage('Usage reset');
          this.refreshService.refresh();
        }, error => {
          if (error && error.error) {
            this.notificationService.showMessage(error.error.detail);
          } else {
            this.notificationService.showMessage('Error when trying to reset usage. Check logs for more info.')
          }
        })
      }
    })
  }

  changeCredit(credit: {
    client: FleioId;
    amount: number;
    currency: string;
  }) {
    this.matDialog.open(
      ChangeCreditDialogComponent, {
        data: {client: this.object, credit}
      }).afterClosed().subscribe(result => {
      if (result === true) {
        this.refreshService.refresh();
      }
    });
  }
}
