import styled from "styled-components";
import { UIUploadFileTypeStyleProps } from "./index.types";

export const UIFileUploadWrapperStyle = styled.div<UIUploadFileTypeStyleProps>`
  position: relative;
  .browse-close {
    position: relative;
    .dropzone {
      height: 40px;
      padding: 10px 40px 10px 10px;
      border-radius: 4px;
      border: dashed 1px #e9ecef;
      background-color: #fbfbfc;
      font-family: Roboto;
      font-size: 14px;
      line-height: normal;
      color: #8a9fba;
      display: flex;
      &:focus {
        outline: none;
      }
      &:hover {
        border-color: #0057e4;
      }
      span.icon-ic-upload-grey {
        font-size: 20px;
        margin-right: 10px;
        margin-left: 7px;
      }
    }
    .icon-ic-close-black {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      color: #8a9fba;
      font-size: 19px;
      cursor: pointer;
    }
  }
  .icon-ic-upload-grey {
  }
  ${(props: UIUploadFileTypeStyleProps) =>
    props.hasStaticText &&
    `
    .error-text {
      color: #8a9fba !important;
    }
    .browse-close + div {
      margin-top: 5px;
    }
   `}
  ${(props: UIUploadFileTypeStyleProps) =>
    props.hasError &&
    `
    .dropzone {
        border: dashed 1px #eb4b4b !important;
    }
    input {
        border-color: #eb4b4b !important;
        color: #eb4b4b !important;
    }
    label {
      color: #eb4b4b !important;
    }
    .browse-close + div {
      margin-top: 5px;
    }
    .error-text {
      color: #eb4b4b !important;
    }
    `}
`;
