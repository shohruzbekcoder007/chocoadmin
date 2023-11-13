import { authRoles } from "../auth";
import Sales from "./Sales";

const SalesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: 'sales',
      element: <Sales />,
    },
  ],
};

export default SalesConfig;