import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ITodoModel } from './model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService extends FleioApiService<ITodoModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/todo/todo'));
  }
}
