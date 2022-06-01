import React from "react";
import { UIErrorStyle } from "./index.style";
import { UIErrorBlockType } from "./index.types";

export const UIErrorBlock: React.FC<UIErrorBlockType> = ({
  id,
  className,
  marginLeft,
  isSuccessText,
  isSuccessTextColor,
  errorText
}) => {
  return (
    <UIErrorStyle
      className={className + " error-text"}
      id={id}
      isSuccessText={isSuccessText}
      isSuccessTextColor={isSuccessTextColor}
      marginLeft={marginLeft}
    >
      {errorText}
    </UIErrorStyle>
  );
};
export default UIErrorBlock;
