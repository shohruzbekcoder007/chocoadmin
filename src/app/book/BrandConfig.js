import { lazy } from 'react';

const Book = lazy(() => import('./'));

const BookConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'book',
            element: <Book/>,
        }
    ]
}

export default BookConfig;