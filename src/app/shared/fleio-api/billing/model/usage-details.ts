export interface IUsageDetails {
  resource_name: string;
  resource_type: string;
  price: number;
  usage: [{
    resource_id: string;
    display_name: string;
    region: string;
    price: number;
    history: [{
      rule: number;
      start: Date;
      end: Date;
      modifiers: any[];
      attribute_value: number;
      name: string;
      price: number;
      base_price: string;
      price_details: {
        unit_display: string;
        units: number;
        unit_price: number;
        time_unit: string;
      }
    }]
  }];
}
