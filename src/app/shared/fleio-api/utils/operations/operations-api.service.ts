import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IOperationModel } from '../model/operation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsApiService extends FleioApiService<IOperationModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('operations'));
  }

  hasOperationsInProgress(): Observable<any> {
    return this.getAction( 'has_operations_in_progress');
  }
}
