import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFilterOption } from '@shared/ui-api/interfaces/route-config/filter-option';
import { FilterTypes } from '@shared/ui-api/interfaces/route-config/filter-types';
import { Subscription } from 'rxjs';
import { IFilterConfig } from '@shared/ui-api/interfaces/route-config/filter-config';
import { ListFilteringActionsTrackService } from '@objects-view/objects-list-filtering/list-filtering-actions-track.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-objects-list-filtering',
  templateUrl: './objects-list-filtering.component.html',
  styleUrls: ['./objects-list-filtering.component.scss']
})
export class ObjectsListFilteringComponent implements OnInit, OnDestroy {
  @ViewChild('filterMenuTrigger') filterMenuTrigger: MatMenuTrigger;
  showDetail = false;
  filterConfig: IFilterConfig;
  activeFilterOption: IFilterOption;
  public readonly FilterTypes = FilterTypes;
  private routeDataSubscription: Subscription = null;
  private filteringActionsTrackSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private listFilteringActionsTrackService: ListFilteringActionsTrackService,
  ) {
    this.filteringActionsTrackSubscription = this.listFilteringActionsTrackService.filteringActionsTrack$
      .subscribe(value => {
        if (value === true) {
          this.showDetailSwitch(null, undefined, true);
        }
      });
  }

  showDetailSwitch(event: Event, filterOption?: IFilterOption, closeMenu=false) {
    if (event) {
      event.stopPropagation();
    }
    if (closeMenu) {
      this.filterMenuTrigger.closeMenu();
      setTimeout(() => {
        // delay this a little because of mat-menu closing animation
        this.showDetail = !this.showDetail;
        this.activeFilterOption = filterOption;
      }, 500);
      return;
    }
    this.showDetail = !this.showDetail;
    this.activeFilterOption = filterOption;
  }

  ngOnInit() {
    this.routeDataSubscription = this.activatedRoute.data.subscribe((data) => {
      if (data.config && data.config.filterConfig) {
        this.filterConfig = data.config.filterConfig;
      } else {
        this.filterConfig = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
      this.routeDataSubscription = null;
    }
    if (this.filteringActionsTrackSubscription) {
      this.filteringActionsTrackSubscription.unsubscribe();
      this.filteringActionsTrackSubscription = null;
    }
  }

}
