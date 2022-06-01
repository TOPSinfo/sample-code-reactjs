import React from "react";

export interface UIFormGroupProps
  extends UIFormGroupStyleType,
    React.FormHTMLAttributes<any> {
  id?: string;
  className?: string;
  onSubmit?: (event: React.FormEvent) => void;
  errorText?: string;
}
export interface UIFormGroupStyleType {
  formDisabled?: boolean;
}
