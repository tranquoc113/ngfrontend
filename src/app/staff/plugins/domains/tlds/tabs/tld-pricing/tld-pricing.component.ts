import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../../shared/ui/objects-view/details-component-base';
import { ITLDModel } from '../../../../../../shared/fleio-api/plugins/domains/model/tld.model';
import { ITLDPricesModel } from '../../../../../../shared/fleio-api/plugins/domains/model/tld-prices.model';
import { IDomainPricesModel } from '../../../../../../shared/fleio-api/plugins/domains/model/domain-prices.model';
import { TLDsApiService } from '../../../../../../shared/fleio-api/plugins/domains/tlds-api.service';
import { NotificationService } from '../../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-tld-pricing',
  templateUrl: './tld-pricing.component.html',
  styleUrls: ['./tld-pricing.component.scss']
})
export class TldPricingComponent extends DetailsComponentBase<ITLDModel> implements OnInit {
  prices: ITLDPricesModel;
  domainPrices: IDomainPricesModel;
  groupBy = 'currency';
  currencies: string[];
  priceTypes = ['register', 'transfer', 'renew'];
  defaultPriceCycles: { [priceType: string]: number; };

  constructor(private tldsApiService: TLDsApiService, private notificationService: NotificationService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.prices = this.objectController.additionalObjects.prices as ITLDPricesModel;
      this.prices = JSON.parse(JSON.stringify(this.prices));
      this.domainPrices = this.prices.domain_prices;
      // get a list of currencies ensuring default currency is first
      this.currencies = Object.keys(this.domainPrices.price_cycles_by_currency).filter(
        currencyCode => currencyCode !== this.domainPrices.default_currency.code,
      );
      this.currencies.unshift(this.domainPrices.default_currency.code);
      this.defaultPriceCycles = this.domainPrices.price_cycles_by_currency[this.domainPrices.default_currency.code];
    }
  }

  savePrices() {
    this.tldsApiService.savePrices(this.object.id, this.prices).subscribe(
      () => {
        this.notificationService.showMessage('TLD prices saved successfully');
      },
      () => {
        this.notificationService.showMessage('Failed to save TLD prices');
      },
    )
  }
}
