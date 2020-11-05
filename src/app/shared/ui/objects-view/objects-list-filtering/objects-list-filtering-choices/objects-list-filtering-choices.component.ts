import { Component, Input, OnInit } from '@angular/core';
import { IFilterOption } from '@shared/ui-api/interfaces/route-config/filter-option';
import { FilteringService } from '@shared/ui-api/filtering.service';
import { ActivatedRoute } from '@angular/router';
import { IFilterChoiceConfig } from '@shared/ui-api/interfaces/route-config/filter-choice-config';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-objects-list-filtering-choices',
  templateUrl: './objects-list-filtering-choices.component.html',
  styleUrls: ['./objects-list-filtering-choices.component.scss']
})
export class ObjectsListFilteringChoicesComponent implements OnInit {
  @Input() filterOption: IFilterOption;
  choices: IFilterChoiceConfig[];
  selectedValue: string | null;
  exclude = false;

  constructor(
    private filterService: FilteringService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {
  }

  applyFiltering() {
    if (!this.selectedValue) {
      return this.notificationService.showMessage('Please enter a valid value');
    }
    let filterField = this.filterOption.field;
    if (this.exclude) {
      filterField = filterField + '__ne';
    }
    this.filterService.addFilter(filterField, this.selectedValue);
  }

  ngOnInit() {
    this.selectedValue = null;
    for (const snapshotData in this.activatedRoute.snapshot.data) {
      if (this.activatedRoute.snapshot.data.hasOwnProperty(snapshotData)) {
        if (this.activatedRoute.snapshot.data[snapshotData].hasOwnProperty('filter_options')) {
          this.choices = this.activatedRoute.snapshot.data[snapshotData].filter_options[this.filterOption.field];
        }
      }
    }
  }

}
