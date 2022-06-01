import styled from "styled-components";
import { UIHeaderTextStyleProps } from "./index.types";

export const UIHeaderTagsStyle = styled.div<UIHeaderTextStyleProps>`
  font-family: Roboto;
  color: ${(props: UIHeaderTextStyleProps) =>
    props.color ? `${props.color}` : "#333333"};
  ${(props: UIHeaderTextStyleProps) =>
    props.fontSize && `font-size: ${props.fontSize};`}
  ${(props: UIHeaderTextStyleProps) =>
    props.typeOf &&
    props.typeOf === "text-h1" &&
    `
    font-size: 22px;
    color: #283747;
    font-weight: normal;
    line-height: normal;
  `}
  ${(props: UIHeaderTextStyleProps) =>
    props.typeOf &&
    props.typeOf === "text-h2" &&
    `
    font-size: 20px;
    line-height: normal;
    font-weight: normal;
    color: #283747;
  `}
  ${(props: UIHeaderTextStyleProps) =>
    props.typeOf &&
    props.typeOf === "text-h3" &&
    `
    font-size: 18px;
    font-weight: normal;
    line-height: normal;
    color: #283747;
  `}
  ${(props: UIHeaderTextStyleProps) =>
    props.typeOf &&
    props.typeOf === "text-h4" &&
    `
    font-size: 16px;
    font-weight: normal;
    line-height: normal;
    color: #283747;
  `}
  ${(props: UIHeaderTextStyleProps) =>
    props.typeOf &&
    props.typeOf === "text-h5" &&
    `
    font-size: 14px;
    font-weight: 600 !important;
    line-height: normal;
    color: #283747;  
  `}
  ${(props: UIHeaderTextStyleProps) =>
    props.typeOf &&
    props.typeOf === "text-h6" &&
    `
    font-size: 12px;
    font-weight: normal;
    line-height: normal;
    color: #283747;
  `}
  ${(props: UIHeaderTextStyleProps) =>
    props.bold &&
    `
    font-weight: ${props.bold}
  `}
  ${(props: UIHeaderTextStyleProps) =>
    props.margin &&
    `
    margin: ${props.margin}
  `}
`;
