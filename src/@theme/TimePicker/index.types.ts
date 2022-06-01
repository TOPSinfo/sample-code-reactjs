import { UIBaseFormProps } from "../base.input";
import * as React from "react";

export interface UIDatePickerProps
  extends UIDatePickerStyleTypeProps,
    UIBaseFormProps {
  placeholder?: string;
  id?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  timeIntervals?: number;
  popperClassName?: string;
  wrapperClassName?: string;
  name?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  minTime?: Date;
  maxTime?: Date;
  required?: boolean;
  inputIcon?: string;
  position?: "before" | "after";
  onBlur?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onCalendarClose?(): void;
  onCalendarOpen?(): void;
  onChange?: any;
  labelWithIcon?: boolean;
  iconSvg?: any;
  timeFormat?: string;
  onClickOutside?: (e: any) => void;
}
export interface UIDatePickerStyleTypeProps {
  hasError?: boolean;
  successText?: string;
  hasSuccess?: boolean;
  errorText?: string;
}
