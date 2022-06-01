import { UIBaseFormProps } from "../base.input";

export interface UIInputTypeProps
  extends UIInputTypeStyleTypeProps,
    UICoutProps,
    UIBaseFormProps {
  placeholder?: string;
  id?: string;
  name?: string;
  type: string;
  disabled?: boolean;
  label?: string;
  marginLeft?: string;
  className?: string;
  required?: boolean;
  inputIcon?: string;
  inputInfoIconClick?: (event: any) => void;
  position?: "before" | "after";
  onBlur?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelWithIcon?: boolean;
  iconSvg?: any;
  preTag?: string;
  inputCopyIcon?: string;
  min?: number;
  max?: number;
  infoText?: string;
}
export interface UIInputTypeStyleTypeProps {
  inputInfoIcon?: string | false;
  isClickable?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  errorText?: string;
  successText?: string;
  inputIconClickable?: boolean;
  inputIconColor?: string;
}
export interface UICoutProps extends UIInputTypeStyleTypeProps {
  showCount?: boolean;
  maxLength?: number;
}
