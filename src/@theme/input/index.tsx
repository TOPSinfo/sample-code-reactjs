import React, { useState, useEffect } from "react";
import {
  UIInputTypeStyle,
  UIInputTypeLabel,
  UIInputTypeWithIconStyle,
  UIInputTypeWithInfoIconStyle,
  PreTagInputWrapper,
  UIInputCountStyle,
  UIInputErrorBlock
} from "./index.style";
import { UIInputTypeProps } from "./index.types";
import UIErrorBlock from "../errorbox";
import { TooltipV2 } from "components";
import { toast } from "react-toastify";

export const UIInput: React.FC<UIInputTypeProps> = ({
  id,
  name,
  type,
  disabled,
  required,
  label,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  hasError,
  hasSuccess,
  errorText,
  successText,
  marginLeft,
  showCount,
  isClickable = false,
  value,
  maxLength,
  inputIcon,
  inputInfoIcon,
  inputInfoIconClick,
  position = "after",
  className,
  preTag,
  inputCopyIcon,
  min,
  max,
  infoText,
  inputIconClickable,
  inputIconColor
}) => {
  const [textCount, setTextCount] = useState(0);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && event.target.value.length > maxLength) {
      return;
    }
    if (onChange) {
      onChange(event);
    }
    setTextCount(event.target.value.length);
  };

  useEffect(() => {
    if (value && value.length && maxLength) setTextCount(value.length);
  }, [value, maxLength]);

  const toastCopy = () =>
    toast.success("URL copied to clipboard", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  return (
    <UIInputTypeStyle
      className='form-component text-box'
      hasError={hasError}
      hasSuccess={hasSuccess}
      isClickable={isClickable}
      onClick={() => (isClickable ? window.open(value) : null)}
    >
      <UIInputTypeLabel>
        <span>{label}</span>
        {required && <span>*</span>}
      </UIInputTypeLabel>
      {inputIcon ? (
        <UIInputTypeWithIconStyle>
          {position === "before" && <span className={inputIcon} />}
          <input
            placeholder={placeholder}
            id={id}
            name={name}
            value={value}
            onChange={onTextChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            maxLength={maxLength}
            required={required}
            type={type}
            className={className}
            min={min}
            max={max}
            autoComplete='off'
          />
          {position === "after" && (
            <span
              className={inputIcon}
              onClick={() => (onFocus ? onFocus() : null)}
            />
          )}
        </UIInputTypeWithIconStyle>
      ) : (
        <UIInputTypeWithInfoIconStyle
          inputInfoIcon={inputInfoIcon}
          inputIconClickable={inputIconClickable}
          inputIconColor={inputIconColor}
        >
          {preTag ? (
            <PreTagInputWrapper className={"d-flex"}>
              <span className={"input-pre-tag"}>{preTag}</span>
              <input
                placeholder={placeholder}
                id={id}
                name={name}
                value={value}
                onChange={showCount ? onTextChange : onChange}
                disabled={disabled}
                maxLength={maxLength}
                required={required}
                type={type}
                onBlur={onBlur}
                onFocus={onFocus}
                className={className}
                autoComplete='off'
              />
            </PreTagInputWrapper>
          ) : (
            <input
              placeholder={placeholder}
              id={id}
              name={name}
              value={value}
              onChange={showCount ? onTextChange : onChange}
              disabled={disabled}
              maxLength={maxLength}
              required={required}
              type={type}
              onBlur={onBlur}
              onFocus={onFocus}
              className={className}
              autoComplete='off'
            />
          )}
          {inputInfoIcon && (
            <i className={inputInfoIcon} onClick={inputInfoIconClick} />
          )}
          {inputCopyIcon && (
            <TooltipV2 infoText={infoText || "copy to clipboard"}>
              <i
                className={`${inputCopyIcon} copy-icon`}
                onClick={(e) => {
                  toastCopy();
                  inputInfoIconClick && inputInfoIconClick(e);
                }}
              />
            </TooltipV2>
          )}
        </UIInputTypeWithInfoIconStyle>
      )}
      <UIInputErrorBlock
        hasError={hasError || hasSuccess}
        showCount={showCount}
      >
        {(hasError || successText || hasSuccess) && (
          <UIErrorBlock
            marginLeft={marginLeft}
            isSuccessText={!!successText}
            errorText={successText || errorText || `${name} is required.`}
          />
        )}
        {showCount && (
          <UIInputCountStyle className='text-count'>
            <span>{maxLength ? textCount : 0}</span>/
            <span>{maxLength || 0}</span>
          </UIInputCountStyle>
        )}
      </UIInputErrorBlock>
    </UIInputTypeStyle>
  );
};
export default UIInput;
