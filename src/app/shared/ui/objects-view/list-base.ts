import { ObjectListController } from './object-list-controller';
import { ObjectController } from './object-controller';
import { ActivatedRoute } from '@angular/router';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { IObjectListUIService } from './interfaces/object-list-ui-service';
import { map } from 'rxjs/operators';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { RefreshService } from '../../ui-api/refresh.service';
import { environment } from '../../../../environments/environment';

@Directive()
export class ListBase<ObjectType extends IBaseFleioObjectModel> implements OnDestroy, OnInit {
  public objectListController: ObjectListController<ObjectController>;

  constructor(
    private readonly baseRoute: ActivatedRoute,
    private readonly objectListUIService: IObjectListUIService,
    private readonly baseRefreshService: RefreshService,
    private readonly listName: string,
    private readonly refreshInterval: number = null,
  ) {
    this.refreshInterval = objectListUIService.getRefreshInterval();
  }

  ngOnInit() {
    this.objectListController = new ObjectListController<ObjectController>(
      this.baseRoute.data.pipe(map(routeData => {
        if (!routeData[this.listName] && environment.enableErrorLogging) {
          console.error(`Route data has no member named '${this.listName}'`);
        }
        return routeData[this.listName];
      })),
      this.objectListUIService
    );
    this.baseRefreshService.startRefreshTimer(this.refreshInterval);
  }

  ngOnDestroy(): void {
    if (this.objectListController) {
      this.objectListController.unsubscribe();
      this.objectListController = null;
    }
    this.baseRefreshService.stopRefreshTimer();
  }
}
