import React from "react";
import {
  UICheckboxWrapperStyle,
  UICheckboxInputStyle,
  UICheckboxLabelStyle
} from "./index.style";
import { UICheckboxProps } from "./index.types";

export const UICheckbox: React.FC<UICheckboxProps> = ({
  label,
  disabled,
  onChange,
  id,
  position = "after",
  required,
  name,
  hasError,
  className,
  size = "md",
  isChecked,
  requiredChange,
  isWidth
}) => {
  return (
    <UICheckboxWrapperStyle
      className='form-component custom-checkbox'
      hasError={hasError}
      size={size}
    >
      {position === "before" && label && (
        <UICheckboxLabelStyle>{label}</UICheckboxLabelStyle>
      )}
      <UICheckboxInputStyle
        id={id}
        name={name}
        disabled={disabled}
        onChange={onChange}
        type='checkbox'
        className={className}
        checked={isChecked}
        requiredChange={requiredChange}
        isWidth={isWidth}
      />
      {position === "after" && label && (
        <UICheckboxLabelStyle>
          {label} {required && <span>*</span>}
        </UICheckboxLabelStyle>
      )}
    </UICheckboxWrapperStyle>
  );
};
export default UICheckbox;
