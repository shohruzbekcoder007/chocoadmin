import { authRoles } from "../auth";
import Size from "./Size";

const SizeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'size',
      element: <Size />,
    },
  ],
};

export default SizeConfig;