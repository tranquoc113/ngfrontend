import { AfterViewChecked, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../../ui-api/search.service';
import { ISearchConfig } from '../../../ui-api/interfaces/route-config/search-config';
import { RouteHelper } from '../../../ui-api/route-helper';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, AfterViewChecked {
  @Input() searchConfig: ISearchConfig;
  @ViewChild('mobileSearchInput') mobileSearchInput: ElementRef;
  searchText: FormControl = new FormControl('searchText');
  showMobileInput = false;

  constructor(private route: ActivatedRoute, private router: Router, private searchService: SearchService) { }

  ngOnInit() {
    this.setSearchText();

    this.searchText.valueChanges.pipe(
      map(() => this.searchText.value as string),
      debounceTime(1000),
    ).subscribe(searchText => {
      this.searchService.search(searchText);
    });
  }

  setSearchText() {
    const routeSnapshot = new RouteHelper(this.route).getFinalRoute().snapshot;
    if (routeSnapshot.queryParams.search) {
      this.searchText.setValue(routeSnapshot.queryParams.search, { emitEvent: false });
    } else {
      this.searchText.setValue(undefined, { emitEvent: false });
    }
  }

  clearSearch() {
    this.searchText.setValue(undefined, { emitEvent: false });
    this.searchService.search(undefined);
  }

  ngAfterViewChecked() {
    if (this.showMobileInput) {
      this.mobileSearchInput.nativeElement.focus();
    }
  }

  switchShowMobileInput() {
    this.showMobileInput = !this.showMobileInput;
  }
}
