import { Component, Input, OnInit } from '@angular/core';
import { IFilterOption } from '@shared/ui-api/interfaces/route-config/filter-option';
import { FilteringService } from '@shared/ui-api/filtering.service';

@Component({
  selector: 'app-objects-list-filtering-date',
  templateUrl: './objects-list-filtering-date.component.html',
  styleUrls: ['./objects-list-filtering-date.component.scss']
})
export class ObjectsListFilteringDateComponent implements OnInit {
  @Input() filterOption: IFilterOption;
  dateChoice: Date;
  greaterThanFiltering: boolean;

  constructor(
    private filterService: FilteringService
  ) { }

  applyFiltering() {
    const parsedDate = this.dateChoice.getFullYear() + ',' + (this.dateChoice.getMonth() + 1) + ',' +
      this.dateChoice.getDate(); // required format by custom made filter in fleio django app
    let parsedField = this.filterOption.field;
    if (this.greaterThanFiltering === true) {
      parsedField = parsedField + '__gte';
    } else {
      parsedField = parsedField + '__lte';
    }
    parsedField = parsedField + '__date'; // required format by custom made filter in fleio django app
    this.filterService.addFilter(parsedField, parsedDate);
  }

  ngOnInit() {
  }

}
