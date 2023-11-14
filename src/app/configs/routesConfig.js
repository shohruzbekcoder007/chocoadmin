import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
// import ExampleConfig from '../main/example/ExampleConfig';
import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import invoicePagesConfig from '../invoice/invoicePagesConfig';
import CategoryConfig from '../category/CategoryConfig';
import BrandConfig from '../brand/BrandConfig';
import BookConfig from '../book/BrandConfig';
import TasksAppConfig from '../tasks/TasksAppConfig';
import SizeConfig from '../size/SizeConfig';
import ColorConfig from '../color/ColorConfig';
import ProfuctImageConfig from '../profuctImage/profuctImageConfig';
import AddProductConfig from '../addProduct/AddProductConfig';
import SalesConfig from '../sales/salesConfig';
import MuallifConfig from '../muallif/MuallifConfig';
import VariantConfig from '../variant/VariantConfig';
import OrederConfig from '../order/OrderConfig';
import AdvertisementConfig from '../advertisement/AdvertisementConfig';
import { authRoles } from '../auth';
import MainPageAllUsers from '../MainPageAllUsers';
// import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';

const ExampleConfig = {
  settings: {
      layout: {},
  },
  auth: authRoles.onlyGuest,
  routes: [
      {
          path: '/',
          element: <MainPageAllUsers/>,
      }
  ]
}

const ExampleConfigA = {
  settings: {
      layout: {},
  },
  auth: authRoles.admin,
  routes: [
      {
          path: '/',
          element: <MainPageAllUsers/>,
      }
  ]
}

const ExampleConfigU = {
  settings: {
      layout: {},
  },
  auth: authRoles.user,
  routes: [
      {
          path: '/',
          element: <MainPageAllUsers/>,
      }
  ]
}

const ExampleConfigS = {
  settings: {
      layout: {},
  },
  auth: authRoles.staff,
  routes: [
      {
          path: '/',
          element: <MainPageAllUsers/>,
      }
  ]
}

const routeConfigs = [
  // ...dashboardsConfigs,
  // ...authRoleExamplesConfigs,
  // ExampleConfig,
  // invoicePagesConfig,
  ExampleConfig,
  ExampleConfigU,
  ExampleConfigA,
  ExampleConfigS,
  CategoryConfig,
  BrandConfig,
  BookConfig,
  SignOutConfig, 
  SignInConfig, 
  SignUpConfig,
  TasksAppConfig,
  SizeConfig,
  ColorConfig,
  ProfuctImageConfig,
  AddProductConfig,
  SalesConfig,
  MuallifConfig,
  VariantConfig,
  OrederConfig,
  AdvertisementConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <MainPageAllUsers/>,
    // auth: settingsConfig.defaultAuth,
  },
  {
    path: '/category',
    element: <Navigate to="/category" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
