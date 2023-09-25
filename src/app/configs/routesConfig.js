import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import ECommerceAppConfig from '../e-commerce/ECommerceAppConfig';
import invoicePagesConfig from '../invoice/invoicePagesConfig';
import CategoryConfig from '../category/CategoryConfig';
import BrandConfig from '../brand/BrandConfig';

const routeConfigs = [
  ...dashboardsConfigs,
  ExampleConfig,
  invoicePagesConfig,
  CategoryConfig,
  BrandConfig,
  SignOutConfig, 
  SignInConfig, 
  SignUpConfig,
  ECommerceAppConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="example" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: '/example',
    element: <Navigate to="/example" />,
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
