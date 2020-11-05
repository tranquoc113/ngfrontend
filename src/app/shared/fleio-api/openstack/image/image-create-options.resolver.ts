import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IImageCreateOptionsModel } from '../model/image-create-options.model';
import { ImagesApiService } from './image-api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageCreateOptionsResolver implements Resolve<IImageCreateOptionsModel> {
  constructor(private imagesApiService: ImagesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IImageCreateOptionsModel> | Promise<IImageCreateOptionsModel> | IImageCreateOptionsModel {
    return this.imagesApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IImageCreateOptionsModel;
  }
}
