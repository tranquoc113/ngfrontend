import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';

@Component({
  selector: 'app-flavors-as-cards',
  templateUrl: './flavors-as-cards.component.html',
  styleUrls: ['./flavors-as-cards.component.scss']
})
export class FlavorsAsCardsComponent implements OnInit {
  @Input() flavors: IFlavorModel[];
  @Input() flavorIncompatibility = false;
  @Output() choseFlavor = new EventEmitter<IFlavorModel>();
  selectedFlavor: IFlavorModel | null;
  groupsList: {
    name: string;
    priority: number;
    description: string;
  }[];
  groups: {
    standard?: IFlavorModel[];
  };
  constructor() { }

  public updateFlavorsAndGroups() {
    this.groupsList = [];
    this.groups = {};
    let flavorGroup;
    if (this.flavors) {
      for (const flavor of this.flavors) {
        flavorGroup = flavor.flavor_group;
        if (flavorGroup !== null) {
          if (typeof this.groups[flavorGroup.name] !== 'undefined') {
            this.groups[flavorGroup.name].push(flavor);
          } else {
            this.groupsList.push({
              name: flavorGroup.name,
              priority: flavorGroup.priority,
              description: flavorGroup.description,
            });
            this.groups[flavorGroup.name] = [flavor];
          }
        } else {
          if (!this.groups.hasOwnProperty('standard')) {
            this.groups.standard = [];
            this.groupsList.unshift({name: 'standard', priority: 0, description: ''});
          }
          this.groups.standard.push(flavor);
        }
      }
    }
    this.groupsList = this.groupsList.sort((g1, g2) => g1.priority - g2.priority);
  }

  public flavorClick(flavor: IFlavorModel) {
    if (!flavor.out_of_stock) {
      this.selectedFlavor = flavor;
      this.choseFlavor.emit(this.selectedFlavor);
    }
  }

  ngOnInit() {
    this.selectedFlavor = null;
    this.updateFlavorsAndGroups();
  }

}
