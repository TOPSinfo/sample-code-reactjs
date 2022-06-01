import React, { useState, useEffect } from "react";
import {
  UITextAreaWrapperStyle,
  UITextAreaStyle,
  UITextareaCoutErrorBlock,
  UITextAreaTextCountStyle
} from "./index.style";
import { UITextAreaaProps } from "./index.types";
import UIErrorBlock from "../errorbox";

export const UITextArea: React.FC<UITextAreaaProps> = ({
  id,
  name,
  disabled,
  required,
  placeholder,
  onChange,
  maxLength,
  showCount,
  errorText,
  hasError,
  className,
  label,
  rows,
  cols,
  value,
  onKeyup,
  onBlur
}) => {
  const [textCount, setTextCount] = useState(0);

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event);
    }
    setTextCount(event.target.value.length);
  };

  useEffect(() => {
    if (value && value.length && maxLength) setTextCount(value.length);
  }, [value, maxLength]);
  return (
    <UITextAreaWrapperStyle
      className='form-component custome-textarea'
      hasError={hasError}
    >
      <label>
        <span>{label}</span>
        {required && <span>*</span>}
      </label>
      <UITextAreaStyle
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onTextChange}
        id={id}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        name={name}
        className={className}
        value={value}
        onKeyUp={onKeyup}
        onBlur={onBlur}
      />
      <UITextareaCoutErrorBlock hasError={hasError} showCount={showCount}>
        {hasError && (
          <UIErrorBlock errorText={errorText || `${name} is required.`} />
        )}
        {showCount && (
          <UITextAreaTextCountStyle className='text-count'>
            <span>{maxLength ? textCount : 0}</span>/
            <span>{maxLength || 0}</span>
          </UITextAreaTextCountStyle>
        )}
      </UITextareaCoutErrorBlock>
    </UITextAreaWrapperStyle>
  );
};
export default UITextArea;
