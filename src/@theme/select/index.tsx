import React from "react";
import { UISelectStyle } from "./index.style";
import { UISelectProps } from "./index.types";

export const UISelect: React.FC<UISelectProps> = ({
  id,
  name,
  disabled,
  required,
  placeholder,
  onChange,
  hasError,
  multiple,
  options,
  className
}) => {
  return (
    <UISelectStyle className='form-component custom-select' hasError={hasError}>
      <select
        placeholder={placeholder}
        id={id}
        multiple={multiple}
        disabled={disabled}
        required={required}
        onChange={onChange}
        name={name}
        className={className}
      >
        {options.map((option: string, index: number) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </UISelectStyle>
  );
};
export default UISelect;
