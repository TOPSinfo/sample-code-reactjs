/* eslint-disable no-unneeded-ternary */
import React, { useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CropperWrapper, SliderWrapper } from "./cropperStyle";

// import { ImageFile } from "./image";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "modules/selectors";
import * as action from "modules/actions";
import { UIModal, UIModalFooter, UIButton } from "@theme";
import { ErrorBoundary } from "components";
import lodash from "lodash";
import { dataUrlToFile } from "modules/utils/commonFn";
import "./cropper.scss";
import getCroppedImg from "./cropImage";
interface IProps {
  onCroppedImage: (image: any) => void;
}
export function EditThumbnail({ onCroppedImage }: IProps) {
  const [image, setImage] = React.useState<any | null>(null);
  // const [zoom, setZoom] = React.useState(0.0);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const imageData = useSelector(selectors.getCropperData);
  const cropperModalState = useSelector(selectors.getCropperModalState);
  const cropperRef = useRef<HTMLImageElement>(null);

  const dispatch = useDispatch();
  const saveProfileImage = async () => {
    if (image) {
      try {
        const filess: any = await dataUrlToFile(image, imageData.name);
        onCroppedImage && onCroppedImage(filess);
        dispatch(action.toggleCropperModal(false));
      } catch (e) {
        console.error(e);
      }
    }
  };
  const ActionButton = (
    <UIModalFooter buttonAlignments='space-end'>
      <UIButton
        label='Cancel'
        border
        onClick={() => dispatch(action.toggleCropperModal(false))}
      />
      <UIButton
        label={"Save"}
        className='no-extra-margin'
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          saveProfileImage();
        }}
      />
    </UIModalFooter>
  );

  useEffect(() => {
    const cropper: any = cropperRef?.current;
    if (cropper?.cropper?.canvasData && typeof zoom === "number") {
      cropper?.cropper?.zoomTo(zoom);
    }
  }, [zoom]);
  const onCropComplete = React.useCallback(
    async (croppedArea, croppedAreaPixels) => {
      try {
        if (croppedAreaPixels) {
          const croppedImage = await getCroppedImg(
            lodash.get(imageData, "source"),
            croppedAreaPixels,
            rotation
          );
          setImage(croppedImage);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [rotation, imageData]
  );

  return (
    <React.Fragment>
      <ErrorBoundary>
        <UIModal
          show={cropperModalState}
          onHide={() => dispatch(action.toggleCropperModal(false))}
          backdrop={"static"}
          headerClass={"flex-column"}
          hasFooterBorder={false}
          footer={ActionButton}
          title='Crop Image'
        >
          <CropperWrapper>
            <Cropper
              image={lodash.get(imageData, "source")}
              crop={crop}
              cropShape={"round"}
              cropSize={{ height: 200, width: 200 }}
              style={{
                containerStyle: {
                  height: 270,
                  width: "100%",
                  position: "relative"
                }
              }}
              zoom={zoom}
              aspect={1}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            {/* <Cropper
              src={lodash.get(imageData, "source")}
              style={{ height: 270, width: "100%" }}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
              dragMode='none'
              aspectRatio={3 / 3}
              movable={false}
              cropBoxMovable={true}
              cropBoxResizable={false}
              zoom={(detail: any) => setZooms(detail)}
              zoomTo={zoom}
              autoCropArea={1}
              background={false}
              viewMode={1}
            /> */}
          </CropperWrapper>
          <SliderWrapper
            className='controls d-flex'
            style={{ color: "var(--slate-color)", alignItems: "center" }}
          >
            <FaMinus />
            <input
              aria-labelledby='Zoom'
              type='range'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setZoom(Number(event.currentTarget.value));
              }}
              value={zoom}
              min={1}
              max={3}
              step={0.1}
            />
            <FaPlus />
          </SliderWrapper>
        </UIModal>
      </ErrorBoundary>
    </React.Fragment>
  );
}
