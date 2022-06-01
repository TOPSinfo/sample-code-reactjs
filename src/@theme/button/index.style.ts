import styled from "styled-components";
import { UIButtonStyleType } from "./index.types";

export const UIButtonStyle = styled.button<UIButtonStyleType>`
  min-width: 127px;
  height: 40px;
  margin: 0 5px;
  padding: 12px 12px;
  border-radius: 4px;
  background-color: #0057e4;
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: 600;
  span {
    line-height: normal;
    font-family: Roboto;
  }

  ${(props: UIButtonStyleType) => props.size === "md" && ``}

  ${(props: UIButtonStyleType) =>
    props.size === "sm" && `font-size: 12px; min-width:80px`}

  ${(props: UIButtonStyleType) => props.size === "lg" && `font-size: 20px;`}
  
  ${(props: UIButtonStyleType) => props.minWidth && `font-size: 20px;`}
  
  ${(props: UIButtonStyleType) => props.paddingWidth && `font-size: 20px;`}

  ${(props: UIButtonStyleType) =>
    props.border &&
    `border: 1px solid #0057e4; background:none; color:#0057e4;`}

  ${(props: UIButtonStyleType) =>
    props.disabled &&
    `padding: 12px 0; border-radius: 4px; background-color: #e8ecf1; height: 40px; color:#8a9fba; border:none;`}
  
  ${(props: UIButtonStyleType) =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`}
  ${(props: UIButtonStyleType) =>
    props.fontColor &&
    `
    span {
      color: ${props.fontColor}
    }`}

  ${(props: UIButtonStyleType) =>
    props.radius && `border-radius: ${props.radius}px;`}
`;
