import React, { useState, Fragment, useRef } from "react";
import {
  CardImage,
  CardInitials,
  BrowseFile,
  UserUploadBox,
  UserDropdownBox
} from "./style.index";
import { Dropdown } from "react-bootstrap";
import "./userphoto.scss";
import { useDispatch, useSelector } from "react-redux";
import { readImage } from "components/Cropper/image";
import * as action from "modules/actions";
import { EditThumbnail } from "components/Cropper";
import * as selectors from "modules/selectors";
interface InitialsProps {
  name: string;
  image?: string | null | undefined;
  changeUploadedFiles?: any;
}
export const UserPhoto: React.FC<InitialsProps> = ({
  name = "Display Picture",
  image,
  changeUploadedFiles
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileChooser: any = useRef(null);
  const dispatch = useDispatch();
  const cropperModalState = useSelector(selectors.getCropperModalState);

  const BrowseFilePopUp = () => {
    if (fileChooser && fileChooser.current && fileChooser.current.click) {
      fileChooser?.current?.click();
    }
  };

  const handleChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const target: any = event.target;
    if (target && target.files && target.files.length > 0) {
      setError(false);
      setLoaded(false);
      
      const imageFile = await readImage(target.files);
      if (imageFile.type === "invalid")
        throw new Error("You can only upload JPG or PNG");
      if (imageFile.megabytes > 2)
        throw new Error("This file size is too big.");
  
      dispatch(action.setCropperImageData(imageFile));
      dispatch(action.toggleCropperModal(true));
    } else {
      setImageUrl("");
    }
  };

  const handleClick = (event:any) => {
    const { target = {} } = event || {};
    target.value = "";
  };

  const ClearImage = () => {
    setImageUrl("");
    if (changeUploadedFiles) changeUploadedFiles("");
    dispatch(action.setCropperImageData(null));
    dispatch(action.toggleCropperModal(false));

    if (fileChooser && fileChooser.current && fileChooser.current.value) {
      try {
        const obj: any = fileChooser?.current;
        obj.value = "";
      } catch (e) {}
    }
  };

  const updateCroppedImage = (file: any) => {
    const localImage = URL.createObjectURL(file);
    setImageUrl(localImage);
    changeUploadedFiles(file);
  };
  return (
    <UserUploadBox>
      {!hasError && image && !cropperModalState
        ? !imageUrl && (
            <CardImage
              isLoaded={isLoaded}
              src={image}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
          )
        : null}
      {!hasError && imageUrl && !cropperModalState ? (
        <CardImage
          isLoaded={isLoaded}
          src={imageUrl}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : null}
      <Fragment>
        {!(isLoaded && !hasError && (image || imageUrl)) && (
          <CardInitials className='roster-attendee-initials'>
            {name && name.trim().length > 0
              ? name
                .split(" ")
                .map((x: string) => x.charAt(0).toUpperCase())
                .join("")
                .substring(0, 2)
              : ""}
          </CardInitials>
        )}
        <UserDropdownBox>
          <BrowseFile
            type={"file"}
            accept='image/png, image/gif, image/jpeg'
            ref={fileChooser}
            onChange={handleChange}
            onClick={handleClick}
          />
          <Dropdown>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              <span className='icon-ic-edit-grey'></span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={BrowseFilePopUp}>Browse</Dropdown.Item>
              <Dropdown.Item onClick={ClearImage}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </UserDropdownBox>
      </Fragment>
      <EditThumbnail onCroppedImage={(image) => updateCroppedImage(image)} />
    </UserUploadBox>
  );
};
