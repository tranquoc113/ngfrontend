import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public search(searchText: string) {
    const queryParams = { search: undefined };
    Object.assign(queryParams, this.route.snapshot.queryParams);
    const urlSearchText = queryParams.search;
    if (urlSearchText !== searchText) {
      queryParams.search = searchText ? searchText : undefined;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams
      }).catch(() => {
        // error has to be handled by interceptor, or where the request is done
      });
    }
  }
}
