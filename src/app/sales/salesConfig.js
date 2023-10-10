import Sales from "./Sales";

const SalesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'sales',
      element: <Sales />,
    },
  ],
};

export default SalesConfig;