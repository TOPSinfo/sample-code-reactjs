import React, { FunctionComponent } from "react";
import { Header } from "components";

export const WithHeader: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
