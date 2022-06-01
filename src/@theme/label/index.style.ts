import styled from "styled-components";
import { UILabelStyleProps } from "./index.types";

export const UIInputTypeStyle = styled.div<UILabelStyleProps>`
  label {
    width: 381px;
    max-width: 100%;
    height: 36px;
    padding: 10px 10px 10px 15px;
    margin: 5px 0;
    background-color: #f2f6fd;
    color: #283747;
    font-size: 14px;
  }
`;
