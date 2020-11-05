import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IIcon } from '../../../shared/ui/common/interfaces/icon';
import { ITitle } from '../../../shared/ui/objects-view/interfaces/card-data/card-title';
import { IObjectStatus } from '../../../shared/ui/objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '../../../shared/ui/objects-view/object-ui-service-base';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { IDataField } from '../../../shared/ui/objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '../../../shared/ui/objects-view/interfaces/details/details-tab';
import { DatePipe } from '@angular/common';
import { CallbackAction } from '../../../shared/ui/objects-view/actions/callback-action';
import { INotificationTemplateModel } from '../../../shared/fleio-api/notification-templates/model/notification-template.model';
import { NotificationTemplatesApiService } from '../../../shared/fleio-api/notification-templates/notification-templates-api.service';
import { NotificationTemplateEditFormComponent } from './tabs/notification-template-edit-form/notification-template-edit-form.component';


export class NotificationTemplateUIService extends ObjectUIServiceBase<INotificationTemplateModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly notificationTemplatesApiService: NotificationTemplatesApiService;
  private readonly datePipe: DatePipe;


  constructor(
    notificationTemplate: INotificationTemplateModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, notificationTemplatesApiService: NotificationTemplatesApiService
  ) {
    super(notificationTemplate, permissions, state);
    this.router = router;
    this.config = config;
    this.notificationTemplatesApiService = notificationTemplatesApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      // case 'details':
      //   return {
      //     text: `Notification template ${this.object.name}`,
      //     subText: `Category: ${this.object.category_display}`,
      //   };

      case 'edit':
        return {
          text: `Edit ${this.object[0].name}`,
          subText: `Category: ${this.object[0].category_display}`,
        };

      // case 'create':
      //   return {
      //     text: `Create new notification template`,
      //   };

      default:
        return {
          text: `${this.object.name}`,
          subText: `Category: ${this.object.category_display}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit notification template',
        routerUrl: this.config.getPanelUrl(`settings/notification-templates/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      // case 'create':
      //   actions.push(new RouterLinkAction({
      //       name: 'Cancel',
      //       routerUrl: this.config.getPrevUrl(`settings/notification-templates`),
      //       router: this.router,
      //     }
      //   ));
      //   actions.push(new CallbackAction({name: 'Create'}));
      //   break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`settings/notification-templates`),
            router: this.router,
          }
        ));
        if (!this.object[0].has_all_available_languages) {
          actions.push(new CallbackAction({name: 'Add new template', primary: false}));
        }
        actions.push(new CallbackAction({name: 'Save templates', primary: true}));
        break;
      // case 'details':
      //   actions.push(new RouterLinkAction({
      //       name: 'Back',
      //       routerUrl: this.config.getPrevUrl(`settings/notification-templates`),
      //       router: this.router,
      //     }
      //   ));
      //   actions.push(new CallbackAction({name: 'Save'}));
      //   break;
      default:
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`settings/notification-templates`),
            router: this.router,
          }
        ));
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`settings/notification-templates/${this.object.id}/edit`);
  }

  getCardFields(): IDataField[] {
    const fields = [];

    fields.push({
      name: 'Title',
      value: this.object.title,
    });

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [];
      case 'create':
        return [];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: NotificationTemplateEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];

    tags.push(this.object.language);

    return tags;
  }
}
