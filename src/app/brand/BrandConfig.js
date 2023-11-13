import { lazy } from 'react';
import { authRoles } from '../auth';

const Brand = lazy(() => import('./'));

const BrandConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: 'brand',
            element: <Brand />,
        }
    ]
}

export default BrandConfig;