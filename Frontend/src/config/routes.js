// Layout...
import LayoutApp from "../layout/LayoutApp";

// Page...
import Tasks from "../pages/Tasks";

// Error...
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/",
    component: LayoutApp,
    exact: false,
    routes: [
      {
        path: "/",
        component: Tasks,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
