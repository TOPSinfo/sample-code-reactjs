import { UIBaseFormProps } from "../base.input";

export interface UIRadioProps extends UIRadioStyleTypeProps, UIBaseFormProps {
  label: string;
  placeholder?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  isChecked?: boolean;
  position?: "before" | "after";
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
}
export interface UIRadioStyleTypeProps {
  size?: "sm" | "md" | "lg";
  hasError?: boolean;
}
