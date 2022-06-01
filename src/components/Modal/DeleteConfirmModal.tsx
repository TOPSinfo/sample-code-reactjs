import React, { Fragment } from "react";
import {
  UIModal,
  UIButton,
  UIModalFooter,
  UIHeaderText,
  LoadingSpinner
} from "@theme";
import { useSelector, useDispatch, batch } from "react-redux";
import * as selectors from "modules/selectors";
import { closeDeleteModal, setSelectedTeamUser } from "modules/actions";
interface EventDeleteProps {
  onClose: () => void;
  onDelete: () => void;
  preTitleText?: string;
  deleteButtonName?: string;
  title: string;
  info: string;
  closeBtnLabel?: string;
  controlBtnGroup?: boolean;
  hideHeader?: boolean;
}

export const DeleteConfirmModal: React.FC<EventDeleteProps> = ({
  onClose,
  preTitleText = "Delete ",
  deleteButtonName = "Delete",
  title,
  onDelete,
  info,
  closeBtnLabel,
  controlBtnGroup,
  hideHeader
}) => {
  const dispatch = useDispatch();
  const isModalLoading = useSelector(selectors.getModalLoading);
  const openDeleteModal = useSelector(selectors.getDeleteModalFlag);
  const ActionButton = (
    <UIModalFooter buttonAlignments='center'>
      {controlBtnGroup ? (
        <UIButton
          label={closeBtnLabel || "Cancel"}
          disabled={isModalLoading}
          onClick={() => {
            onClose();
            batch(() => {
              dispatch(setSelectedTeamUser(null));
              dispatch(closeDeleteModal());
            });
          }}
        />
      ) : (
        <>
          <UIButton
            label={closeBtnLabel || "Cancel"}
            disabled={isModalLoading}
            onClick={() => {
              onClose();
              batch(() => {
                dispatch(setSelectedTeamUser(null));
                dispatch(closeDeleteModal());
              });
            }}
          />
          <UIButton
            label={deleteButtonName}
            disabled={isModalLoading}
            border={true}
            onClick={onDelete}
          />
        </>
      )}
    </UIModalFooter>
  );

  return (
    <UIModal
      show={openDeleteModal}
      backdrop={isModalLoading ? "static" : true}
      onHide={() => {
        onClose();
        dispatch(closeDeleteModal());
      }}
      footer={ActionButton}
    >
      <Fragment>
        {isModalLoading && (
          <LoadingSpinner
            position={"absolute"}
            spinnerTop={"50%"}
            spinnerLeft={"38%"}
            spinnerPosition={"absolute"}
            withCoverBg={true}
          />
        )}
        {!hideHeader && (
          <UIHeaderText
            typeOf='text-h1'
            className='center mb-3'
            bold={"bold"}
            text={`${preTitleText}${title}?`}
          />
        )}
        <UIHeaderText typeOf='text-h1' className='text-center' text={info} />
      </Fragment>
    </UIModal>
  );
};
export default DeleteConfirmModal;
