import React from "react";
import { authRoles } from "modules/utils/RouteAuth";

export const AccountConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  isPrivate: true,
  auth: authRoles.admin,
  routes: [
    {
      path: "/account",
      component: React.lazy(() => import("./index"))
    }
  ]
};
