import { lazy } from 'react';
import { authRoles } from '../auth';

const Muallif = lazy(() => import('./Muallif'));

const MuallifConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.staff,
    routes: [
        {
            path: 'muallif',
            element: <Muallif/>,
        }
    ]
}

export default MuallifConfig;