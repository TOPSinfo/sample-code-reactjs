import React from "react";
import { UIBaseFormProps } from "../base.input";

export interface UITextAreaaProps
  extends UITextAreaTypeStyleProps,
  UICoutProps,
  UIBaseFormProps {
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  errorText?: string;
  required?: boolean;
  label?: string;
  maxLength?: number;
  showCount?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyup?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}
export interface UITextAreaTypeStyleProps {
  hasError?: boolean;
  rows?: number;
  cols?: number;
}
export interface UICoutProps extends UITextAreaTypeStyleProps {
  showCount?: boolean;
  maxLength?: number;
}
