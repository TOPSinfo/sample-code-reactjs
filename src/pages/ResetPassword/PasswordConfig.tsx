import React from "react";

export const ResetPasswordConfig = {
  settings: {
    layout: {
      config: {
        header: { display: false },
        footer: { display: false },
        navbar: { display: false }
      }
    }
  },
  routes: [
    {
      path: "/forgot-password",
      component: React.lazy(() => import("./ResetPassword"))
    },
    {
      path: "/update-password",
      component: React.lazy(() => import("./UpdatePassword"))
    }
  ]
};
