import { lazy } from 'react';
import TaskForm from './task/TaskForm';
import TaskFormUpdate from './task/TaskFormUpdate';
import { authRoles } from '../auth';

const TasksApp = lazy(() => import('./TasksApp'));

const TasksAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: 'tasks',
      element: <TasksApp />,
      children: [
        {
          path: 'task',
          element: <TaskForm />,
        },
        {
          path: ':id/task',
          element: <TaskForm />,
        },
        {
          path: ':id/section',
          element: <TaskFormUpdate/>,
        },
      ],
    },
  ],
};

export default TasksAppConfig;
