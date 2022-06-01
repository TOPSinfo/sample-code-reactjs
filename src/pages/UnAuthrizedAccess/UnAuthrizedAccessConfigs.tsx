import React from "react";

export const UnAuthrizedAccessConfigs = {
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
      path: "/403",
      component: React.lazy(() => import("./UnAuthrizedAccess"))
    }
  ]
};
