import { createAction } from "redux-act";
import { IFileList } from "modules/reducers";

export const addFileToDb = createAction<any>("ADD_FILE_TO_DB");
export const fetchContentFile = createAction<any>("FETCH_CONTENT_FILE");
export const setContentFile = createAction<IFileList[]>("SET_CONTENT_FILE");
export const setSelectedContent = createAction<IFileList | null>(
  "SET_SELECTED_CONTENT"
);

export const deleteContent = createAction<{ id: string, type: string }>("DELETE_CONTENT");
export const removeContent = createAction<string>("REMOVE_CONTENT");
export const updateContentList = createAction<IFileList>("UPDATE_CONTENT_LIST");

export const fetchRecordingData = createAction("FETCH_RECORDING_DATA");
export const setRecordingData = createAction<any>("SET_RECORDING_DATA");
export const removeRecordingListner = createAction("REMOVE_RECORDING_LISTNER");
