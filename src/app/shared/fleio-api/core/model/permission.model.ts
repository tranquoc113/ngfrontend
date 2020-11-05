export interface IPermission {
  category: string;
  description: string;
  display_data: {
    last_in_category: boolean;
    category: string;
    next_category: string;
  }
  display_name: string;
  granted: boolean;
  name: string;
}
