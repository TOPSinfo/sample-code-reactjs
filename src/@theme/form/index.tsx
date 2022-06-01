import React from "react";
import { UIFormGroupStyle } from "./index.style";
import { UIFormGroupProps } from "./index.types";

export const UIFormGroup: React.FC<UIFormGroupProps> = (props) => {
  return <UIFormGroupStyle {...props}>{props.children}</UIFormGroupStyle>;
};
export default UIFormGroup;
