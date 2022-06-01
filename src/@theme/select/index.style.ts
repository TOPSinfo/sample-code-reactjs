import styled from "styled-components";
import { UISelectTypeStyleProps } from "./index.types";

export const UISelectStyle = styled.div<UISelectTypeStyleProps>`
  border: solid 1px #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  &:before {
    content: "";
    width: 40px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: #fbfbfc;
    border-left: 1px solid #e9ecef;
    pointer-events: none;
  }
  &:after {
    content: "\\e905";
    font-family: "icomoon" !important;
    position: absolute;
    right: 7px;
    top: 8px;
    left: auto;
    font-size: 24px;
    color: #8a9fba;
    pointer-events: none;
  }
  select {
    width: 100%;
    height: 40px;
    color: #8a9fba;
    font-size: 14px;
    padding: 4px 12px;
    border: none;
    &:focus {
      border: none;
      box-shadow: none;
      outline: none;
    }
  }
  ${(props: UISelectTypeStyleProps) =>
    props.hasError &&
    `
        border-color: #eb4b4b !important;
        color: #eb4b4b !important;
    `}
`;
