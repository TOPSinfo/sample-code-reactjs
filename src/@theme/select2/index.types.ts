import { UIBaseFormProps } from "../base.input";

export interface UIReactSelect2Props
  extends UIReactSelect2StyleProps,
  UIBaseFormProps {
  placeholder?: string;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  isSearchable?: boolean;
  className?: string;
  required?: boolean;
  multiple?: boolean;
  options: UIReactSelect2OptionProps[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  isIcon?: boolean;
  menuShouldBlockScroll?: boolean;
  menuPortalTarget?: any;
  styles?: any;
  manuOpen?: boolean;
}
interface UIReactSelect2OptionProps {
  value: string;
  label: string;
}

export interface UIReactSelect2StyleProps {
  hasError?: boolean;
  errorText?: string;
}
