import { lazy } from 'react';

const Brand = lazy(() => import('./'));

const BrandConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'brand',
            element: <Brand />,
        }
    ]
}

export default BrandConfig;