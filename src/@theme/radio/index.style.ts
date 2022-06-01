import styled from "styled-components";
import { UIRadioStyleTypeProps } from "./index.types";

export const UIRadioWrapperStyle = styled.div<UIRadioStyleTypeProps>`
  position: relative;
  display: inline-block;
  margin-right: 20px;
  input[type="radio"]:disabled {
    cursor: not-allowed;
  }
  input[type="radio"]:disabled + label {
    &:after {
      background: #8a9fba;
    }
    &:before {
      border-color: #8a9fba;
    }
  }

  ${(props: UIRadioStyleTypeProps) =>
    props.hasError &&
    ` input+label:before {
      border: 2px solid #eb4b4b !important;
    }`}
  ${(props: UIRadioStyleTypeProps) => props.size === "sm" && ` font-size: 12;`}
  ${(props: UIRadioStyleTypeProps) => props.size === "md" && ` font-size: 12;`}
  ${(props: UIRadioStyleTypeProps) => props.size === "lg" && ` font-size: 12;`}
`;

export const UIRadioInputStyle = styled.input<UIRadioStyleTypeProps>`
  &:checked,
  &:not(:checked) {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1;
    opacity: 0;
    height: 100%;
  }
  &:checked + label,
  &:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
    font-family: Roboto;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  &:checked + label:before,
  &:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #8a9fba;
    border-radius: 100%;
    background: #fff;
    box-sizing: border-box;
  }
  &:checked + label:before {
    border-color: #0057e4;
  }
  &:checked + label:after,
  &:not(:checked) + label:after {
    content: "";
    width: 10px;
    height: 10px;
    background: #0057e4;
    position: absolute;
    top: 5px;
    left: 5px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  &:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  &:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;
