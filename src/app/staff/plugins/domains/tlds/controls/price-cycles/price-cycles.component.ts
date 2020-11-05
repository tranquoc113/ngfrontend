import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { IPriceCyclesModel } from '../../../../../../shared/fleio-api/plugins/domains/model/price-cycle.model';

@Component({
  selector: 'app-price-cycles',
  templateUrl: './price-cycles.component.html',
  styleUrls: ['./price-cycles.component.scss']
})
export class PriceCyclesComponent implements OnInit, DoCheck {
  @Input() priceCycles: IPriceCyclesModel;
  @Input() defaultPriceCycles: IPriceCyclesModel;
  @Input() defaultCurrencyCode: string;

  defaultPriceCyclesDiffer: IterableDiffer<number>;

  constructor(private differs: IterableDiffers) {
  }

  ngOnInit(): void {
    if (this.defaultPriceCycles) {
      this.defaultPriceCyclesDiffer = this.differs.find(this.defaultPriceCycles.prices_per_years).create();
    }
  }

  get useRelativePricesTooltip() {
    if (this.priceCycles.currency.is_default) {
      return 'Relative prices cannot\nbe applied to default currency.'
    } else {
      return 'Calculate prices based\non default currency prices\nand and exchange rate.'
    }
  };


  priceTrackBy(index) {
    return index;
  }

  relativePricesChanged() {
    if (this.priceCycles && this.priceCycles.relative_prices) {
      this.updateRelativePrices();
    }
  }

  updateRelativePrices() {
    let index = 0;
    for (const price of this.defaultPriceCycles.prices_per_years) {
      if (price) {
        this.priceCycles.prices_per_years[index] = price * this.priceCycles.currency.rate;
      } else {
        this.priceCycles.prices_per_years[index] = undefined;
      }
      index = index + 1;
    }
  }

  ngDoCheck() {
    if (this.priceCycles && this.priceCycles.relative_prices && this.defaultPriceCyclesDiffer) {
      const changes = this.defaultPriceCyclesDiffer.diff(this.defaultPriceCycles.prices_per_years);
      if (changes) {
        this.updateRelativePrices();
      }
    }
  }

  autoFillPrices() {
    if (this.priceCycles.prices_per_years[0]) {
      for (let index = 1; index < this.priceCycles.prices_per_years.length; index++) {
        if (!this.priceCycles.prices_per_years[index]) {
          this.priceCycles.prices_per_years[index] = this.priceCycles.prices_per_years[0] * (index + 1);
        }
      }
    } else {
      for (let index = 0; index < this.priceCycles.prices_per_years.length; index++) {
        this.priceCycles.prices_per_years[index] = undefined;
      }
    }
  }
}
