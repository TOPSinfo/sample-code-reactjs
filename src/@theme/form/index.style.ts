import styled from "styled-components";
import { UIFormGroupStyleType } from "./index.types";

export const UIFormGroupStyle = styled.form<UIFormGroupStyleType>`
  font-size: 12px;
  .modal-btn-m0 {
    button {
      margin: 0;
    }
  }
  .modal-btn-full {
    button {
      width: 100%;
    }
  }
  .modal-footer-multi-btn {
    width: 100%;
    text-align: right;
    button:first-child {
      float: left;
    }
  }

  .contacts-lists li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .contacts-lists li .name {
    font-size: 14px;
    color: #283747;
    margin-right: 10px;
  }
  .contacts-lists li .icon-ic-open-grey {
    margin-right: 24px;
  }
  .contacts-lists li .icon-ic-open-grey:before {
    color: #0057e4;
    font-size: 14px;
    cursor: pointer;
  }
  .contacts-lists li .icon-ic-close-black:before {
    color: #8a9fba;
    font-size: 14px;
    cursor: pointer;
  }
  .css-*-indicatorSeparator {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    .modal-footer-multi-btn button:last-child {
      margin-top: 10px;
    }
  }
  ${(props: UIFormGroupStyleType) =>
    props.formDisabled && ` pointer-event: none; `}
  .loading-spinner {
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
