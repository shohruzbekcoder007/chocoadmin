import { authRoles } from '../auth';
import TaskForm from '../tasks/task/TaskForm';

const AddProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'addproduct',
      element: <TaskForm />,
    },
  ],
};

export default AddProductConfig;
