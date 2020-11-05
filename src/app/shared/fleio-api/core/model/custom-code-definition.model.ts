export interface ICustomCodeDefinitionModel {
  file_display_name: string;
  display_name: string;
  helptext: string;
  data: {
    insertion_point: string;
    frontend_file_type: string;
    code: string;
    active: string;
  }
}
