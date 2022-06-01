import styled from "styled-components";
import { UIErrorStyleProps } from "./index.types";

export const UIErrorStyle = styled.div<UIErrorStyleProps>`
  color: #eb4b4b;
  font-size: 12px;
  ${(props: UIErrorStyleProps) =>
    props.marginLeft &&
    `
    margin-left: ${props.marginLeft}; 
  `}
  ${(props: UIErrorStyleProps) =>
    props.isSuccessText &&
    `
    color: ${props.isSuccessTextColor || "green"}; 
  `}
`;
