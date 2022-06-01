import React from "react";

export const LoginConfig = {
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
      path: "/login",
      component: React.lazy(() => import("./Login"))
    }
  ]
};
