import React from "react";
import { UIButtonStyle } from "./index.style";
import { UIButtonProps } from "./index.types";

export const UIButton: React.FC<UIButtonProps> = ({
  label,
  border,
  disabled,
  onClick,
  type,
  radius,
  icon,
  paddingWidth,
  minWidth,
  size = "md",
  iconPoisition = "before",
  backgroundColor,
  fontColor,
  className
}) => {
  return (
    <UIButtonStyle
      border={border}
      className={className + " custom-button"}
      disabled={disabled}
      radius={radius}
      size={size}
      minWidth={minWidth}
      paddingWidth={paddingWidth}
      fontColor={fontColor}
      type={type || "button"}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {iconPoisition === "before" && icon && <i className={icon} />}
      {label && <span>{label}</span>}
      {iconPoisition === "after" && icon && <i className={icon} />}
    </UIButtonStyle>
  );
};
export default UIButton;
