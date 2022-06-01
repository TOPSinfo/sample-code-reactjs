import React from "react";
import {
  BootstrapModalWrapper,
  BootstrapModal,
  BootstrapModalHeader,
  BootstrapModalTitle,
  BootstrapModalBody,
  BootstrapModalWrapperBody,
  BootstrapModalWrapperFooter,
  BootstrapModalFooter
} from "./index.style";
import { UIModalProps } from "./index.types";
import { UIHeaderText } from "./index.header.tags";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

export const UIModal: React.FC<UIModalProps> = ({
  show,
  onHide,
  size,
  subtitle,
  title,
  className,
  closeButton,
  hasFooterBorder = true,
  backdrop = true,
  customBodyPadding,
  headerClass,
  minHeight,
  modalMinHeight,
  modalMinWidth,
  maxHeight,
  children,
  footer
}) => {
  return (
    <BootstrapModal
      size={size}
      show={show}
      onHide={onHide}
      backdrop={backdrop}
      className={className}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <BootstrapModalWrapper
        maxHeight={maxHeight}
        minHeight={minHeight}
        modalMinWidth={modalMinWidth}
        modalMinHeight={modalMinHeight}
      >
        {title && (
          <BootstrapModalHeader
            closeButton={closeButton}
            className={headerClass}
          >
            <BootstrapModalTitle>{title}</BootstrapModalTitle>
            {subtitle && <UIHeaderText typeOf={"text-h4"} text={subtitle} />}
          </BootstrapModalHeader>
        )}

        <PerfectScrollbar className={"modal-body-wrapper-scrollbar"}>
          <BootstrapModalWrapperBody customBodyPadding={customBodyPadding}>
            <BootstrapModalBody>{children}</BootstrapModalBody>
          </BootstrapModalWrapperBody>
        </PerfectScrollbar>

        {footer && (
          <BootstrapModalWrapperFooter hasFooterBorder={hasFooterBorder}>
            <BootstrapModalFooter>{footer}</BootstrapModalFooter>
          </BootstrapModalWrapperFooter>
        )}
      </BootstrapModalWrapper>
    </BootstrapModal>
  );
};
export default UIModal;
