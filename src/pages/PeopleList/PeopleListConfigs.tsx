import React from "react";
import { authRoles } from "../../modules/utils/RouteAuth";

export const PeopleListConfigs = {
  settings: {
    layout: {
      config: {
        header: { display: true },
        footer: { display: true },
        navbar: { display: true }
      }
    }
  },
  isPrivate: true,
  auth: authRoles.admin,
  routes: [
    {
      path: "/people",
      component: React.lazy(() => import("./index"))
    }
  ]
};
