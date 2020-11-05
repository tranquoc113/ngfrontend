import { Component, Input, OnInit } from '@angular/core';
import { IFilterOption } from '../../../../ui-api/interfaces/route-config/filter-option';
import { FilteringService } from '../../../../ui-api/filtering.service';
import { NotificationService } from '../../../../ui-api/notification.service';

@Component({
  selector: 'app-objects-list-filtering-boolean',
  templateUrl: './objects-list-filtering-boolean.component.html',
  styleUrls: ['./objects-list-filtering-boolean.component.scss']
})
export class ObjectsListFilteringBooleanComponent implements OnInit {
  @Input() filterOption: IFilterOption;
  filteringValue: boolean;

  constructor(private filterService: FilteringService, private notificationService: NotificationService) {
  }

  applyFiltering() {
    if (typeof this.filteringValue !== 'boolean') {
      return this.notificationService.showMessage('Please enter a valid value');
    }
    this.filterService.addFilter(
      this.filterOption.field,
      this.filteringValue ? 'true' : 'false',
    );
  }

  ngOnInit() {
  }

}
