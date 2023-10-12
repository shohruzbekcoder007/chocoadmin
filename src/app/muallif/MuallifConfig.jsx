import { lazy } from 'react';

const Muallif = lazy(() => import('./Muallif'));

const MuallifConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'muallif',
            element: <Muallif/>,
        }
    ]
}

export default MuallifConfig;