import React from "react";
import { UIHeaderTagsStyle } from "./index.header.tags.style";
import { UIHeaderTextProps } from "./index.types";

export const UIHeaderText: React.FC<UIHeaderTextProps> = ({
  typeOf,
  bold,
  text,
  margin,
  fontSize,
  color,
  className
}) => {
  return (
    <UIHeaderTagsStyle
      typeOf={typeOf}
      color={color}
      margin={margin}
      fontSize={fontSize}
      className={className}
      bold={bold}
    >
      {text}
    </UIHeaderTagsStyle>
  );
};
export default UIHeaderText;
