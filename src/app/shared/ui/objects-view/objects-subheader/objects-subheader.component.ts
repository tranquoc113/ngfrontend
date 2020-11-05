import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FleioObjectsList } from '../../../fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../fleio-api/base-model/base-fleio-object.model';
import { ISubheaderConfig } from '../../../ui-api/interfaces/route-config/subheader-config';
import { Subscription } from 'rxjs';
import { IObjectListController } from '../interfaces/object-list-controller';
import {AppLocalStorageService} from '../../../ui-api/app-local-storage.service';

@Component({
  selector: 'app-objects-subheader',
  templateUrl: './objects-subheader.component.html',
  styleUrls: ['./objects-subheader.component.scss']
})
export class ObjectsSubheaderComponent implements OnInit, OnDestroy {
  @ViewChild('filteringDisplayComponent') filteringDisplayComponent;
  @Input() cardsDisplay: boolean;
  @Input() objectsListController: IObjectListController;
  @Input() listOnly = false;
  @Output() changedCardsDisplay = new EventEmitter<boolean>();

  public config: ISubheaderConfig;
  private objectsList: FleioObjectsList<IBaseFleioObjectModel>;
  private routeDataSubscription: Subscription;

  constructor(public activatedRoute: ActivatedRoute, private appLocalStorage: AppLocalStorageService) {
  }

  ngOnInit() {
    this.routeDataSubscription = this.activatedRoute.data.subscribe(
    routeData => {
      if (routeData.config && routeData.config.subheader) {
        this.config = routeData.config.subheader;
      } else {
        this.config = null;
      }
    });
  }

  toggleDisplay() {
    this.cardsDisplay = !this.cardsDisplay;
    this.changedCardsDisplay.emit(this.cardsDisplay);
    this.appLocalStorage.setCardsDisplay(this.cardsDisplay);
  }

  ngOnDestroy(): void {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
      this.routeDataSubscription = null;
    }
  }
}
