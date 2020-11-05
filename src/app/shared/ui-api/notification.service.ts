import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IYesNoDialogData } from './interfaces/yes-no-dialog-data';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { Observable } from 'rxjs';
import { SnackbarWithLinkComponent } from '@shared/ui/snackbar-with-link/snackbar-with-link.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private matSnackBar: MatSnackBar,
    public matDialog: MatDialog,
    private ngZone: NgZone,
  ) { }

  showMessage(message: string) {
    this.matSnackBar.open(message, 'Close', {duration: 2000});
  }

  showMessageWithLink(message: string, urlFragment: string, redirectButtonText: string) {
    this.ngZone.run(() => {
      // make sure this is ran in Angular zone
      this.matSnackBar.openFromComponent(SnackbarWithLinkComponent, {
        data: {
          message,
          urlFragment,
          redirectButtonText,
        },
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 4000
      });
    });
  }

  confirmDialog(yesNoData: IYesNoDialogData): Observable<any> {
    return this.matDialog.open(YesNoDialogComponent, {
      data: yesNoData,
    }).afterClosed();
  }
}
