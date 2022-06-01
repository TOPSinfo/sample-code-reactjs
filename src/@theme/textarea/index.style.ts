import styled from "styled-components";
import { UITextAreaTypeStyleProps, UICoutProps } from "./index.types";

export const UITextAreaWrapperStyle = styled.div<UITextAreaTypeStyleProps>`
  label {
    font-size: 14px;
    color: #283747;
    margin-bottom: 5px;
  }
  &textarea:disabled {
    background: #e9ecef;
  }
  textarea:disabled {
    background: #e9ecef;
  }
  ${(props: UITextAreaTypeStyleProps) =>
    props.hasError &&
    `
    textarea {
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
`;
export const UITextAreaTextCountStyle = styled.div<UITextAreaTypeStyleProps>`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: #283747;
  margin-top: 5px;
`;
export const UITextAreaStyle = styled.textarea<UITextAreaTypeStyleProps>`
  width: 100%;
  resize: none;
  font-size: 14px;
  padding: 13px 27px 13px 12px;
  border-radius: 4px;
  border: solid 1px #e9ecef;
  background-color: #ffffff;
  &:focus {
    outline: none;
  }
`;

export const UITextareaCoutErrorBlock = styled.div<UICoutProps>`
  display: flex;
  justify-content: ${(props) =>
    props.hasError && props.showCount
      ? "space-between"
      : props.hasError
      ? "flex-start"
      : "flex-end"};
`;
