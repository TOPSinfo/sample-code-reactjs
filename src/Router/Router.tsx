import React, { useContext } from "react";
import AppContext from "context/AppContext";
import { renderRoutes } from "react-router-config";

const Router = () => {
  const { routes } = useContext(AppContext);
  return renderRoutes(routes);
};

export default React.memo(Router);
