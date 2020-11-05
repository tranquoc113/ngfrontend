import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { ProjectsApiService } from '@fleio-api/openstack/project/projects-api.service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';

@Injectable({
  providedIn: 'root'
})
export class ProjectListResolver implements Resolve<FleioObjectsList<IProjectModel>> {
  constructor(private projectsApiService: ProjectsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IProjectModel>> | Promise<FleioObjectsList<IProjectModel>> |
    FleioObjectsList<IProjectModel> {
    return this.projectsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
