import React from "react";
import { UIRadioWrapperStyle, UIRadioInputStyle } from "./index.style";
import { UIRadioProps } from "./index.types";

export const UIRadio: React.FC<UIRadioProps> = ({
  label,
  disabled,
  onChange,
  position = "after",
  required = false,
  id,
  name,
  hasError,
  size = "md",
  isChecked,
  className,
  value
}) => {
  return (
    <UIRadioWrapperStyle
      className='form-component radio-btn'
      size={size}
      hasError={hasError}
    >
      {position === "before" && label && <label>{label}</label>}
      <UIRadioInputStyle
        className={className}
        disabled={disabled}
        onChange={onChange}
        id={id}
        required={required}
        checked={isChecked}
        name={name}
        type='radio'
        value={value}
      />
      {position === "after" && label && (
        <label>
          {label} {required && <span>*</span>}
        </label>
      )}
    </UIRadioWrapperStyle>
  );
};
export default UIRadio;
