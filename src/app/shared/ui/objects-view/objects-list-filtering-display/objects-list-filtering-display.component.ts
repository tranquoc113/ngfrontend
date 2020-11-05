import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilteringService } from '../../../ui-api/filtering.service';
import { FilterTypes } from '../../../ui-api/interfaces/route-config/filter-types';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../../../config/config.service';
import { Subscription } from 'rxjs';
import { IFilterConfig } from '../../../ui-api/interfaces/route-config/filter-config';
import { IAppliedFilterOption } from '../../../ui-api/interfaces/route-config/applied-filter-option';

@Component({
  selector: 'app-objects-list-filtering-display',
  templateUrl: './objects-list-filtering-display.component.html',
  styleUrls: ['./objects-list-filtering-display.component.scss']
})
export class ObjectsListFilteringDisplayComponent implements OnInit, OnDestroy {
  appliedFilteringOptions: IAppliedFilterOption[];
  servicesMap: {};
  datePipe = new DatePipe(this.configService.locale);
  showAppliedFilters = this.initShowAppliedFilters();
  innerWidth: number;
  queryParamsChangedSubscription: Subscription = null;
  previousFilter: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filterService: FilteringService,
    private router: Router,
    private configService: ConfigService
  ) {
    this.servicesMap = filterService.itemsServices;
  }

  initShowAppliedFilters() {
    return window.innerWidth >= 1280;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.showAppliedFilters === false) {
      if (window.innerWidth > 1280) {
        this.showAppliedFilters = true;
      }
    }
    if (window.innerWidth < 1280 && this.innerWidth > window.innerWidth && this.showAppliedFilters === true) {
      this.showAppliedFilters = false;
    }
    this.innerWidth = window.innerWidth;
  }

  clearFilter(appliedFilter) {
    this.filterService.removeFilter(appliedFilter.fieldWithLookups, appliedFilter.value);
  }

  refreshAppliedFilteringOptionsDisplay() {
    this.appliedFilteringOptions = [];
    let routeDefinedFilterConfig: IFilterConfig = null;
    if (this.activatedRoute && this.activatedRoute.snapshot && this.activatedRoute.snapshot.data &&
      this.activatedRoute.snapshot.data.config) {
      routeDefinedFilterConfig = this.activatedRoute.snapshot.data.config.filterConfig;
    }
    const filtering = this.activatedRoute.snapshot.queryParams.filtering;
    if (filtering) {
      const appliedFilteringOptionsString = filtering.split('+');
      for (const appliedFilteringOptionString of appliedFilteringOptionsString) {
        const fieldAndValue = appliedFilteringOptionString.split(':');
        const fieldWithLookups = fieldAndValue[0];
        const field = fieldWithLookups
          .replace('__date', '')
          .replace('__gte', '')
          .replace('__lte', '')
          .replace('__icontains', '')
          .replace('__istartswith', '')
          .replace('__iendswith', '')
          .replace('__ne', '');
        const value = fieldAndValue[1];
        this.appliedFilteringOptions.push({field, fieldWithLookups, value, showField: false});
      }
      if (routeDefinedFilterConfig && routeDefinedFilterConfig.availableOptions.length) {
        for (const routeDefinedFilterOption of routeDefinedFilterConfig.availableOptions) {
          for (const appliedFilteringOption of this.appliedFilteringOptions) {
            if (routeDefinedFilterOption.field === appliedFilteringOption.field) {
              appliedFilteringOption.display = routeDefinedFilterOption.display;
              if (routeDefinedFilterOption.type === FilterTypes.CustomModel) {
                // handle CustomModel applied filter
                if (appliedFilteringOption.value === 'null') {
                  appliedFilteringOption.valueDisplay = 'none';
                  appliedFilteringOption.showField = true;
                } else {
                  this.servicesMap[routeDefinedFilterOption.items].get(appliedFilteringOption.value)
                    .subscribe(result => {
                      appliedFilteringOption.valueDisplay = result[routeDefinedFilterOption.itemsDisplayField] || result.id;
                      appliedFilteringOption.showField = true;
                    });
                }
              } else if (routeDefinedFilterOption.type === FilterTypes.Date) {
                // handle Date applied filter
                const dateArray = appliedFilteringOption.value.split(',');
                const dateValue = new Date(
                  parseInt(dateArray[0], 10),
                  parseInt(dateArray[1], 10),
                  parseInt(dateArray[2], 10)
                );
                appliedFilteringOption.valueDisplay = this.datePipe.transform(dateValue, 'yyyy-MM-dd');
                if (appliedFilteringOption.fieldWithLookups.endsWith('__lte__date')) {
                  appliedFilteringOption.display = appliedFilteringOption.display + ' lower than';
                } else if (appliedFilteringOption.fieldWithLookups.endsWith('__gte__date')) {
                  appliedFilteringOption.display = appliedFilteringOption.display + ' greater than';
                }
                appliedFilteringOption.showField = true;
              } else if (routeDefinedFilterOption.type === FilterTypes.WildCard) {
                // handle WildCard applied filter
                appliedFilteringOption.display = routeDefinedFilterOption.display;
                if (appliedFilteringOption.fieldWithLookups.endsWith('__icontains')) {
                  appliedFilteringOption.display = appliedFilteringOption.display + ' contains';
                } else if (appliedFilteringOption.fieldWithLookups.endsWith('__istartswith')) {
                  appliedFilteringOption.display = appliedFilteringOption.display + ' starts with';
                } else if (appliedFilteringOption.fieldWithLookups.endsWith('__iendswith')) {
                  appliedFilteringOption.display = appliedFilteringOption.display + ' ends with';
                }
                appliedFilteringOption.showField = true;
              } else {
                // handle other applied filters that do not need special actions
                appliedFilteringOption.display = routeDefinedFilterOption.display;
                appliedFilteringOption.showField = true;
              }
              if (appliedFilteringOption.fieldWithLookups.endsWith('__ne')) {
                appliedFilteringOption.display = appliedFilteringOption.display + ' is not';
              }
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.queryParamsChangedSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.filtering !== this.previousFilter) {
        this.previousFilter = queryParams.filtering;
        this.refreshAppliedFilteringOptionsDisplay();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsChangedSubscription) {
      this.queryParamsChangedSubscription.unsubscribe();
      this.queryParamsChangedSubscription = null;
    }
  }

}
