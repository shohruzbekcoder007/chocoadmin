import themesConfig from 'app/configs/themesConfig';
import i18n from '../../i18n';
import { authRoles } from '../auth';

const settingsConfig = {
  layout: {
    style: 'layout1',
    config: {},
  },
  customScrollbars: true,
  direction: i18n.dir(i18n.options.lng) || 'ltr',
  theme: {
    main: themesConfig.default,
    navbar: themesConfig.defaultDark,
    toolbar: themesConfig.default,
    footer: themesConfig.defaultDark,
  },
  defaultAuth: authRoles.admin,
  loginRedirectUrl: '/',
};

export default settingsConfig;
