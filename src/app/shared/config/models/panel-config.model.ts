export interface IPanelConfigModel {
  urls: {
    backendApiUrl: string;
    homeName: string;
    angularJsPanelUrl: string;
    resellerUrl?: string;
    enduserUrl?: string;
  };
  settings: {
    appIdleTimeout: number;
    baseTitle: string;
    defaultLanguage: string;
    imagesPath: string;
    logoLight: string | null;
    logoDark: string | null;
    defaultTheme: string;
    availableThemes: string[];
    paginateBy: number;
    itemsDisplayAsList: boolean;
    instanceForm: {
      flavorsAsCards: boolean;
      showRootPasswordField: boolean;
      rootPasswordFieldMandatory: boolean;
      hideNetworksIfOnlyOneAvailable: boolean;
      preselectPublicNetworks: boolean;
      showUserData: boolean;
      localComputeStorageEnabled: boolean;
      hideVolumeSelectionForFlavorsWithDisk: boolean
      defaultVolumeType: {} | null
    },
    refreshIntervals: {
      defaultInterval: number,
      clientDetailsInterval?: number;
      operationsInProgressInterval?: number;
      operationsListInterval?: number;
      operationDetailsInterval?: number;
      reportDetailsInterval?: number;
      routerDetailsInterval?: number;
      volumeDetailsBackupsInterval: number;
      volumeDetailsSnapshotsInterval: number;
    }
    logoutRedirect: null | string;
    usernameInputLabel: null | string;
    tinyMCEOptions?: object;
  };
}
