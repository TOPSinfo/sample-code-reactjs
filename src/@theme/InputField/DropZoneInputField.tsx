import React, { useState, useEffect } from "react";
import ReactDropzone from "react-dropzone";
import styled from "styled-components";
import Upload from "assets/img/icons/upload.svg";

const Dropzone = styled(ReactDropzone)``;

const Container = styled.div`
  border: dotted 2px #e9ecef !important;
  position: relative;
  height: 38px;
  & .input-icon {
    position: absolute;
    left: 10px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
  }
  overflow: hidden;
  &.error {
    border: dotted 2px #eb4b4b !important;
  }
`;

const Ptag = styled.p`
  border-radius: 2px;
  font-size: 14px;
  height: 38px;
  color: var(--grey);
  padding-left: 40px;
  white-space: nowrap;
  align-items: center;
  display: flex;
  height: 35px;
`;

const InputWrapper = styled.div`
  position: relative;
  outline: none;
  cursor: pointer;
`;

const FormLabel = styled.label`
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: normal;
`;
const WrapperDiv = styled.div`
  margin-bottom: 20px;
  span.error {
    color: #eb4b4b;
    font-size: 12px;
    margin-top: 8px;
    display: block;
  }
`;
interface IProps {
  titleName: string;
  onSelectedFiles?: (file: any, imageType: string) => void;
  imageType?: string;
  value?: string;
  hasError?: boolean;
  error?: string;
}
export const DropZoneInputField = (props: IProps) => {
  const {
    titleName,
    onSelectedFiles,
    imageType,
    value,
    hasError,
    error
  } = props;
  const [state, setState] = useState({
    value: "You can drop your files here"
  });
  const onDrop = (files: any) => {
    onSelectedFiles && onSelectedFiles(files[0], imageType as string);
  };

  useEffect(() => {
    if (value && value.length > 0) setState((val) => ({ ...val, value }));
  }, [value]);

  return (
    <WrapperDiv>
      <FormLabel>{titleName}</FormLabel>
      <Container
        className={hasError ? "dropzone-input error" : "dropzone-input"}
      >
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <InputWrapper {...getRootProps()}>
              <img src={Upload} width='20' className='input-icon' alt='icons' />
              <input {...getInputProps()} multiple={false} />
              <Ptag>{state.value}</Ptag>
            </InputWrapper>
          )}
        </Dropzone>
      </Container>
      {hasError && <span className='error'>{error}</span>}
    </WrapperDiv>
  );
};

export default DropZoneInputField;
