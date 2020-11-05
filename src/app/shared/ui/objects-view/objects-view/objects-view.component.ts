import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { IObjectListController } from '../interfaces/object-list-controller';
import { IAction } from '../interfaces/actions/action';
import { AppLocalStorageService } from '../../../ui-api/app-local-storage.service';
import { PaginatorService } from '../../../ui-api/paginator.service';
import { ActivatedRoute } from '@angular/router';
import { IRouteConfig } from '../../../ui-api/interfaces/route-config/route-config';
import { IObjectListUIService } from '../interfaces/object-list-ui-service';
import { ConfigService } from '@shared/config/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-objects-view',
  templateUrl: './objects-view.component.html',
  styleUrls: ['./objects-view.component.scss'],
})
export class ObjectsViewComponent implements OnInit, OnDestroy {
  @Input() openDetailsOnClick;
  @Input() objectsListController: IObjectListController;
  @Input() objectsListUiService: IObjectListUIService;
  @Input() listOnly = false;
  currentPageSize: number;
  queryParamsSubscription: Subscription;

  cardsDisplay: boolean;
  public actions: IAction[] = null;

  constructor(
    private appLocalStorage: AppLocalStorageService,
    private activatedRoute: ActivatedRoute,
    public paginator: PaginatorService,
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    if (!this.objectsListController) {
      console.error('ObjectListController not set in objects view component.');
      return;
    }
    this.actions = this.objectsListController.actions();
    let itemsDisplayAsList = false;
    if (this.configService && this.configService.current && this.configService.current.settings) {
      itemsDisplayAsList = this.configService.current.settings.itemsDisplayAsList;
    }
    this.activatedRoute.data.subscribe(
      routeData => {
        if (routeData.config && routeData.config.subheader) {
          const routeConfig = routeData.config as IRouteConfig;
          if (routeConfig.defaultDisplayList === true) {
            this.initCardsDisplay(false);
          } else {
            this.initCardsDisplay(!itemsDisplayAsList);
          }
        } else {
          this.initCardsDisplay(!itemsDisplayAsList);
        }
      });
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      this.currentPageSize = this.paginator.getPageSizeFromQueryParams(queryParams);
    });
  }

  initCardsDisplay(defaultAsCards: boolean) {
    if (this.listOnly) {
      this.cardsDisplay = false;
    } else {
      const cardsDisplay = this.appLocalStorage.getCardsDisplay();
      if (typeof cardsDisplay === 'boolean') {
        this.cardsDisplay = cardsDisplay;
      } else {
        this.cardsDisplay = defaultAsCards === true;
      }
    }
  }

  onChangedCardsDisplay(newValue: boolean) {
    this.cardsDisplay = newValue;
  }

  @HostListener('window:scroll', []) // for window scroll events
  onScroll() {
    const scrollPosition = window.pageYOffset;
    const scrollMax = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollPosition / scrollMax * 100;
    const totalObjectsCount = this.objectsListController.objectList.totalCount;
    if (scrollPercent > 99 && totalObjectsCount > this.currentPageSize) {
      this.paginator.increasePageSize();
    }
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
      this.queryParamsSubscription = null;
    }
  }
}
