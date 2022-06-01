import { UIBaseFormProps } from "../base.input";

export interface UICheckboxProps extends UICheckboxStyleProps, UIBaseFormProps {
  label: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  position?: "before" | "after";
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  addStyle?: boolean;
  requiredChange?: boolean;
}
export interface UICheckboxStyleProps {
  size?: "sm" | "md" | "lg";
  hasError?: boolean;
  requiredChange?: boolean;
  isWidth?: boolean;
}
