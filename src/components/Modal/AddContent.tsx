import React, { useEffect, useState } from "react";
import {
  UIModal,
  UIButton,
  UIUploadFile,
  UIModalFooter,
  UIInput
} from "@theme";
import { Row, Col, ProgressBar, Button } from "react-bootstrap";
import { useDispatch, useSelector, batch } from "react-redux";
import * as selectors from "modules/selectors";
import { setContentModalState } from "modules/actions";
import { ErrorBoundary } from "components";
import useFileUploader from "hooks/useUploader";
import styled from "styled-components";
import { getDuration } from "modules/utils/commonFn";

export const AddContent: React.FC = () => {
  const dispatch = useDispatch();
  const isModalLoading = useSelector(selectors.getModalLoading);
  const contentModalState = useSelector(selectors.getContentModalState);
  const { uploadSelectedFilesInQueue, uploadProgresss, uploadBtnState } =
    useFileUploader();
  const [fileName, setFileName] = useState("");
  const onHide = () => {
    batch(() => {
      dispatch(setContentModalState(false));
    });
    setFileSelected(new File([], "Select and upload from computer"));
    setDisableUpload(true);
  };

  const [fileSelected, setFileSelected] = useState(
    new File([], "Select and upload from computer")
  );
  const [disableUpload, setDisableUpload] = useState(true);
  const [minimize, setMinimize] = useState(false);
  useEffect(() => {
    if (!fileSelected) {
      setDisableUpload(true);
    }
  }, [fileSelected]);

  const uploadFile = async () => {
    const file: any = fileSelected;
    file.fileName = fileName;
    if (file.type === "video/mp4") file.duration = await getDuration(file);
    else file.duration = ""
    uploadSelectedFilesInQueue.push(file, async (err: any, data: any) => {
      console.log("dataaa", data);
      setFileName("");
      setFileSelected(new File([], "Select and upload from computer"));
      setDisableUpload(true);
      console.log("errerr", err);
    });
  };

  const ActionButton = (
    <UIModalFooter buttonAlignments='space-between'>
      <div>
        <UIButton
          label='Cancel'
          border
          onClick={onHide}
          disabled={isModalLoading}
        />
      </div>
      <div>
        <UIButton
          label='Minimize'
          className='no-extra-margin'
          onClick={() => setMinimize(true)}
          disabled={!uploadBtnState}
        />
      </div>
      <div>
        <UIButton
          label='Upload'
          className='no-extra-margin'
          onClick={uploadFile}
          disabled={isModalLoading || disableUpload || uploadBtnState}
        />
      </div>
    </UIModalFooter>
  );
  return (
    <ErrorBoundary>
      {minimize && uploadBtnState ? (
        <MinimizedUploadView
          progress={uploadProgresss}
          setMinimize={(value: boolean) => setMinimize(value)}
          minimize={minimize}
          filename={fileSelected.name}
        />
      ) : (
        <UIModal
          show={contentModalState}
          onHide={onHide}
          backdrop={isModalLoading ? "static" : true}
          headerClass={"flex-column"}
          hasFooterBorder={false}
          footer={ActionButton}
          title={"Add Content"}
        >
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIUploadFile
                label='Add Video or Image'
                accept={["video/mp4", "image/png", "image/jpeg"]}
                staticText='MP4, PNG and JPEG are supported'
                dropZoneContent={
                  <div>
                    {fileSelected
                      ? fileSelected.name
                      : "Select and upload from computer"}
                  </div>
                }
                maxFiles={1}
                changeUploadedFiles={(files) => {
                  if (files && files.length > 0) {
                    setFileSelected(files[0]);
                    setFileName(files[0].name);
                    setDisableUpload(false);
                  } else {
                    setFileSelected(
                      new File([], "Select and upload from computer")
                    );
                    setFileName("");
                    setDisableUpload(true);
                  }
                }}
                onFileDialogCancel={() => setDisableUpload(true)}
                value=''
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <RenameFileName>
                <UIInput
                  label='Title'
                  onChange={(e) => setFileName(e.target.value)}
                  value={fileName}
                  type='text'
                />
              </RenameFileName>
            </Col>
            <UploadProgressCol>
              Upload Progress:{" "}
              {uploadBtnState ? (
                <ProgressBar
                  now={parseInt(uploadProgresss)}
                  label={`${uploadProgresss}`}
                />
              ) : (
                uploadProgresss
              )}
            </UploadProgressCol>
          </Row>
        </UIModal>
      )}
    </ErrorBoundary>
  );
};
export default AddContent;

const MinimizedUploadView = (props: any) => {
  const { progress, setMinimize, minimize, filename } = props;
  return (
    <MinimizeUploaderDiv className='toster-outer'>
      <Row className='row-wrapper'>
        <Col xs={8} md={8} lg={8}>
          <span className='mb-2'>{filename}</span>
          <ProgressBar now={parseInt(progress)} label={`${progress}`} />
        </Col>
        <Col xs={4} md={4} lg={4}>
          <Button onClick={() => setMinimize(!minimize)}>Full View</Button>
        </Col>
      </Row>
    </MinimizeUploaderDiv>
  );
};

const MinimizeUploaderDiv = styled.div`
  border-radius: 24px;
  border: 1px solid #3d424f;
  display: flex;
  align-items: center;
  padding: 12px;
  width: 480px;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 15px;
  z-index: 99;
  box-shadow: 0px 8px 12px rgba(17, 19, 26, 0.3);
  background: white;
  display: inline-block;
  & .row-wrapper {
    align-items: center;
  }
`;

const RenameFileName = styled.div`
  padding-left: 15px;
`;

const UploadProgressCol = styled(Col)`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 5px; 
`
