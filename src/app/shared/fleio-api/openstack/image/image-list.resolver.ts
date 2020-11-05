import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IImageModel } from '../model/image.model';
import { ImagesApiService } from './image-api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageListResolver implements Resolve<FleioObjectsList<IImageModel>> {
  constructor(private imagesApiService: ImagesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IImageModel>> | Promise<FleioObjectsList<IImageModel>> |
    FleioObjectsList<IImageModel> {
    return this.imagesApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
