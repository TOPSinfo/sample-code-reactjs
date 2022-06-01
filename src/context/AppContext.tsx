import React from "react";
import { INavigation } from "modules/types";
export interface StateContextType {
  routes: INavigation[];
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AppContext = React.createContext<StateContextType>(null!);

export default AppContext;
