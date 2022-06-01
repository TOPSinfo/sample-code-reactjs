import styled from "styled-components";
import { UICheckboxStyleProps } from "./index.types";

export const UICheckboxWrapperStyle = styled.div<UICheckboxStyleProps>`
  position: relative;
  display: inline-block;
  ${(props: UICheckboxStyleProps) =>
    props.hasError &&
    `
    input+label:before {
      border: 2px solid #eb4b4b !important;
    }
    label {
      color: #eb4b4b !important;
    ]
  `}
  ${(props: UICheckboxStyleProps) =>
    props.size === "sm" &&
    `
    /* 
    Please modify this css.
    */
    color: #eb4b4b !important;
  `};
  ${(props: UICheckboxStyleProps) =>
    props.size === "md" &&
    `
    /* 
    Please modify this css.
    */
    color: #eb4b4b !important;
  `};
  ${(props: UICheckboxStyleProps) =>
    props.size === "lg" &&
    `
    /* 
    Please modify this css.
    */
    color: #eb4b4b !important;
  `};
`;

export const UICheckboxInputStyle = styled.input<UICheckboxStyleProps>`
  position: absolute;
  opacity: 0;
  z-index: 1;
  width: ${({ isWidth }) => (isWidth ? "20px" : "100%")} !important;
  height: 100%;
  ${(props) => props.requiredChange && `width:100% !important`}
  &:checked + label:before {
    background: #ffffff;
    border: 2px solid #0057e4;
    border-radius: 4px;
    flex: none;
  }
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }
  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }
  &:checked + label:after {
    content: "";
    position: absolute;
    left: 5px;
    top: calc(50% - 1px) !important;
    background: #0057e4;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #0057e4, 4px 0 0 #0057e4, 4px -2px 0 #0057e4,
      4px -4px 0 #0057e4, 4px -6px 0 #0057e4, 4px -8px 0 #0057e4;
    transform: rotate(45deg);
  }
`;
export const UICheckboxLabelStyle = styled.label<UICheckboxStyleProps>`
  position: relative;
  cursor: pointer;
  padding: 0;
  color: #283747;
  font-size: 14px;
  font-family: Roboto;
  display: flex;
  align-items: center;
  &:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 2px solid #8a9fba;
    border-radius: 4px;
    box-sizing: border-box;
    flex: none;
  }
`;
