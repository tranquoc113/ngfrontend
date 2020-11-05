import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UiFeaturesService {
  private features = {
    staff: {
      'ui.billing.services.upgrade-downgrade': true,
      'ui.billing.services.show-order': true,

      'ui.clients&users.client-credit': true,
      'ui.clients&users.edit.reseller-client': true,
      'ui.clients&users.create.show-auto-order-service': true,
      'ui.clients&users.create.choose-config': true,
      'ui.clients&users.second_factor_auth': true,

      'ui.core.allow-changing-password': true,

      'ui.openstack.images.deactivate': true,
      'ui.core.demo-login-staff': true,
    },
    reseller: {
      'ui.billing.services.upgrade-downgrade': false,
      'ui.billing.services.show-order': false,

      'ui.clients&users.client-credit': false,
      'ui.clients&users.edit.reseller-client': false,
      'ui.clients&users.create.show-auto-order-service': false,
      'ui.clients&users.create.choose-config': false,
      'ui.clients&users.second_factor_auth': false,

      'ui.core.allow-changing-password': true,
      'ui.core.demo-login-reseller': true,

      'ui.openstack.images.deactivate': false,
    }
  }

  constructor(
    private config: ConfigService,
  ) {
  }

  feature(featureName: string): boolean {
    if (this.features[this.config.currentConfigurationName]) {
      return !!this.features[this.config.currentConfigurationName][featureName];
    }

    return false;
  }
}
