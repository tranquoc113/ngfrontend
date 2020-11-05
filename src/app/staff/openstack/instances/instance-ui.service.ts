import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { catchError, map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { InstanceRenameDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-rename-dialog/instance-rename-dialog.component';
import { InstanceMoveDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-move-dialog/instance-move-dialog.component';
import { InstanceMigrateDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-migrate-dialog/instance-migrate-dialog.component';
import { InstanceChangePasswordDialogComponent } from '@shared/common-dialogs/openstack/instances/instance-change-password-dialog/instance-change-password-dialog.component';
import { InstanceDetailsInfoComponent } from '@shared/common-tabs/openstack/instances/instance-details-info/instance-details-info.component';
import { InstanceDetailsSystemLogComponent } from '@shared/common-tabs/openstack/instances/instance-details-system-log/instance-details-system-log.component';
import { InstanceDetailsMetricsComponent } from '@shared/common-tabs/openstack/instances/instance-details-metrics/instance-details-metrics.component';
import { InstanceDetailsSnapshotsComponent } from '@shared/common-tabs/openstack/instances/instance-details-snapshots/instance-details-snapshots.component';
import { InstanceDetailsVolumesComponent } from '@shared/common-tabs/openstack/instances/instance-details-volumes/instance-details-volumes.component';
import { InstanceDetailsHistoryLogComponent } from '@shared/common-tabs/openstack/instances/instance-details-history-log/instance-details-history-log.component';
import { InstanceDetailsNetworkingComponent } from '@shared/common-tabs/openstack/instances/instance-details-networking/instance-details-networking.component';
import { InstanceCreateFormComponent } from '@shared/common-tabs/openstack/instances/instance-create-form/instance-create-form.component';
import { InstanceResizeFormComponent } from '@shared/common-tabs/openstack/instances/instance-resize-form/instance-resize-form.component';
import { InstanceRescueFormComponent } from '@shared/common-tabs/openstack/instances/instance-rescue-form/instance-rescue-form.component';
import {
  InstanceRebuildFormComponent
} from '@shared/common-tabs/openstack/instances/instance-rebuild-form/instance-rebuild-form.component';
import { InstanceDetailsSecurityGroupsComponent } from '@shared/common-tabs/openstack/instances/instance-details-security-groups/instance-details-security-groups.component';
import { InstanceDetailsBackupsComponent } from '@shared/common-tabs/openstack/instances/instance-details-backups/instance-details-backups.component';

export class InstanceUIService extends ObjectUIServiceBase<IInstanceModel> {
  private statusMap: Map<string, IObjectStatus> = new Map<string, IObjectStatus>([

    ['active', {type: StatusType.Defined, value: StatusValue.Active}],
    ['paused', {type: StatusType.Defined, value: StatusValue.Paused}],
    ['suspended', {type: StatusType.Defined, value: StatusValue.Paused}],

    ['rescued', {type: StatusType.Defined, value: StatusValue.Rescued}],
    ['booted_from_iso', {type: StatusType.Defined, value: StatusValue.Rescued}],
    ['resized', {type: StatusType.Defined, value: StatusValue.Resized}],

    ['stopped', {type: StatusType.Defined, value: StatusValue.Stopped}],

    ['deleted', {type: StatusType.Defined, value: StatusValue.Error}],
    ['error', {type: StatusType.Defined, value: StatusValue.Error}],
  ]);

  availableDistroLogos = [
    'centos', 'coreos', 'debian', 'fedora', 'freebsd', 'ubuntu', 'windows', 'arch', 'cirros', 'gnome', 'macos',
    'mageia', 'netbsd', 'opensuse', 'rhel', 'netware', 'solaris'
  ];

  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly instancesApi: InstancesApiService;
  private readonly matDialog: MatDialog;

  private isVolumeBooted() {
    if (this.object) {
      if (this.object.storage_details) {
        if (this.object.storage_details.volume_attachments && this.object.storage_details.volume_attachments.length) {
          for (const volAtt of this.object.storage_details.volume_attachments) {
            if (volAtt.is_boot === true) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }


  constructor(
    instance: IInstanceModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, instancesApi: InstancesApiService,
    matDialog: MatDialog,
  ) {
    super(instance, permissions, state);
    this.router = router;
    this.config = config;
    this.instancesApi = instancesApi;
    this.matDialog = matDialog;
  }

  getIcon(): IIcon {
    if (this.state === 'create') {
      return null;
    }
    let iconName = 'otheros';
    if (this.object && this.object.image) {
      if (this.object.image.os_distro) {
        const distro = this.object.image.os_distro.split('-').pop();
        if (this.availableDistroLogos.indexOf(distro) > -1) {
          iconName = distro;
        }
      }
    }

    return {
      name: iconName,
      class: 'fl-icons',
    };
  }


  getStatus()
    :
    IObjectStatus {
    if (this.object.display_task) {
      switch (this.object.display_task) {
        case 'powering-on':
          return {type: StatusType.Changing, value: StatusValue.Waiting};
        case 'powering-off':
          return {type: StatusType.Changing, value: StatusValue.Waiting};
        case 'spawning':
          return {type: StatusType.Changing, value: StatusValue.Waiting};
        default:
          return {type: StatusType.Changing, value: StatusValue.Waiting};
      }
    }

    let status: IObjectStatus = {type: StatusType.None, value: StatusValue.None};
    if (this.statusMap.has(this.object.status)) {
      status = this.statusMap.get(this.object.status);
    }
    return status;
  }

  getTitle()
    :
    ITitle {
    let subText = this.object.display_status;
    if (this.object.display_task) {
      subText = `${subText} (${this.object.display_task})`;
    }
    let subTextIcon = null as IIcon;
    let subTextIconTooltip = null;
    if (this.object.status === 'resized') {
      subTextIcon = {
        name: 'warning'
      };
      subTextIconTooltip = 'Check if files have been successfully\nmigrated to the ' +
        'new instance disk. \nChoose Confirm resize from the instance menu\nto confirm migration was successful, ' +
        'otherwise\nchoose Revert resize to revert back to the initial disk.';
    }
    switch (this.state) {
      case 'details':
        return {
          text: `${this.object.name}`,
          subText,
          subTextIcon,
          subTextIconTooltip
        };

      case 'rescue':
        return {
          text: `Rescue ${this.object.name}`,
          subText,
        };

      case 'create':
        return {
          text: `Create instance`,
        };

      default:
        return {
          text: `${this.object.name}`,
          subText,
          subTextIcon,
          subTextIconTooltip
        };
    }
  }

  getActions()
    :
    IAction[] {
    const actions: IAction[] = [];

    for (const actionName of this.object.allowed_actions) {
      switch (actionName) {
        case 'abort_migrate':
          if (this.object.display_task === 'migrating') {
            actions.push(new ApiCallAction(
              {
                object: this.object,
                icon: {name: 'redo'},
                name: 'Abort migrate',
                tooltip: 'Abort migrate',
                apiService: this.instancesApi,
                apiAction: 'abort_migrate',
                disabled: !!this.object.display_task,
                noPermissions: !this.permissions['instances.abort-migrate']
              }
            ));
          }
          break;
        case 'start':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'power', class: 'fl-icons'},
              name: 'Start',
              tooltip: 'Start instance',
              apiService: this.instancesApi,
              apiAction: 'start',
              disabled: !!this.object.display_task,
              noPermissions: !this.permissions['instances.start']
            }
          ));
          break;
        case 'shutoff':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'power', class: 'fl-icons'},
              name: 'Shut down',
              tooltip: 'Shut down',
              confirmOptions: {
                confirm: true,
                title: 'Stop instance',
                message: `Are you sure you want to stop instance ${this.object.name}?`
              },
              apiService: this.instancesApi,
              noPermissions: !this.permissions['instances.stop'],
              apiAction: 'stop',
              disabled: !!this.object.display_task
            }
          ));
          break;
        case 'suspend':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'pause'},
              name: 'Suspend',
              tooltip: 'Suspend',
              confirmOptions: {
                confirm: true,
                title: 'Suspend instance',
                message: `Are you sure you want to suspend instance ${this.object.name}?`
              },
              apiService: this.instancesApi,
              apiAction: 'suspend',
              disabled: !!this.object.display_task,
              noPermissions: !this.permissions['instances.suspend']
            }
          ));
          break;
        case 'resume':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'play_arrow'},
              name: 'Resume',
              tooltip: 'Resume',
              confirmOptions: {
                confirm: false,
                title: 'Resume instance',
                message: `Are you sure you want to resume instance ${this.object.name}?`
              },
              apiService: this.instancesApi,
              apiAction: 'resume',
              disabled: !!this.object.display_task,
              noPermissions: !this.permissions['instances.resume']
            }
          ));
          break;
        case 'reboot':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'reboot', class: 'fl-icons'},
              name: 'Reboot',
              tooltip: 'Reboot',
              confirmOptions: {
                confirm: true,
                title: 'Reboot instance',
                message: `Are you sure you want to reboot instance ${this.object.name}?`
              },
              apiService: this.instancesApi,
              apiAction: 'reboot',
              disabled: !!this.object.display_task,
              noPermissions: !this.permissions['instances.reboot']
            }
          ));
          break;
        case 'reset_state':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'redo'},
              name: 'Reset state',
              tooltip: 'Reset state',
              confirmOptions: {
                confirm: true,
                title: 'Reset instance state',
                message: `Are you sure you want to reset instance ${this.object.name} state?`
              },
              apiService: this.instancesApi,
              apiAction: 'reset_state',
              noPermissions: !this.permissions['instances.reset-state']
            }
          ));
          break;
        case 'lock':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'lock'},
              name: 'Lock',
              tooltip: 'Lock',
              confirmOptions: {
                confirm: true,
                title: 'Lock instance',
                message: `Are you sure you want to lock instance ${this.object.name}`
              },
              apiService: this.instancesApi,
              apiAction: 'lock',
              disabled: !!this.object.display_task,
              noPermissions: !this.permissions['instances.lock']
            }
          ));
          break;
        case 'unlock':
          if (this.object.locked) {
            actions.push(new ApiCallAction(
              {
                object: this.object,
                icon: {name: 'lock_open'},
                name: 'Unlock',
                tooltip: 'Unlock',
                confirmOptions: {
                  confirm: true,
                  title: 'Unlock instance',
                  message: `Are you sure you want to unlock instance ${this.object.name}?`
                },
                apiService: this.instancesApi,
                apiAction: 'unlock',
                disabled: !!this.object.display_task,
                noPermissions: !this.permissions['instances.unlock']
              }
            ));
          }
          break;
        case 'unrescue':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'build'},
              name: 'Unrescue',
              tooltip: 'Unrescue',
              confirmOptions: {
                confirm: true,
                title: 'Unrescue instance',
                message: `Are you sure you want to unrescue instance ${this.object.name}?`
              },
              apiService: this.instancesApi,
              apiAction: 'unrescue',
            }
          ));
          break;
        case 'unmount_and_reboot':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'build'},
              name: 'Unmount ISO and reboot',
              tooltip: 'Unmount ISO and reboot',
              confirmOptions: {
                confirm: true,
                title: 'Unmount ISO and reboot',
                message: `Are you sure you want to unmount ISO and reboot?`
              },
              apiService: this.instancesApi,
              apiAction: 'unrescue',
            }
          ));
          break;
        case 'cfresize':
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'check'},
              name: 'Confirm resize',
              tooltip: 'Confirm resize',
              confirmOptions: {
                confirm: true,
                title: 'Confirm instance resize',
                message: `Are you sure you want to confirm instance ${this.object.name} resize?`
              },
              apiService: this.instancesApi,
              apiAction: 'confirm_resize',
            }
          ));
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'cancel'},
              name: 'Revert resize',
              tooltip: 'Revert resize',
              confirmOptions: {
                confirm: true,
                title: 'Revert instance resize',
                message: `Are you sure you want to revert instance ${this.object.name} resize?`
              },
              apiService: this.instancesApi,
              apiAction: 'revert_resize',
            }
          ));
          break;
        case 'rescue':
          actions.push(new RouterLinkAction({
              icon: {name: 'help', class: 'fl-icons'},
              name: 'Rescue',
              tooltip: 'Rescue',
              routerUrl: this.config.getPanelUrl(`openstack/instances/${this.object.id}/rescue`),
              router: this.router,
            }
          ));
          break;
        case 'boot_from_iso':
          actions.push(new RouterLinkAction({
              icon: {name: 'help', class: 'fl-icons'},
              name: 'Boot from ISO',
              tooltip: 'Boot from ISO',
              routerUrl: this.config.getPanelUrl(`openstack/instances/${this.object.id}/boot-from-iso`),
              router: this.router,
            }
          ));
          break;
        case 'resize':
          actions.push(new RouterLinkAction({
              icon: {name: 'resize', class: 'fl-icons'},
              name: 'Resize',
              tooltip: 'Resize',
              routerUrl: this.config.getPanelUrl(`openstack/instances/${this.object.id}/resize`),
              router: this.router,
            }
          ));
          break;
        case 'rebuild':
          actions.push(new RouterLinkAction({
              icon: {name: 'rebuild', class: 'fl-icons'},
              name: 'Rebuild',
              tooltip: 'Rebuild',
              routerUrl: this.config.getPanelUrl(`openstack/instances/${this.object.id}/rebuild`),
              router: this.router,
            }
          ));
          break;
        case 'rename':
          actions.push(new CallbackAction(
            {
              object: this.object,
              icon: {name: 'edit', class: 'fl-icon'},
              tooltip: 'Rename',
              name: 'Rename',
              refreshAfterExecute: true,
              callback: () => {
                return this.matDialog.open(
                  InstanceRenameDialogComponent, {
                    data: {instance: this.object}
                  }).afterClosed().pipe(map(result => {
                  return {message: result} as IActionResult;
                }));
              }
            }
          ));
          break;
        case 'move':
          actions.push(new CallbackAction(
            {
              object: this.object,
              icon: {name: 'trending_flat'},
              tooltip: 'Move',
              name: 'Move',
              callback: () => {
                return this.matDialog.open(
                  InstanceMoveDialogComponent, {
                    data: {instance: this.object}
                  }).afterClosed().pipe(map(result => {
                  return {message: result} as IActionResult;
                }));
              },
              disabled: !!this.object.display_task
            }
          ));
          break;
        case 'migrate':
          actions.push(new CallbackAction(
            {
              object: this.object,
              icon: {name: 'trending_flat'},
              tooltip: 'Migrate',
              name: 'Migrate',
              callback: () => {
                return this.matDialog.open(
                  InstanceMigrateDialogComponent, {
                    data: {instance: this.object}
                  }).afterClosed().pipe(map(result => {
                  return {message: result} as IActionResult;
                }));
              },
              disabled: !!this.object.display_task
            }
          ));
          break;
        case 'change_password':
          actions.push(new CallbackAction(
            {
              object: this.object,
              icon: {name: 'security'},
              tooltip: 'Change password',
              name: 'Change password',
              callback: () => {
                return this.matDialog.open(
                  InstanceChangePasswordDialogComponent, {
                    data: {instance: this.object}
                  }).afterClosed().pipe(map(result => {
                  return {message: result} as IActionResult;
                }));
              },
              disabled: !!this.object.display_task
            }
          ));
          break;
        case 'console':
          actions.push(new CallbackAction(
            {
              object: this.object,
              icon: {name: 'code', class: 'fl-tooltip'},
              tooltip: 'Console',
              name: 'Console',
              callback: () => {
                const consoleWindow = window.open(
                  '',
                  this.object.id as string,
                  'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no'
                );
                return this.instancesApi.objectGetAction(
                  this.object.id,
                  'get_console_url'
                ).pipe(map(result => {
                  consoleWindow.focus();
                  if (result.lxc) {
                    consoleWindow.location = result.url;
                  } else if (result.remote_console) {
                    consoleWindow.location = result.remote_console.url;
                  } else {
                    result.consoleWindow.location = result.console.url;
                  }
                  return {message: result} as IActionResult;
                }), catchError(() => {
                  consoleWindow.close();
                  return of(null);
                }));
              },
              disabled: !!this.object.display_task
            }
          ));
          break;
      }
    }

    let bootFromVolume = false;
    let deleteBootVolume = false;
    if (this.object.storage_details && this.object.storage_details.volume_attachments) {
      for (const volumeAttachment of this.object.storage_details.volume_attachments) {
        if (volumeAttachment.is_boot) {
          bootFromVolume = true;
          deleteBootVolume = volumeAttachment.delete_on_termination;
          break;
        }
      }
    }

    let importantMessage = null;
    if (bootFromVolume) {
      if (deleteBootVolume) {
        importantMessage = 'Boot volume will also be deleted.';
      } else {
        importantMessage = 'Boot volume will not be deleted, you will have to delete the volume manually.';
      }
    }

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        tooltip: 'Delete',
        confirmOptions: {
          confirm: true,
          title: `Delete instance ${this.object.name}`,
          message: 'Are you sure you want to delete the instance? Files will be permanently lost.',
          importantMessage,
        },
        successMessage: 'Instance delete queued',
        errorMessage: 'Failed to delete instance, check logs for details',
        apiService: this.instancesApi,
        noPermissions: !this.permissions['instances.destroy'],
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('openstack/instances'),
      }
    ));
    return actions;
  }

  getCardTags()
    :
    string[] {
    const tags: string[] = [];
    if (this.object.locked) {
      tags.push('locked');
    }
    return tags;
  }

  getDetailsLink()
    :
    string {
    return this.config.getPanelUrl(`openstack/instances/${this.object.id}`);
  }

  getCardFields()
    :
    IDataField[] {
    const datePipe = new DatePipe(this.config.locale);
    return [
      {
        value: this.object.flavor ?
          `${this.object.access_ip}, ${this.object.flavor.name}, ${this.object.region}` :
          `${this.object.access_ip}, ${this.object.region}`
      },
      {
        name: 'Created on',
        value: `${datePipe.transform(this.object.created)}`
      },
      {
        name: 'Client',
        value: this.object.client ? `${this.object.client.name}` : 'n/a',
      }
    ];
  }

  getTabs()
    :
    IDetailsTab[] {
    switch (this.state) {
      case 'details':
        const tabs = [
          {
            tabName: 'Info',
            component: InstanceDetailsInfoComponent,
          },
          {
            tabName: 'System log',
            component: InstanceDetailsSystemLogComponent,
          },
          {
            tabName: 'Metrics',
            component: InstanceDetailsMetricsComponent,
          },
        ] as Array<IDetailsTab>;
        if (this.object.region_obj.enable_snapshots) {
          tabs.push({
            tabName: 'Snapshots',
            component: InstanceDetailsSnapshotsComponent,
            featureName: 'openstack.instances.snapshots',
          });
        }
        if (this.object.region_obj.enable_volumes) {
          tabs.push({
            tabName: 'Volumes',
            component: InstanceDetailsVolumesComponent,
            featureName: 'openstack.volumes',
          });
        }
        tabs.push.apply(tabs, [
          {
            tabName: 'History log',
            component: InstanceDetailsHistoryLogComponent,
          },
          {
            tabName: 'Networking',
            component: InstanceDetailsNetworkingComponent,
          },
          {
            tabName: 'Security groups',
            component: InstanceDetailsSecurityGroupsComponent,
            featureName: 'openstack.securitygroups',
          },
        ]);
        if (!this.isVolumeBooted()) {
          tabs.push({
            tabName: 'Backups',
            component: InstanceDetailsBackupsComponent,
            featureName: 'openstack.osbackup',
          });
        }
        return tabs;
      case 'create':
        return [
          {
            tabName: 'Create',
            component: InstanceCreateFormComponent,
          },
        ];
      case 'resize':
        return [
          {
            tabName: 'Resize',
            component: InstanceResizeFormComponent
          }
        ];
      case 'rescue':
        return [
          {
            tabName: 'Rescue',
            component: InstanceRescueFormComponent
          }
        ];
      case 'bootFromIso':
        return [
          {
            tabName: 'Boot from iso',
            component: InstanceRescueFormComponent
          }
        ];
      case 'rebuild':
        return [
          {
            tabName: 'Rebuild',
            component: InstanceRebuildFormComponent
          }
        ];
    }
  }

  getDetailsActions()
    :
    IAction[] {
    const actions = [];
    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/instances`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'resize':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/instances`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Resize'}));
        break;
      case 'rescue':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/instances`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Rescue'}));
        break;
      case 'bootFromIso':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/instances`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Boot instance from ISO'}));
        break;
      case 'rebuild':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/instances`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Rebuild'}));
        break;
    }

    return actions;
  }

  getObjectDetailsRefreshInterval()
    :
    number {
    return 5000;
  }
}
