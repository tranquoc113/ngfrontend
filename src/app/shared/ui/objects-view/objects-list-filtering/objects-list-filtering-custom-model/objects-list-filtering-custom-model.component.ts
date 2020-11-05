import { Component, Input, OnInit } from '@angular/core';
import { FilteringService } from '@shared/ui-api/filtering.service';
import { IFilterOption } from '@shared/ui-api/interfaces/route-config/filter-option';
import { FormControl } from '@angular/forms';
import { startWith, switchMap } from 'rxjs/operators';
import { FleioApiService } from '@fleio-api/fleio-api.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-objects-list-filtering-custom-model',
  templateUrl: './objects-list-filtering-custom-model.component.html',
  styleUrls: ['./objects-list-filtering-custom-model.component.scss']
})
export class ObjectsListFilteringCustomModelComponent implements OnInit {
  @Input() filterOption: IFilterOption;
  myControl = new FormControl();
  selectedItem?: { id: string };
  filteredItems = [];
  servicesMap: {};
  exclude = false;

  constructor(private filterService: FilteringService, private notificationService: NotificationService) {
    this.servicesMap = filterService.itemsServices;
  }

  applyFiltering() {
    if (!this.selectedItem) {
      return this.notificationService.showMessage('Please enter a valid value');
    }
    let filteringField = this.filterOption.field;
    let filteringValue = this.selectedItem.id;
    if (filteringValue === null) {
      filteringValue = 'null';
    }
    if (this.exclude) {
      filteringField = filteringField + '__ne';
    }
    this.filterService.addFilter(filteringField, filteringValue);
  }

  displayFn(item: { id: string | null, name?: string }) {
    if (!item) {
      return '';
    }
    if (item.id === null) {
      return 'Filter items without related record';
    }
    return item.name || item.id || '';
  }

  onItemSelection(item) {
    this.selectedItem = item;
  }

  private getItems(value: string): any {
    if (this.filterOption) {
      const service = this.servicesMap[this.filterOption.items] as FleioApiService<IBaseFleioObjectModel>;
      if (!this.filterOption.itemsFilter) {
        return service.list({search: value});
      } else {
        let filtering = '';
        const fieldsKeys = [];
        for (const fieldKey in this.filterOption.itemsFilter) {
          if (this.filterOption.itemsFilter.hasOwnProperty(fieldKey)) {
            fieldsKeys.push(fieldKey);
          }
        }
        fieldsKeys.forEach((key, index) => {
          filtering += `${key}:${this.filterOption.itemsFilter[key]}`;
          if (index < fieldsKeys.length - 1) {
            filtering += '+';
          }
        })
        return service.list({
          search: value,
          filtering,
        });
      }
    }
    return [];
  }

  ngOnInit() {
    this.selectedItem = null;
    this.myControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this.getItems(value))
      )
      .subscribe((objectList: FleioObjectsList<IBaseFleioObjectModel>) => {
        this.filteredItems = objectList.objects;
        this.filteredItems.unshift({id: null});
      });
  }

}
