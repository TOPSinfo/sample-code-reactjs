import styled from "styled-components";
import {
  UIBodyWrapperProps,
  UIFooterWrapperProps,
  UIModalStyleProps
} from "./index.types";
import Modal from "react-bootstrap/Modal";

export const UITextAreaWrapperStyle = styled.div<UIModalStyleProps>``;
export const UITextAreaTextCountStyle = styled.div<UIModalStyleProps>`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: #283747;
  margin-top: 5px;
`;
export const UITextAreaStyle = styled.textarea<UIModalStyleProps>`
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  resize: none;
  font-size: 14px;
  padding: 13px 27px 13px 12px;
  border-radius: 4px;
  border: solid 1px #e9ecef;
  background-color: #ffffff;
  &:focus {
    outline: none;
  }
`;
export const BootstrapModalWrapper = styled.div<UIModalStyleProps>`
  ${(props: UIModalStyleProps) =>
    props.maxHeight &&
    `
  .modal-body-wrapper-scrollbar {
      max-height: ${props.maxHeight} !important;
      .ps__rail-y {
        opacity: 1;
      }
  }
  `}
  ${(props: UIModalStyleProps) =>
    props.minHeight &&
    `
  .modal-body-wrapper-scrollbar {
      min-height: ${props.minHeight} !important;
      & .ps__rail-x,
      & .ps__rail-y {
        opacity: 0.6 !important;
      }
  }
  `}
  ${(props: UIModalStyleProps) =>
    props.modalMinHeight &&
    `
    min-height: ${props.modalMinHeight} !important;
  `}
  ${(props: UIModalStyleProps) =>
    props.modalMinWidth &&
    `
      min-width: ${props.modalMinWidth} !important;
  `}
  ${(props: UIModalStyleProps) =>
    (props.modalMinHeight || props.modalMinWidth) &&
    `
    border-radius: 0.3rem;
    background-color: #ffffff;
  `}
`;
export const BootstrapModal = styled(Modal)`
  .modal-body-wrapper-scrollbar {
    max-height: calc(100vh - 300px);
    & .ps__rail-x,
    & .ps__rail-y {
      opacity: 0.6 !important;
    }
  }

  .button-group-footer {
    flex-direction: column;
    button {
      width: 100%;
    }
  }

  font-family: Roboto;
  h1,
  .text-h1 {
    color: #283747;
    font-size: 24px;
  }
  h2,
  .text-h2 {
    color: #283747;
    font-size: 22px;
  }
  h3 {
    color: #283747;
    font-size: 20px;
  }
  h4 {
    color: #283747;
    font-size: 18px;
  }
  h5 {
    color: #283747;
    font-size: 16px;
  }
  h6 {
    color: #283747;
    font-size: 14px;
  }
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .space-between {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0;
  }
  .space-around {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .space-end {
    justify-content: end;
  }
  .left {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .thoughts-modal {
    .tops-ui-labels {
      margin-bottom: 20px;
    }
    .radio-btn {
      width: 100%;
      margin-bottom: 20px;
      margin-right: 0px;
    }
  }
`;
export const BootstrapModalHeader = styled(Modal.Header)`
  padding: 19px 30px;
`;
export const BootstrapModalTitle = styled(Modal.Title)`
  font-size: 18px;
  font-weight: bold;
`;
export const BootstrapModalBody = styled(Modal.Body)`
  padding: 30px 30px 20px 30px;
  @media (max-width: 767px) {
    .modal-body {
      padding: 20px;
    }
    .apply-btn button {
      font-size: 13px;
      padding: 0 10px;
    }
  }
`;
export const BootstrapModalFooter = styled(Modal.Footer)`
  padding: 30px 28px;
  border-color: #e9ecef;
  button {
    margin: 0 20px 0 0 !important;
    &.no-extra-margin {
      margin: 0 5px !important;
    }
    @media (min-width: 500px) {
      &:last-child {
        margin: 0 !important;
      }
    }
    @media (max-width: 500px) {
      margin: 5px 20px 5px 5px !important;
    }
  }
  .modal-footer > * {
    margin: 0;
  }
`;
export const BootstrapModalWrapperFooter = styled.div<UIFooterWrapperProps>`
  ${(props: UIFooterWrapperProps) =>
    !props.hasFooterBorder &&
    `
    .modal-footer {
      border: none;
      padding-top: 0;
    }
  `}
`;
export const BootstrapModalWrapperBody = styled.div<UIBodyWrapperProps>`
  ${(props: UIBodyWrapperProps) =>
    props.customBodyPadding &&
    `
    .modal-body {
      padding: ${props.customBodyPadding};
    }
  `}
`;
