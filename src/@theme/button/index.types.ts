import React from "react";
import { UIBaseFormProps } from "../base.input";
export interface UIButtonProps extends UIButtonStyleType, UIBaseFormProps {
  label: string;
  icon?: string;
  type?: "submit" | "reset" | "button";
  iconPoisition?: "before" | "after";
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}
export interface UIButtonStyleType {
  disabled?: boolean;
  border?: boolean;
  radius?: number;
  backgroundColor?: string;
  minWidth?: string;
  paddingWidth?: string;
  fontColor?: string;
  size?: "sm" | "md" | "lg";
}
