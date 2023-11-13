import { authRoles } from "../auth";
import Variant from "./Variant";

const VariantConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'variant',
      element: <Variant />,
    },
  ],
};

export default VariantConfig;