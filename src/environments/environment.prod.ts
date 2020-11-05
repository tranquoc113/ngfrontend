export const environment = {
  production: true,
  basePanel: 'staff',
  panels: {
    staff: {
      configFile: 'staff.config.json'
    },
    reseller: {
      configFile: 'reseller.config.json'
    }
  },
  enableErrorLogging: true
};
