import { lazy } from 'react';

const Advertisement = lazy(() => import('./Advertisement'));

const AdvertisementConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'advertisement',
            element: <Advertisement />,
        }
    ]
}

export default AdvertisementConfig;