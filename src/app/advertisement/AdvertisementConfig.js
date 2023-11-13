import { lazy } from 'react';
import { authRoles } from '../auth';

const Advertisement = lazy(() => import('./Advertisement'));

const AdvertisementConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: 'advertisement',
            element: <Advertisement />,
        }
    ]
}

export default AdvertisementConfig;