import { lazy } from 'react';

const CryptoDashboardApp = lazy(() => import('./CryptoDashboardApp'));

const CryptoDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboards/crypto',
      element: <CryptoDashboardApp />,
    },
  ],
};

export default CryptoDashboardAppConfig;
