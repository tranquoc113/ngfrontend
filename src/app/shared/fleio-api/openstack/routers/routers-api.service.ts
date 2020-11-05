import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { IRouterAddInterfaceCreateOptionsModel } from '@fleio-api/openstack/model/router-add-interface-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class RoutersApiService extends FleioApiService<IRouterModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/routers'));
  }

  removeInterface(interfaceId: FleioId, routerId: FleioId): Observable<any> {
    return this.objectPostAction(routerId, 'remove_interface', {
      id: routerId,
      interface_id: interfaceId,
      options: 'remove_interface',
    })
  }

  addInterfaceCreateOptions(routerId: FleioId): Observable<IRouterAddInterfaceCreateOptionsModel> {
    return this.objectGetAction(
      routerId, 'create_add_interface_options',
    ) as Observable<IRouterAddInterfaceCreateOptionsModel>;
  }

  addInterface(routerId: FleioId, netInt: any): Observable<any> {
    return this.objectPostAction(routerId, 'add_interface', netInt);
  }
}
