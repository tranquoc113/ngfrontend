import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { FleioId, IBaseFleioObjectModel } from './base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { FleioObjectsList } from './fleio-objects-list';
import { map } from 'rxjs/operators';
import { IPermissionsModel } from './base-model/IPermissionsModel';
import { IListQueryParams } from './base-model/list-query-params';
import { ConfigService } from '../config/config.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class FleioApiService<ObjectModelType extends IBaseFleioObjectModel> {
  protected endpoint: string = null;
  protected httpClient: HttpClient = null;
  protected config: ConfigService = null;

  protected setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  private checkIfInitialized() {
    if (isDevMode()) {
      if (!this.httpClient) {
        console.error('httpClient property is null, it must be injected as protected property in derived classes.');
      }

      if (!this.config) {
        console.error('config property is null, it must be injected as protected property in derived classes.');
      }

      if (!this.endpoint) {
        if (environment.enableErrorLogging) {
          console.error('endpoint property is null, it must be passed as a parameter to constructor in derived classes.');
        }
        this.endpoint = 'dummy'; // dummy string for unit tests purposes
      }
    }
  }

  public list(queryParams: IListQueryParams = {}, action: string = null):
    Observable<FleioObjectsList<ObjectModelType>> {
    this.checkIfInitialized();
    let listParams: HttpParams;
    if (!queryParams.hasOwnProperty('page_size') && (this.config && this.config.current &&
      this.config.current.settings)) {
      // make sure page size from configs is used
      const newQueryParams = Object.assign({page_size: this.config.current.settings.paginateBy}, queryParams);
      listParams = new HttpParams({fromObject: {...newQueryParams}});
    } else {
      listParams = new HttpParams({fromObject: {...queryParams}});
    }
    const queryEndpoint = action ? `${this.endpoint}/${action}` : this.endpoint;
    return this.httpClient.get(
      queryEndpoint,
      {params: listParams}
    ).pipe(map(objectList => {
      return objectList as FleioObjectsList<ObjectModelType>;
    }));
  }

  public get(objectId): Observable<ObjectModelType> {
    this.checkIfInitialized();
    return this.httpClient.get(
      `${this.endpoint}/${objectId}`
    ) as Observable<ObjectModelType>;
  }

  public create(objectData: ObjectModelType): Observable<ObjectModelType> {
    this.checkIfInitialized();

    return this.httpClient.post(
      this.endpoint,
      objectData,
    ).pipe(map(result => result as ObjectModelType));
  }

  public createWithUpload(objectData: FormData, action?: string): Observable<HttpEvent<ObjectModelType>> {
    this.checkIfInitialized();

    let headers: HttpHeaders;
    if (objectData instanceof FormData) {
      headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    }
    let endpoint = this.endpoint;
    if (action) {
      endpoint += `/${action}`;
    }
    return this.httpClient.post(
      endpoint,
      objectData,
      {
        headers,
        observe: 'events',
        reportProgress: true
      },
    ).pipe(map(result => result as HttpEvent<ObjectModelType>));
  }

  public update(objectId, objectData: ObjectModelType): Observable<ObjectModelType> {
    this.checkIfInitialized();
    return this.httpClient.put(
      `${this.endpoint}/${objectId}`,
      objectData
    ).pipe(map(result => result as ObjectModelType));
  }

  public delete(objectId, queryParams: IListQueryParams = {}): Observable<any> {
    this.checkIfInitialized();
    const listParams = new HttpParams({fromObject: {...queryParams}});
    return this.httpClient.delete(
      `${this.endpoint}/${objectId}`,
      {params: listParams}
    );
  }

  public permissions(): Observable<IPermissionsModel> {
    this.checkIfInitialized();
    return this.httpClient.get(`${this.endpoint}/permissions`) as Observable<IPermissionsModel>;
  }

  public createOptions(parameters?: {}): Observable<{}> {
    this.checkIfInitialized();
    if (typeof parameters === 'object' && Object.keys(parameters).length) {
      return this.httpClient.get(`${this.endpoint}/create_options`, {
        params: parameters
      }) as Observable<{}>;
    }
    return this.httpClient.get(`${this.endpoint}/create_options`) as Observable<{}>;
  }

  public filterOptions(): Observable<{}> {
    this.checkIfInitialized();
    return this.httpClient.get(`${this.endpoint}/filter_options`) as Observable<{}>;
  }

  public objectPostAction(objectId: FleioId, action: string, parameters: {}): Observable<any> {
    this.checkIfInitialized();
    return this.httpClient.post(
      `${this.endpoint}/${objectId}/${action}`,
      parameters
    );
  }

  public postAction(action: string, parameters?: {}): Observable<any> {
    this.checkIfInitialized();
    let url = this.endpoint;
    if (action) {
      url += `/${action}`;
    }
    return this.httpClient.post(
      url,
      parameters
    );
  }

  public objectPutAction(objectId: FleioId, action: string, parameters: {}): Observable<any> {
    this.checkIfInitialized();
    return this.httpClient.put(
      `${this.endpoint}/${objectId}/${action}`,
      parameters
    );
  }

  public putAction(action: string, parameters: {}): Observable<any> {
    this.checkIfInitialized();
    return this.httpClient.put(
      `${this.endpoint}/${action}`,
      parameters
    );
  }

  public objectGetAction(objectId: FleioId, action: string, parameters?: {}): Observable<any> {
    this.checkIfInitialized();
    return this.httpClient.get(
      `${this.endpoint}/${objectId}/${action}`, {
        params: parameters
      }) as Observable<ObjectModelType>;
  }

  public getAction(action?: string, parameters?: {}): Observable<any> {
    this.checkIfInitialized();
    let url = this.endpoint;
    if (action) {
      url += `/${action}`;
    }
    return this.httpClient.get(
      url, {
        params: parameters
      }) as Observable<ObjectModelType>;
  }
}
