import styled, { css } from "styled-components";
import { UIDatePickerStyleTypeProps } from "./index.types";
import DatePicker from "react-datepicker";

const CommonCss = css`
  &[plceholder] {
    color: #8a9fba;
    ::-webkit-input-placeholder {
      @content;
    }
    :-moz-placeholder {
      @content;
    }
    ::-moz-placeholder {
      @content;
    }
    :-ms-input-placeholder {
      @content;
    }
  }
`;
export const UIDatePickerStyle = styled.div<UIDatePickerStyleTypeProps>`
  ${CommonCss}
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    color: #283747;
    margin-bottom: 5px;
    /* margin: 0 0 5px 0; */
    /* display: block; */
  }
  input {
    width: 100%;
  }
  &
    .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item:hover,
  &
    .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected,
  &
    .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    padding: 10px 10px !important;
  }
  & .react-datepicker-wrapper {
    display: block;
  }
  & .react-datepicker__input-container {
    margin-bottom: 20px;
  }
  & .calendar-icon {
    position: absolute;
    right: 10px;
    top: 28px;
  }
  & .indicatorSeparator {
    margin-bottom: 0;
    margin-top: 0;
    width: 1px;
    position: absolute;
    right: 34px;
    height: 38px;
    padding: 0;
    background-color: #cccccc;
    top: 20px;
  }
  .react-datepicker-popper
    .react-datepicker--time-only
    .react-datepicker__triangle {
    left: 35px !important;
  }
  & .wrapperClassName {
    border: solid 1px #e9ecef;
    border-radius: 2px;
    & .react-datepicker__input-container {
      margin-bottom: 0;
      line-height: 36px;
    }
    & .time-picker {
      background: transparent;
      padding: 0 0.75rem;
      font-size: 14px;
    }
  }
  .date-time-box {
    position: relative;
    input {
      border: none;
    }
    span {
      position: absolute;
      top: 1px;
      right: 1px;
      color: #8a9fba;
      font-size: 19px;
      cursor: pointer;
      width: 41px;
      height: calc(
        100% -
          ${(props: UIDatePickerStyleTypeProps) =>
            !(props.hasError || props.hasSuccess) ? "2px" : "19px"}
      );
      display: flex;
      align-items: center;
      background: #fbfbfc;
      justify-content: center;
      border-left: 1px solid #e9ecef;

      &::before {
        transform: none !important;
      }
    }
  }

  ${(props: UIDatePickerStyleTypeProps) =>
    props.hasError &&
    `
    input, .react-datepicker-wrapper {
        border-color: #eb4b4b !important;
        color: #eb4b4b !important;
    }
    label {
      color: #eb4b4b !important;
    }
    .error-text {
      margin-top: 5px;
      text-align: right;
    }
    `}
  ${(props: UIDatePickerStyleTypeProps) =>
    props.hasSuccess &&
    `
    .error-text {
      margin-top: 5px;
      text-align: right;
    }
    `}
`;
export const UIInputTypeWithIconStyle = styled(DatePicker)`
  display: flex;
  align-items: center;
  border: solid 1px #e9ecef;
  border-radius: 4px;
  input {
    flex: 1;
    border: none;
    height: 38px;
  }
  span {
    font-size: 20px;
    color: #8a9fba;
    padding: 9px 10px;
    border-left: 1px solid #e9ecef;
    cursor: pointer;
  }
  span:before {
    transform: inherit !important;
  }
`;
