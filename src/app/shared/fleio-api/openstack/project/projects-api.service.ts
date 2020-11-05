import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IProjectModel } from '../model/project.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService extends FleioApiService<IProjectModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/projects'));
  }

  deleteProject(id: FleioId, deleteAllResources: boolean): Observable<any> {
    return this.objectPostAction(id, 'delete_project', {
      delete_all_resources: deleteAllResources,
    })
  }
}
