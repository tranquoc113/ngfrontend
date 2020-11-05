import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { ProjectsApiService } from '@fleio-api/openstack/project/projects-api.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { ProjectEditFormComponent } from './tabs/project-edit-form/project-edit-form.component';
import { IYesNoDialogResult } from '@shared/ui-api/interfaces/yes-no-dialog-result';
import { map } from 'rxjs/operators';

export class ProjectUiService extends ObjectUIServiceBase<IProjectModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly projectsApiService: ProjectsApiService;
  private readonly datePipe: DatePipe;

  constructor(
    projectModel: IProjectModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, projectsApiService: ProjectsApiService
  ) {
    super(projectModel, permissions, state);
    this.router = router;
    this.config = config;
    this.projectsApiService = projectsApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    if (this.object.disabled || this.object.deleted) {
      return {type: StatusType.Defined, value: StatusValue.Disabled};
    } else {
      return {type: StatusType.Defined, value: StatusValue.Enabled};
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit project ${this.object.name}`,
          subText: this.object.project_id,
        };

      case 'create':
        return {
          text: `Create new project`,
        };

      default:
        return {
          text: `${this.object.name}`,
          subText: this.object.project_id,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit project',
        routerUrl: this.config.getPanelUrl(`openstack/projects/${this.object.id}`),
        router: this.router,
      }
    ));

    actions.push(new CallbackAction({
      icon: {name: 'delete'},
      name: 'Delete',
      tooltip: 'Delete project',
      redirectAfterExecute: true,
      redirectUrl: this.config.getPanelUrl(`openstack/projects`),
      callback: (action) => {
        return action.notificationService.confirmDialog(
          {
            title: `Delete project ${this.object.name}(${this.object.id})`,
            message: `Are you sure you want to delete project ${this.object.name}(${this.object.id})?`,
            flags: [{
              id: 'delete-all-resources',
              message: ' Delete all resources',
              warningOnSelect: 'Warning: this will permanently delete data.',
              selected: false,
            }]
          }
        ).pipe(map((result: IYesNoDialogResult) => {
          if (result && result.button && result.button === 'yes') {
            this.projectsApiService.deleteProject(
              this.object.id, result.flags['delete-all-resources'],
              ).subscribe(() => {
                action.notificationService.showMessage('Project delete scheduled');
            });
          }
          return null;
        }))
      }
    }))

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/projects`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/projects`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/projects/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at)},
      {name: 'Updated at', value: this.datePipe.transform(this.object.updated_at)},
    ] as IDataField[];

    if (this.object.service) {
      fields.push({
        value: 'Service details',
        url: this.config.getPanelUrl(`billing/services/${this.object.service}`),
      });
    }

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ProjectEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: ProjectEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
