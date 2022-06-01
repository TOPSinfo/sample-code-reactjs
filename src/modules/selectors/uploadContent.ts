import { IStoreState } from "modules/types";

export const getFileList = (state: IStoreState) => state.uploadContent.fileList;
export const getFetchFileState = (state: IStoreState) =>
  state.uploadContent.isfetching;

export const getSelectedContent = (state: IStoreState) =>
  state.uploadContent.selectedContent;

export const getRecordingContent = (state: IStoreState) =>
  state.uploadContent.recordingData;

