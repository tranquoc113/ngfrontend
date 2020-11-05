import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IAction } from '../interfaces/actions/action';
import { NotificationService } from '@shared/ui-api/notification.service';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '@shared/auth/auth.service';
import { ActionTypes } from '@objects-view/actions/action-types';

@Component({
  selector: 'app-object-actions',
  templateUrl: './object-actions.component.html',
  styleUrls: ['./object-actions.component.scss'],
  animations: [
    trigger('fabItems', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('0.35s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('0.2s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
          }))
      ])
    ])
  ]
})
export class ObjectActionsComponent implements OnChanges {
  @Input() objectActions: IAction[];
  @Input() maxVisibleActions: number;
  @Input() listStateActions = false;

  public visibleActions: IAction[] = null;
  public inMenuActions: IAction[] = null;
  public showMultipleFABs = false;
  public actionTypes = ActionTypes;

  constructor(
    public notificationService: NotificationService,
    public refreshService: RefreshService,
    private auth: AuthService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.objectActions) {
      this.objectActions = this.objectActions.filter(
        action => {
          return action.featureName ? this.auth.feature(action.featureName): true;
        }
      );
      if (!this.listStateActions) {
        // we are not interested in visible actions on states
        this.visibleActions = this.objectActions.slice(0, this.maxVisibleActions);
        this.inMenuActions = this.objectActions.slice(this.maxVisibleActions);
      }
    }
  }
}
