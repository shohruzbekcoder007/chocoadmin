import { authRoles } from "../auth";
import Oreder from "./Oreder";

const OrederConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: 'oreder',
      element: <Oreder />,
    },
  ],
};

export default OrederConfig;