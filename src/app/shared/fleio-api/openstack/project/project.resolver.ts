import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { ProjectsApiService } from '@fleio-api/openstack/project/projects-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<IProjectModel> {
  constructor(private projectsApiService: ProjectsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IProjectModel> | Promise<IProjectModel> | IProjectModel {
    return this.projectsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
