import { lazy } from 'react';
import { authRoles } from '../auth';

const Brand = lazy(() => import('./'));

const BrandConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.staff,
    routes: [
        {
            path: 'brand',
            element: <Brand />,
        }
    ]
}

export default BrandConfig;