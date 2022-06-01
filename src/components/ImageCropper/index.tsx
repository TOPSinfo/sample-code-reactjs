import React, { useState } from "react";
import { ErrorBoundary } from "components";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getCropperModalFlag } from "modules/selectors";
import { CommonButton } from "@theme";
import { closeCropperModal } from "modules/actions";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from "react-toastify";

const ModalContainer = styled(Modal)`
  & .modal-dialog {
    height: 100vh;
    display: flex;
    align-items: center;
    margin-top: 0;
  }
`;

interface IProps {
  croppedUrl?: ({ croppedImageUrl }: any, imageType: string) => void;
  imageType: string;
  show?: boolean;
  src?: string;
  closeComponentCropper?: () => void;
}

export const ImageCropper = ({
  croppedUrl,
  imageType,
  show,
  src,
  closeComponentCropper
}: IProps) => {
  const dispatch = useDispatch();
  const controlCropperModal = useSelector(getCropperModalFlag);
  const [cropper, setCropper] = useState<any>();
  const getCropData = () => {
    console.log("cropper", cropper);
    if (typeof cropper !== "undefined") {
      const croppedImageUrl = cropper.getCroppedCanvas().toDataURL();
      croppedUrl && croppedUrl(croppedImageUrl, imageType);
      closeCropper();
    } else
      toast.warn("Please Crop the image", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
  };

  const closeCropper = () => {
    const obj = { show: false, src: "" };
    dispatch(closeCropperModal(obj));
    closeComponentCropper && closeComponentCropper();
  };

  return (controlCropperModal.show || show) &&
    (controlCropperModal.src.length > 0 || (src && src?.length > 0)) ? (
    <ErrorBoundary>
      <div className='custom-content'>
        <ModalContainer
          show={controlCropperModal.show || show}
          className='user-modal'
          backdrop='static'
          size='lg'
          onHide={closeCropper}
        >
          <Modal.Header closeButton>
            <Modal.Title>Image Cropper</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Cropper
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={16 / 9}
              src={controlCropperModal.src || src}
              viewMode={1}
              guides
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <CommonButton
              type='button'
              btnName='Crop'
              className='primary-btn'
              onClick={getCropData}
            />
          </Modal.Footer>
        </ModalContainer>
      </div>
    </ErrorBoundary>
      ) : null;
};
export default ImageCropper;
