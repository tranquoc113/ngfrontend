import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  defaultPageSize: number;

  constructor(private router: Router, private route: ActivatedRoute, private configService: ConfigService) {
    if (configService && configService.current && configService.current.settings) {
      this.defaultPageSize = configService.current.settings.paginateBy || 20;
    } else {
      this.defaultPageSize = 20;
    }
  }

  public getPageSizeFromQueryParams(queryParams): number {
    const pageSize = parseInt(queryParams.page_size, 10)
    return isNaN(pageSize) ? this.defaultPageSize : pageSize;
  }

  public getPageSize(): number {
    const queryParams = this.route.snapshot.queryParams;
    return this.getPageSizeFromQueryParams(queryParams);
  }

  public setPageSize(pageSize: number) {
    const queryParams = {page_size: undefined};
    Object.assign(queryParams, this.route.snapshot.queryParams);
    queryParams.page_size = pageSize;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    }).catch(() => {
      // error has to be handled by interceptor, or where the request is done
    });
  }

  public increasePageSize() {
    this.setPageSize(this.getPageSize() + this.defaultPageSize);
  }
}
