import { Component, OnInit } from '@angular/core';
import { CredentialsComponent } from '../tabs/credentials/credentials.component';
import { NotificationsComponent } from '../tabs/notifications/notifications.component';
import { DefaultsComponent } from '../tabs/defaults/defaults.component';
import { VolumeSizeIncrementsComponent } from '../tabs/volume-size-increments/volume-size-increments.component';
import { DiscoveredServicesComponent } from '../tabs/discovered-services/discovered-services.component';
import { IObjectController } from '../../../../shared/ui/objects-view/interfaces/object-controller';
import { StaticObjectController } from '../../../../shared/ui/objects-view/static-object-controller';

@Component({
  selector: 'app-settings-openstack',
  templateUrl: './settings-openstack.component.html',
  styleUrls: ['./settings-openstack.component.scss']
})
export class SettingsOpenstackComponent implements OnInit {
public objectController: IObjectController = new StaticObjectController({
    header: {
      title: {
        text: 'OpenStack settings',
      }
    },
    tabs: [
      {
        tabName: 'Credentials',
        component: CredentialsComponent,
      },
      {
        tabName: 'Notifications',
        component: NotificationsComponent,
      },
      {
        tabName: 'Defaults',
        component: DefaultsComponent,
      },
      {
        tabName: 'Volume size increments',
        component: VolumeSizeIncrementsComponent,
      },
      {
        tabName: 'Discovered services',
        component: DiscoveredServicesComponent,
      },
    ],
  });

  constructor() {
  }

  ngOnInit() {
  }
}
