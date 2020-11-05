import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../../shared/ui/objects-view/details-component-base';
import { ITLDModel } from '../../../../../../shared/fleio-api/plugins/domains/model/tld.model';
import { ITLDPricesModel } from '../../../../../../shared/fleio-api/plugins/domains/model/tld-prices.model';
import { IDomainPricesModel } from '../../../../../../shared/fleio-api/plugins/domains/model/domain-prices.model';
import { TLDsApiService } from '../../../../../../shared/fleio-api/plugins/domains/tlds-api.service';
import { NotificationService } from '../../../../../../shared/ui-api/notification.service';

@Component({
  selector: 'app-tld-addons-pricing',
  templateUrl: './tld-addons-pricing.component.html',
  styleUrls: ['./tld-addons-pricing.component.scss']
})
export class TldAddonsPricingComponent extends DetailsComponentBase<ITLDModel> implements OnInit {
  prices: ITLDPricesModel;
  addonsPrices: IDomainPricesModel;
  groupBy = 'currency';
  currencies: string[];
  priceTypes = ['dns', 'email', 'id'];
  defaultPriceCycles: { [priceType: string]: number; };

  constructor(private tldsApiService: TLDsApiService, private notificationService: NotificationService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.prices = this.objectController.additionalObjects.prices as ITLDPricesModel;
      this.prices = JSON.parse(JSON.stringify(this.prices));
      this.addonsPrices = this.prices.domain_addon_prices;
      // get a list of currencies ensuring default currency is first
      this.currencies = Object.keys(this.addonsPrices.price_cycles_by_currency).filter(
        currencyCode => currencyCode !== this.addonsPrices.default_currency.code,
      );
      this.currencies.unshift(this.addonsPrices.default_currency.code);
      this.defaultPriceCycles = this.addonsPrices.price_cycles_by_currency[this.addonsPrices.default_currency.code];
    }
  }

  savePrices() {
    this.tldsApiService.savePrices(this.object.id, this.prices).subscribe(
      () => {
        this.notificationService.showMessage('TLD addons prices saved successfully');
      },
      () => {
        this.notificationService.showMessage('Failed to save TLD addons prices');
      },
    )
  }
}
