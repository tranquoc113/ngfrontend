import { Component, Input, OnInit } from '@angular/core';
import { IFilterOption } from '@shared/ui-api/interfaces/route-config/filter-option';
import { FilteringService } from '@shared/ui-api/filtering.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-objects-list-filtering-decimal',
  templateUrl: './objects-list-filtering-decimal.component.html',
  styleUrls: ['./objects-list-filtering-decimal.component.scss']
})
export class ObjectsListFilteringDecimalComponent implements OnInit {
  @Input() filterOption: IFilterOption;
  searchValue: string;
  exclude = false;
  constructor(private filterService: FilteringService, private notificationService: NotificationService) { }
  applyFiltering() {
    if (!this.searchValue) {
      return this.notificationService.showMessage('Please enter a valid value');
    }
    let filterField = this.filterOption.field;
    if (this.exclude) {
      filterField = filterField + '__ne';
    }
    this.filterService.addFilter(filterField, this.searchValue);
  }
  ngOnInit() {
  }

}
