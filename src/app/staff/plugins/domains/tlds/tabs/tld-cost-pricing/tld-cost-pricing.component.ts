import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../../shared/ui/objects-view/details-component-base';
import { ITLDModel } from '../../../../../../shared/fleio-api/plugins/domains/model/tld.model';
import { RegistrarConnectorApiService } from '../../../../../../shared/fleio-api/plugins/domains/registrar-connector-api.service';
import { IRegistrarPricesModel } from '../../../../../../shared/fleio-api/plugins/domains/model/registrar-prices.model';
import { IRegistrarConnectorModel } from '../../../../../../shared/fleio-api/plugins/domains/model/registrar-connector.model';

@Component({
  selector: 'app-tld-cost-pricing',
  templateUrl: './tld-cost-pricing.component.html',
  styleUrls: ['./tld-cost-pricing.component.scss']
})
export class TldCostPricingComponent extends DetailsComponentBase<ITLDModel> implements OnInit {
  registrarConnectors: IRegistrarConnectorModel[];

  constructor(private registrarConnectorApiService: RegistrarConnectorApiService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.object) {
      this.registrarConnectorApiService.getRegistrarPrices(this.object.name).subscribe(prices => {
          this.registrarConnectors = prices;
        }
      );
    }
  }

  updateRegistrarPrices(registrarConnectorName: string) {
    this.registrarConnectorApiService.updateRegistrarPrices(
      registrarConnectorName, this.object.name
    ).subscribe(() => {
      this.registrarConnectorApiService.getRegistrarPrices(this.object.name).subscribe(prices => {
          this.registrarConnectors = prices;
        }
      );
    })
  }
}
