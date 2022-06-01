import React, { useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { UIDatePickerStyle, UIInputTypeWithIconStyle } from "./index.style";
import { UIDatePickerProps } from "./index.types";
import UIErrorBlock from "../errorbox";
import { UIInputErrorBlock } from "@theme/input/index.style";
export const Timepicker: React.FC<UIDatePickerProps> = ({
  id,
  name,
  disabled,
  required,
  label,
  dateFormat,
  showTimeSelect,
  showTimeSelectOnly,
  wrapperClassName,
  popperClassName,
  timeIntervals,
  placeholder,
  onChange,
  onFocus,
  onCalendarOpen,
  onCalendarClose,
  onBlur,
  successText,
  hasSuccess,
  hasError,
  errorText,
  value,
  minDate,
  minTime,
  maxDate,
  maxTime,
  inputIcon,
  position = "after",
  className,
  timeFormat,
  onClickOutside
}) => {
  const timePickerRef = useRef(null);
  return (
    <UIDatePickerStyle
      className={"form-component"}
      hasError={hasError}
      hasSuccess={hasSuccess}
    >
      <label className={"mb-1"}>
        <span>{label}</span>
      </label>
      <div className='date-time-box'>
        {position === "before" && <span className={inputIcon} />}
        <UIInputTypeWithIconStyle
          showTimeSelect={showTimeSelect}
          ref={timePickerRef}
          name={name}
          disabled={disabled}
          required={required}
          id={id}
          placeholderText={placeholder}
          showTimeSelectOnly={showTimeSelectOnly}
          selected={value ? moment(value).toDate() : null}
          timeIntervals={timeIntervals}
          onChange={onChange}
          onFocus={onFocus}
          onCalendarOpen={onCalendarOpen}
          onCalendarClose={onCalendarClose}
          onBlur={onBlur}
          maxDate={maxDate}
          minDate={minDate}
          minTime={minTime}
          maxTime={maxTime}
          dateFormat={dateFormat}
          className={"time-picker " + className}
          popperClassName={popperClassName || "picker"}
          wrapperClassName={wrapperClassName || "wrapperClassName"}
          timeFormat={timeFormat}
          onClickOutside={onClickOutside}
          autoComplete='off'
        />
        {position === "after" && (
          <span
            className={inputIcon}
            onClick={() => {
              if (timePickerRef && timePickerRef.current) {
                const timePicker: any = timePickerRef.current;
                timePicker.setOpen(true);
              }
            }}
          />
        )}

        {(hasError || successText || hasSuccess) && (
          <UIInputErrorBlock hasError={hasError || hasSuccess}>
            <UIErrorBlock
              isSuccessText={!!successText}
              isSuccessTextColor={"#0057e4"}
              errorText={successText || errorText || `${name} is required.`}
            />
          </UIInputErrorBlock>
        )}
      </div>
    </UIDatePickerStyle>
  );
};
export default Timepicker;
