import React from "react";
import { authRoles } from "../../modules/utils/RouteAuth";

export const ChangePasswordConfig = {
  settings: {
    layout: {
      config: {
        header: { display: false },
        footer: { display: false },
        navbar: { display: false }
      }
    }
  },
  isPrivate: true,
  auth: authRoles.admin,
  routes: [
    {
      path: "/change-password",
      component: React.lazy(() => import("./ChangePassword"))
    }
  ]
};
