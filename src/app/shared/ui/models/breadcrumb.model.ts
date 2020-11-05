import { Params } from '@angular/router';

export interface BreadCrumbModel {
  queryParams?: Params;
  display: string;
  url?: string;
}
