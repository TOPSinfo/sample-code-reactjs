import React from "react";
import { UIInputTypeStyle } from "./index.style";
import { UILabelProps } from "./index.types";
import * as classNames from "classnames";

export const UILabel: React.FC<UILabelProps> = ({
  className,
  value,
  alignment
}) => {
  return (
    <UIInputTypeStyle className='custom-label center'>
      <label className={classNames({ className, alignment })}>{value}</label>
    </UIInputTypeStyle>
  );
};
export default UILabel;
