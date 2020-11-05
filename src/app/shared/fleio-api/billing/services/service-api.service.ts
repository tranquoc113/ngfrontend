import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IServiceModel } from '../model/service.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { IServiceUpgradeOptionsModel } from '@fleio-api/billing/model/service-upgrade-options.model';
import { IServiceUpgradeModel } from '@fleio-api/billing/model/service-upgrade-.model';
import { IServiceHostingAccountModel } from '@fleio-api/billing/services/model/service-hosting-account.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesApiService extends FleioApiService<IServiceModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/services'));
  }

  upgradeOptions(serviceId: FleioId): Observable<IServiceUpgradeOptionsModel> {
    return this.objectGetAction(serviceId, 'upgrade_options');
  }

  upgrade(serviceId: FleioId, upgradeRequest: IServiceUpgradeModel): Observable<IServiceUpgradeModel> {
    return this.objectPostAction(serviceId, 'upgrade', upgradeRequest);
  }

  updateHostingAccount(serviceId: FleioId, hostingAccount: IServiceHostingAccountModel) : Observable<any> {
    return this.objectPutAction(serviceId, 'update_hosting_account', hostingAccount);
  }
}
