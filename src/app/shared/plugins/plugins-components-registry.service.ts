import { Component, Injectable } from '@angular/core';
import { TicketsPluginNotificationsComponent } from '../../staff/plugins/tickets/tickets-plugin-notifications/tickets-plugin-notifications.component';
import { TodoPluginNotificationsComponent } from '../../staff/plugins/todo/todo-plugin-notifications/todo-plugin-notifications.component';
import {
  TicketsSignaturesButtonComponent
} from '../../staff/plugins/tickets/tickets-signatures-button/tickets-signatures-button.component';
import { ClientDetailsTicketsListComponent } from '../../staff/plugins/tickets/client-details-tickets-list/client-details-tickets-list.component';
import { GoogleAuthenticatorDetailsTabComponent } from '@shared/plugins/tabs/common/google-authenticator-details-tab/google-authenticator-details-tab.component';
import { SmsAuthenticatorDetailsTabComponent } from '@shared/plugins/tabs/common/sms-authenticator-details-tab/sms-authenticator-details-tab.component';
import { GoogleAuthenticatorConfirmFormComponent } from '@shared/plugins/tabs/common/google-authenticator-confirm-form/google-authenticator-confirm-form.component';
import { SmsAuthenticatorConfirmFormComponent } from '@shared/plugins/tabs/common/sms-authenticator-confirm-form/sms-authenticator-confirm-form.component';
import { UserDetailsTicketsListComponent } from '../../staff/plugins/tickets/user-details-tickets-list/user-details-tickets-list.component';
import { ClientDetailsDomainListComponent } from '../../staff/plugins/domains/client-details-domain-list/client-details-domain-list.component';
import { ProductSettingsComponent as OpenStackProductSettingsComponent } from '../../staff/plugins/openstack/product-settings/product-settings.component';
import { ProductSettingsComponent as TodoProductSettingsComponent } from '../../staff/plugins/todo/product-settings/product-settings.component'
import { ProductSettingsComponent as CpanelProductSettingsComponent } from '../../staff/plugins/cpanel/product-settings/product-settings.component';
import { ProductSettingsComponent as CpanelserverProductSettingsComponent } from '../../staff/plugins/cpanelserver/product-settings/product-settings.component';

@Injectable({
  providedIn: 'root'
})
export class PluginsComponentsRegistryService {
  constructor() {
    this.registerComponent(
      'cpanel', 'staff', 'ProductSettings', CpanelProductSettingsComponent,
    );
    this.registerComponent(
      'cpanelserver', 'staff', 'ProductSettings', CpanelserverProductSettingsComponent,
    );
    this.registerComponent(
      'tickets', 'staff', 'PluginNotifications', TicketsPluginNotificationsComponent,
    );
    this.registerComponent(
      'tickets', 'staff', 'ClientDetailsTicketsListComponent', ClientDetailsTicketsListComponent,
    );
    this.registerComponent(
      'domains', 'staff', 'ClientDetailsDomainListComponent', ClientDetailsDomainListComponent,
    );
    this.registerComponent(
      'tickets', 'staff', 'UserDetailsTicketsListComponent', UserDetailsTicketsListComponent,
    );
    this.registerComponent(
      'todo', 'staff', 'PluginNotifications', TodoPluginNotificationsComponent,
    );
    this.registerComponent(
      'todo', 'staff', 'ProductSettings', TodoProductSettingsComponent,
    );
    this.registerComponent(
      'tickets', 'staff', 'TicketsSignaturesButton', TicketsSignaturesButtonComponent,
    );
    this.registerComponent(
      'google-authenticator', 'staff', 'GoogleAuthenticatorDetailsTabComponent', GoogleAuthenticatorDetailsTabComponent,
    );
    this.registerComponent(
      'google-authenticator', 'staff', 'GoogleAuthenticatorConfirmFormComponent', GoogleAuthenticatorConfirmFormComponent,
    );
    this.registerComponent(
      'sms-authenticator', 'staff', 'SmsAuthenticatorDetailsTabComponent', SmsAuthenticatorDetailsTabComponent,
    );
    this.registerComponent(
      'sms-authenticator', 'staff', 'SmsAuthenticatorConfirmFormComponent', SmsAuthenticatorConfirmFormComponent,
    );
    this.registerComponent(
      'openstack', 'staff', 'ProductSettings', OpenStackProductSettingsComponent,
    );
  }

  private components: { [pluginName: string]: { [panelName: string]: { [componentName: string]: Component } } } = {};

  public registerComponent(pluginName: string, panelName: string, componentName: string, component) {
    if (!this.components[pluginName]) {
      this.components[pluginName] = {};
    }
    const plugin = this.components[pluginName];

    if (!plugin[panelName]) {
      plugin[panelName] = {};
    }
    const panel = plugin[panelName];

    if (!panel[componentName]) {
      panel[componentName] = component;
    } else {
      console.error(`Component ${componentName} already registered for plugin ${pluginName}, panel ${panelName}`);
    }
  }

  public getComponent(pluginName: string, panelName: string, componentName: string) {
    if (!this.components[pluginName]) {
      console.error(`Plugin ${pluginName} does not exists`);
      return null;
    }
    const plugin = this.components[pluginName];

    if (!plugin[panelName]) {
      console.error(`Panel ${panelName} does not exists`);
      return null;
    }
    const panel = plugin[panelName];

    if (!panel[componentName]) {
      console.error(`Component ${componentName} does not exists`);
      return null;
    } else {
      return panel[componentName];
    }
  }
}
