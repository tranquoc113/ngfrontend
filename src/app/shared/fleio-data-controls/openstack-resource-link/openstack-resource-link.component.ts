import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

@Component({
  selector: 'app-openstack-resource-link',
  templateUrl: './openstack-resource-link.component.html',
  styleUrls: ['./openstack-resource-link.component.scss']
})
export class OpenstackResourceLinkComponent implements OnInit {
  @Input() button?: any;
  @Input() resourceId?: FleioId;
  @Input() path?: string;
  @Input() clientId?: FleioId;
  @Input() resourceType?: string;
  @Input() projectId?: FleioId;

  routerLink: string;
  queryParams: { [key: string]: string } = {};

  constructor(private config: ConfigService) {
  }

  ngOnInit(): void {
    this.routerLink = '';
    this.queryParams = {};
    if (this.resourceId) {
      if (this.config.current) {
        switch (this.path) {
          case 'openstack/sshkeys':
            this.routerLink = this.path;
            this.queryParams = {
              search: this.resourceId.toString(),
              filtering: `user__clients__id:${this.clientId}`,
            }
            break;
          case 'openstack/projects':
            this.routerLink = this.path;
            this.queryParams = {
              search: this.resourceId.toString()
            }
            break;
          default:
            this.routerLink = `${this.path}${this.resourceId}`;
            break;
        }
      }
    } else {
      if (!this.path) {
        let filteringField = 'project_id';
        let filteringValue = this.projectId;
        if (this.resourceType === 'Instances') {
          this.path = 'openstack/instances';
        } else if (this.resourceType === 'SSH keys') {
          filteringField = 'user__client__id';
          filteringValue = this.clientId;
          this.path = 'openstack/sshkeys';
        } else if (this.resourceType === 'Volumes') {
          this.path = 'openstack/volumes';
        } else if (this.resourceType === 'Networks') {
          filteringField = 'project';
          this.path = 'openstack/networks';
        } else if (this.resourceType === 'Routers') {
          this.path = 'openstack/routers';
        } else if (this.resourceType === 'Images') {
          this.path = 'openstack/images';
        } else if (this.resourceType === 'Ports') {
          this.path = 'openstack/ports';
        }
        this.routerLink = this.path;
        this.queryParams = {
          filtering: `${filteringField}:${filteringValue}`
        }
      } else {
        this.routerLink = `${this.path}`;
      }
    }

    this.routerLink = this.config.getPanelUrl(this.routerLink);
  }
}
