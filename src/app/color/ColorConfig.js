import { authRoles } from "../auth";
import Color from "./Color";

const ColorConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'color',
      element: <Color />,
    },
  ],
};

export default ColorConfig;