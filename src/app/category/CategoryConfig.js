import { lazy } from 'react';

const CategoryList = lazy(() => import('./CategoryList'));

const CategoryConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'category',
            element: <CategoryList />,
        }
    ]
}

export default CategoryConfig;