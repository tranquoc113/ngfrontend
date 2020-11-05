import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { ITodoModel } from '@fleio-api/plugins/todo/model/todo.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { TodoApiService } from '@fleio-api/plugins/todo/todo-api.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { TodoDetailsOverviewComponent } from './tabs/todo-details-overview/todo-details-overview.component';
import { TodoEditFormComponent } from './tabs/todo-edit-form/todo-edit-form.component';


export class TodoUiService extends ObjectUIServiceBase<ITodoModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly todoApiService: TodoApiService;
  private readonly datePipe: DatePipe;


  constructor(
    todo: ITodoModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, todoApiService: TodoApiService
  ) {
    super(todo, permissions, state);
    this.router = router;
    this.config = config;
    this.todoApiService = todoApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'open':
        return {type: StatusType.Defined, value: StatusValue.Active};
      case 'in progress':
        return {type: StatusType.Defined, value: StatusValue.Pending};
      case 'done':
        return {type: StatusType.Defined, value: StatusValue.Disabled};
    }
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: `Todo ${this.object.title}`,
          subText: `${this.object.status_display} - assigned to ${this.object.assigned_to_display}`,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.title}`,
        };

      case 'create':
        return {
          text: `Create new todo`,
        };

      default:
        return {
          text: `${this.object.title}`,
          subText: `${this.object.status_display} - assigned to ${this.object.assigned_to_display}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit todo',
        routerUrl: this.config.getPanelUrl(`plugins/todo/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteActionParams = {
      object: this.object,
      icon: {name: 'delete'},
      tooltip: 'Delete todo',
      name: 'Delete',
      confirmOptions: {
        confirm: true,
        title: 'Delete TODO',
        message: `Are you sure you want to delete TODO ${this.object.title}`,
      },
      successMessage: 'TODO deleted',
      errorMessage: 'Failed to delete TODO, check logs for details',
      apiService: this.todoApiService,
      callType: CallType.Delete
    } as any;

    if (['card-view', 'table-view'].includes(this.state)) {
      deleteActionParams.refreshAfterExecute = true;
    } else {
      deleteActionParams.refreshAfterExecute = false;
      deleteActionParams.redirectAfterExecute = true;
      deleteActionParams.redirectUrl = this.config.getPanelUrl('plugins/todo');
    }

    actions.push(new ApiCallAction(deleteActionParams));

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/todo`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/todo`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`plugins/todo`),
            router: this.router,
          }
        ));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`plugins/todo/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at, 'medium')},
      {name: 'Assigned to', value: this.object.assigned_to_display},
      {name: 'Status', value: this.object.status_display},
      {name: 'Description', value: this.object.description},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: TodoDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: TodoEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: TodoEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
