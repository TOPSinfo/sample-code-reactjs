import styled from "styled-components";
import { UIReactSelect2StyleProps } from "./index.types";

export const UIReactSelect2Label = styled.label<UIReactSelect2StyleProps>`
  font-size: 14px;
  color: #283747;
  margin-bottom: 5px;
  ${(props: UIReactSelect2StyleProps) =>
    props.hasError &&
    `
        border-color: #eb4b4b !important;
        color: #eb4b4b !important;
        span {
          color: #eb4b4b !important;          
        }
    `}
`;
export const CustomTimezone = styled.div<UIReactSelect2StyleProps>`
  ${(props: UIReactSelect2StyleProps) =>
    props.hasError &&
    `
    .error-text {
      margin-top: 5px;
    }
    div {
      div {
        border-color: #eb4b4b !important;
      }
    }
    `}
`;
