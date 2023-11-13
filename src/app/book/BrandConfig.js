import { lazy } from 'react';
import { authRoles } from '../auth';

const Book = lazy(() => import('./'));

const BookConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: 'book',
            element: <Book/>,
        }
    ]
}

export default BookConfig;