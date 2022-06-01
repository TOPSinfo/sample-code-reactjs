import { UIBaseFormProps } from "../base.input";

export interface UISelectProps extends UISelectTypeStyleProps, UIBaseFormProps {
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  multiple?: boolean;
  options: any[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export interface UISelectTypeStyleProps {
  hasError?: boolean;
}
