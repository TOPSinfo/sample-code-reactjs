import React, { Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  UIModal,
  UIButton,
  UIModalFooter,
  UIHeaderText,
  UIFormGroup
} from "@theme";
import styled from "styled-components";

interface CommonErrorModalProps {
  show: boolean;
  header?: string;
  symbol?: JSX.Element;
  hasFooterBorder?: boolean;
  customBodyPadding?: string;
  message: string;
  deleteButtonName?: string;
  textMargin?: string;
  closeButtonName?: string;
  onHide: () => void;
  onDelete?: () => void;
  swithBtnPos?: boolean;
}

export const CommonErrorModal: React.FC<CommonErrorModalProps> = ({
  show,
  onHide,
  closeButtonName = "Cancel",
  symbol,
  onDelete,
  deleteButtonName = "Delete",
  hasFooterBorder,
  textMargin,
  customBodyPadding,
  message,
  header,
  swithBtnPos
}) => {
  const ActionButton = (
    <UIModalFooter buttonAlignments='center'>
      {swithBtnPos ? (
        <React.Fragment>
          <UIButton label={closeButtonName} border onClick={onHide} />
          {onDelete && <UIButton label={deleteButtonName} onClick={onDelete} />}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {onDelete && (
            <UIButton label={deleteButtonName} border onClick={onDelete} />
          )}
          <UIButton label={closeButtonName} onClick={onHide} />
        </React.Fragment>
      )}
    </UIModalFooter>
  );
  return (
    <UIModal
      show={show}
      customBodyPadding={customBodyPadding}
      onHide={onHide}
      footer={ActionButton}
      hasFooterBorder={hasFooterBorder}
    >
      <UIFormGroup>
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='text-center'>
            {symbol && (
              <WrapperStyle>
                {symbol}
                <UIHeaderText
                  typeOf='text-h4'
                  text={message}
                  color={"#283747"}
                  className='ml-4'
                />
              </WrapperStyle>
            )}
            {!symbol && (
              <Fragment>
                {header && (
                  <UIHeaderText typeOf='text-h1' bold={"bold"} text={header} />
                )}
                <UIHeaderText
                  typeOf='text-h2'
                  text={message}
                  margin={textMargin}
                  color={"#283747"}
                  className='mt-4'
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </UIFormGroup>
    </UIModal>
  );
};
export default CommonErrorModal;
const WrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
