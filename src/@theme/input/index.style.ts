import styled, { css } from "styled-components";
import { UICoutProps, UIInputTypeStyleTypeProps } from "./index.types";

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
export const UIInputTypeLabel = styled.label<UIInputTypeStyleTypeProps>`
  font-size: 14px;
  color: #283747;
  margin-bottom: 5px !important;
`;
export const UIInputTypeStyle = styled.div<UIInputTypeStyleTypeProps>`
  ${CommonCss}
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    color: #283747;
    margin-bottom: 5px;
  }
  input {
    border-radius: 4px;
    border: solid 1px #e9ecef;
    background-color: #ffffff;
    padding: 0 10px;
    height: 40px;
    color: #283747 !important;
    font-size: 14px;
  }
  input:disabled {
    background: #e9ecef;
  }
  .border-none {
    background: #ffffff !important;
  }
  input[type="color"] {
    padding: 0px;
    margin: 0px;
    border: 0;
  }
  input[type="number"] {
    padding-right: 10px;
  }
  ${(props: UIInputTypeStyleTypeProps) =>
    props.isClickable &&
    `
      input { 
        cursor: pointer;
      }
      &:hover input { color: #0056b3 !important; }
    `};
  ${(props: UIInputTypeStyleTypeProps) =>
    props.hasError &&
    `
    input {
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
  ${(props: UIInputTypeStyleTypeProps) =>
    props.hasSuccess &&
    `
    input {
        border-color: green !important;
        color: #000 !important;
    }
    label {
      color: green !important;
    }
    .error-text {
      margin-top: 5px;
      text-align: right;
    }
    `}
`;
export const PreTagInputWrapper = styled.div<UIInputTypeStyleTypeProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .input-pre-tag {
    font-size: 14px;
  }
  input {
    margin-left: 0.5rem !important;
  }
`;

export const UIInputTypeWithInfoIconStyle = styled.div<UIInputTypeStyleTypeProps>`
  position: relative;
  input {
    width: 100%;
    ${(props) => props.inputInfoIcon && `padding-right: 45px;`}
  }
  i {
    position: absolute;
    color: ${({ inputIconColor }) => inputIconColor || "#eb4b4b"};
    font-size: 18px;
    right: 12px;
    top: 11px;
    cursor: ${({ inputIconClickable }) =>
      inputIconClickable ? "pointer" : "default"};
  }
  & .copy-icon {
    position: absolute;
    font-size: 18px;
    right: 12px;
    top: 11px;
    color: #000000;
    cursor: pointer;
  }
`;
export const UIInputTypeWithIconStyle = styled.div<UIInputTypeStyleTypeProps>`
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
export const UIInputCountStyle = styled.div<UIInputTypeStyleTypeProps>`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: #283747;
  margin-top: 5px;
`;
export const UIInputErrorBlock = styled.div<UICoutProps>`
  display: flex;
  justify-content: ${(props) =>
    props.hasError && props.showCount
      ? "space-between"
      : props.hasError
      ? "flex-start"
      : "flex-end"};
`;
