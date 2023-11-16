import { lazy } from 'react';
import { authRoles } from '../auth';

const CategoryList = lazy(() => import('./CategoryList'));

const CategoryConfig = {
    settings: {
        layout: {},
    },
    auth: "staff",
    routes: [
        {
            path: 'category',
            element: <CategoryList />,
        }
    ]
}

export default CategoryConfig;