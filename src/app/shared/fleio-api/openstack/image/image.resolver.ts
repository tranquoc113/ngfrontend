import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ImagesApiService } from './image-api.service';
import { IImageModel } from '../model/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageResolver implements Resolve<IImageModel> {
  constructor(private imagesApiService: ImagesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IImageModel> | Promise<IImageModel> | IImageModel {
    return this.imagesApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
