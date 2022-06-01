import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  UIModal,
  UIButton,
  UIInput,
  UIFormGroup,
  UIErrorBlock,
  LoadingSpinner
} from "@theme";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import { handleRenameModal } from "modules/actions";
interface RenameModalProps {
  rename: () => void;
  titleName: string;
  value?: string;
  handleRenameChange?: (e: any) => void;
  errorMsg?: string;
}

export const RenameModal: React.FC<RenameModalProps> = ({
  rename,
  titleName,
  value,
  handleRenameChange,
  errorMsg
}) => {
  const renameModalState = useSelector(selectors.getRenameModalState);
  const isModalLoading = useSelector(selectors.getModalLoading);
  const dispatch = useDispatch();
  return (
    <UIModal
      show={renameModalState}
      onHide={() => dispatch(handleRenameModal(false))}
      title={`Rename ${titleName}`}
      closeButton
    >
      <UIFormGroup>
        {isModalLoading && (
          <LoadingSpinner position={"absolute"} withCoverBg={true} />
        )}
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <UIInput
              label='Rename'
              placeholder='{Current _name_here}'
              type='text'
              required
              value={value}
              onChange={handleRenameChange}
            />
            {errorMsg && errorMsg.length > 0 && (
              <UIErrorBlock errorText={errorMsg} />
            )}
          </Col>
        </Row>
        <Row className='modal-btn-m0'>
          <Col md={6} xl={6} lg={6} sm={6} xs={6}>
            <UIButton
              label='Cancel'
              border
              onClick={() => dispatch(handleRenameModal(false))}
            />
          </Col>
          <Col md={6} xl={6} lg={6} sm={6} xs={6} className='text-right'>
            <UIButton label='Rename' onClick={rename} />
          </Col>
        </Row>
      </UIFormGroup>
    </UIModal>
  );
};
export default RenameModal;
