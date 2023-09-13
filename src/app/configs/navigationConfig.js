import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    subtitle: 'Unique dashboard designs',
    type: 'item',
    icon: 'heroicons-outline:home',
    translate: 'DASHBOARDS',
    children: [
      {
        id: 'dashboards.project',
        title: 'Project',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/dashboards/project',
      },
      {
        id: 'dashboards.analytics',
        title: 'Analytics',
        type: 'item',
        icon: 'heroicons-outline:chart-pie',
        url: '/dashboards/analytics',
      },
      {
        id: 'dashboards.finance',
        title: 'Finance',
        type: 'item',
        icon: 'heroicons-outline:cash',
        url: '/dashboards/finance',
      },
      {
        id: 'dashboards.crypto',
        title: 'Crypto',
        type: 'item',
        icon: 'heroicons-outline:currency-dollar',
        url: '/dashboards/crypto',
      },
    ],
  },
  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'example',
    auth: "admin"
  },
];

export default navigationConfig;
