import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { IInstanceModel } from '../model/instance.model';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInstanceSummary } from '@fleio-api/openstack/model/instance-summary.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { IOpenstackBackupSchedule } from '@fleio-api/openstack/model/openstack-backup-schedule.model';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';

@Injectable({
  providedIn: 'root'
})
export class InstancesApiService extends FleioApiService<IInstanceModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/instances'));
  }

  getSummary(): Observable<IInstanceSummary> {
    return this.getAction('summary');
  }

  detachPort(instanceId: FleioId, portId: FleioId) {
    return this.objectPostAction(instanceId, 'detach_port', {
      port_id: portId,
    });
  }

  removeFloatingIp(instanceId: FleioId, ip: string) {
    return this.objectPostAction(instanceId, 'remove_floating_ip', {
      ip,
    });
  }

  attachPort(instanceId: FleioId, portId: FleioId) {
    return this.objectPostAction(instanceId, 'attach_port', {
      port_id: portId,
    });
  }

  associateIp(instanceId: FleioId, floatingIp: string, fixedIp: string) {
    return this.objectPostAction(instanceId, 'add_floating_ip', {
      floating_ip: floatingIp,
      fixed_ip: fixedIp,
    });
  }

  getAssociateIpCreateOptions(instanceId: FleioId): Observable<any> {
    return this.objectGetAction(instanceId, 'associate_ip_create_options');
  }

  getSecurityGroups(instanceId: FleioId): Observable<{security_groups: Array<ISecurityGroupModel>}> {
    return this.objectGetAction(instanceId, 'list_security_groups');
  }

  associateSecurityGroup(instanceId: FleioId, securityGroupId: FleioId) {
    return this.objectPostAction(instanceId, 'associate_security_group', {
      group: securityGroupId,
    });
  }

  dissociateSecurityGroup(instanceId: FleioId, securityGroupId: FleioId) {
    return this.objectPostAction(instanceId, 'dissociate_security_group', {
      group: securityGroupId,
    });
  }

  getAssociateSecurityGroupOptions(instanceId: FleioId): Observable<{groups: Array<ISecurityGroupModel>}> {
    return this.objectGetAction(instanceId, 'associate_security_group_create_options');
  }

  getInstanceBackupsAndBackupSchedules(instanceId: FleioId): Observable<{
    schedules: Array<IOpenstackBackupSchedule>;
    backups: Array<IImageModel>;
  }> {
    return this.objectGetAction(instanceId, 'get_instance_backups_and_backup_schedules');
  }

  createBackup(instanceId: FleioId, backupData: {}) {
    return this.objectPostAction(instanceId, 'create_backup', backupData);
  }

  getFlavorRelatedImages(flavor: IFlavorModel, region, clientId): Observable<{
    bootSources: {
      image: Array<IImageModel>;
      owned_image: Array<IImageModel>;
      shared_image: Array<IImageModel>;
      community_image: Array<IImageModel>;
    };
  }> {
    const params = {
      region
    };
    if (flavor) {
      // @ts-ignore
      params.selected_flavor_id = flavor.id;
    }
    if (clientId) {
      // @ts-ignore
      params.selected_client_id = clientId;
    }
    return this.getAction('get_images_assigned_to_flavors_or_flavor_group', params);
  }

  getFlavorsAssignedToImage(imageId, clientId, onlyCompatibleFlavors=false) {
    const params = {
      image_id: imageId,
      only_compatible_flavors: onlyCompatibleFlavors,
    };
    if (clientId) {
      // @ts-ignore
      params.selected_client_id = clientId;
    }
    return this.getAction('get_flavors_assigned_to_image', params);
  }
}
