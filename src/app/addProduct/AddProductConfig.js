import TaskForm from '../tasks/task/TaskForm';

const AddProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'addproduct',
      element: <TaskForm />,
    },
  ],
};

export default AddProductConfig;
