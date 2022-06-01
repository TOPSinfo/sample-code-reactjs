import React, { useEffect, useRef, useState } from "react";
import "./input.scss";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { UIFileUploadWrapperStyle } from "./index.style";
import UIErrorBlock from "../errorbox";

interface UIUploadFileProps extends DropzoneOptions {
  className?: string;
  dropZoneContent: JSX.Element | JSX.Element[];
  changeUploadedFiles?: (files: File[]) => void;
  errorText?: string;
  staticText?: string;
  label?: string;
  value: string;
  showManualErr?: boolean;
  fileError?: string;
}
export const UIUploadFile: React.FC<UIUploadFileProps> = (props) => {
  const {
    changeUploadedFiles,
    errorText,
    staticText,
    showManualErr,
    fileError
  } = props;
  const initialLoading = useRef(true);
  const [hasCleared, setHasCleared] = useState(false);
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone(props);

  useEffect(() => {
    if (initialLoading.current && acceptedFiles.length > 0) {
      if (changeUploadedFiles) changeUploadedFiles(acceptedFiles);
      if (hasCleared && acceptedFiles && acceptedFiles.length > 0)
        setHasCleared(false);
    } else {
      initialLoading.current = true;
    }
  }, [acceptedFiles]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <UIFileUploadWrapperStyle
      className='form-component custome-filebrowse'
      hasError={fileRejections.length > 0 || !!errorText}
      hasStaticText={errorText ? false : !!staticText}
    >
      <section className='container'>
        {props.label && (
          <label className={"mb-2"}>
            <span>{props.label}</span>
          </label>
        )}

        <div className='browse-close'>
          <div {...getRootProps({ className: "dropzone" })}>
            {(hasCleared ||
              (typeof props.value === "string" &&
                props.value.length === 0 &&
                fileRejections.length === 0)) && (
              <span className='icon-ic-upload-grey' />
            )}
            <input {...getInputProps()} />
            {(hasCleared ||
              (typeof props.value === "string" &&
                props.value.length === 0 &&
                fileRejections.length === 0)) && (
              <div>{props.dropZoneContent}</div>
            )}
            <p>
              {!hasCleared &&
              typeof props.value === "string" &&
              props.value.length > 0
                ? props.value
                : ""}
            </p>
          </div>
          {!hasCleared && (acceptedFiles.length > 0 || props.value) && (
            <span
              className='icon-ic-close-black'
              onClick={() => {
                if (props.changeUploadedFiles) props.changeUploadedFiles([]);
                setHasCleared(true);
              }}
            />
          )}
        </div>
        {fileRejections.length > 0 && !showManualErr ? (
          <UIErrorBlock
            errorText={`Only PNG and JPG files under ${
              (props.maxSize || 0) / 1048576
            }MB are supported`}
          />
        ) : showManualErr && fileRejections.length > 0 ? (
          <UIErrorBlock errorText={fileError} />
        ) : errorText ? (
          <UIErrorBlock errorText={errorText} />
        ) : staticText ? (
          <UIErrorBlock errorText={staticText} />
        ) : null}
      </section>
    </UIFileUploadWrapperStyle>
  );
};
export default UIUploadFile;
