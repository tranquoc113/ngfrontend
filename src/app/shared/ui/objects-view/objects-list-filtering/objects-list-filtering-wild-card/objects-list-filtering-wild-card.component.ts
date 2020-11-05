import { Component, Input, OnInit } from '@angular/core';
import { IFilterOption } from '@shared/ui-api/interfaces/route-config/filter-option';
import { FilteringService } from '@shared/ui-api/filtering.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-objects-list-filtering-wild-card',
  templateUrl: './objects-list-filtering-wild-card.component.html',
  styleUrls: ['./objects-list-filtering-wild-card.component.scss']
})
export class ObjectsListFilteringWildCardComponent implements OnInit {
  @Input() filterOption: IFilterOption;
  searchValue: string;
  constructor(private filterService: FilteringService, private notificationService: NotificationService) { }
  applyFiltering() {
    if (!this.searchValue) {
      return this.notificationService.showMessage('Please enter a valid value');
    }
    let filterField = this.filterOption.field;
    let searchValue = this.searchValue;
    if (this.searchValue.endsWith('*') && this.searchValue.startsWith('*')) {
      filterField = filterField + '__icontains';
      // remove asterisks
      searchValue = searchValue.substr(1);
      searchValue = searchValue.substring(0, searchValue.length - 1);
    } else if (this.searchValue.endsWith('*')) {
      filterField = filterField + '__istartswith';
      // remove asterisk
      searchValue = searchValue.substring(0, searchValue.length - 1);
    } else if (this.searchValue.startsWith('*')) {
      filterField = filterField + '__iendswith';
      // remove asterisk
      searchValue = searchValue.substr(1);
    }
    this.filterService.addFilter(filterField, searchValue);
  }

  ngOnInit() {
  }

}
