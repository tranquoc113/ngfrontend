import { IGatewayModel } from './gateway.model';
import { ICurrencyModel } from './currency.model';

export interface IInvoicePaymentOptionsModel {
  gateways: IGatewayModel[];
  currencies: ICurrencyModel[];
  defaultGateway: number;
  defaultCurrency: string;
}
