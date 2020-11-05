import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IObjectController } from '../interfaces/object-controller';
import { IAction } from '../interfaces/actions/action';
import { NotificationService } from '@shared/ui-api/notification.service';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { CallbackAction } from '../actions/callback-action';
import { of } from 'rxjs';
import { ActionTypes } from '@objects-view/actions/action-types';

@Component({
  selector: 'app-object-details-dialog',
  templateUrl: './object-details-dialog.component.html',
  styleUrls: ['./object-details-dialog.component.scss']
})
export class ObjectDetailsDialogComponent implements OnInit {
  public actionTypes = ActionTypes;
  constructor(
    public dialogRef: MatDialogRef<ObjectDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      additionalClasses: string[];
      dialogTitle: string;
      objectController: IObjectController;
      actions: IAction[];
    },
    public notificationService: NotificationService,
    public refreshService: RefreshService,
  ) {
    if (!this.data.additionalClasses) {
      this.data.additionalClasses = [];
    }
    this.data.additionalClasses.push('on-dialog-card')
    if (this.data.actions) {
      this.data.actions = this.setActionCallback(this.data.actions);
    }
  }

  setActionCallback(actions: IAction[]): IAction[] {
    for (const action of actions) {
      if (action instanceof CallbackAction && !action.callback) {
        (action as CallbackAction).callback = (callbackAction) => {
          return this.objectActionCallback(callbackAction);
        };
      }
    }

    return actions;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(false);
  }

  objectActionCallback(action: CallbackAction) {
    if (this.data.objectController.actionCallback) {
      this.data.objectController.actionCallback(action).subscribe(
        (result) => {
          if (result.success) {
            this.dialogRef.close(true);
          }
        }
      );
    }

    return of(null);
  }
}
