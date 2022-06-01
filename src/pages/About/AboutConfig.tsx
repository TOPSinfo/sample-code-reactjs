import React from "react";
import { authRoles } from "modules/utils/RouteAuth";

export const AboutConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  isPrivate: true,
  auth: authRoles.admin,
  routes: [
    {
      path: "/about",
      component: React.lazy(() => import("./index"))
    }
  ]
};
