export interface IAppConfigModel {
  panels: {
    [name: string]: {
      configFile: string;
    };
  };
}
