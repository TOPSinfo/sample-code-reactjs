import { createReducer } from "redux-act";
import {
  fetchContentFile,
  setContentFile,
  setSelectedContent,
  removeContent,
  updateContentList,
  setRecordingData
} from "modules/actions";
export interface IFileList {
  url: string;
  title: string;
  id: string;
}

export interface IRecordingData {
  id: string;
  type: string;
  title: string;
}

export interface IContentReducer {
  fileList: IFileList[];
  isfetching: boolean;
  selectedContent: IFileList | null;
  recordingData: IRecordingData[];
}

const initialState = {
  fileList: [],
  isfetching: false,
  selectedContent: null,
  recordingData: []
};

export const uploadContent = createReducer<IContentReducer>({}, initialState);

uploadContent.on(fetchContentFile, (state: IContentReducer) => ({
  ...state,
  isfetching: true
}));

uploadContent.on(
  setContentFile,
  (state: IContentReducer, payload: IFileList[]) => ({
    ...state,
    isfetching: false,
    fileList: payload
  })
);

uploadContent.on(
  setSelectedContent,
  (state: IContentReducer, payload: IFileList | null) => {
    return {
      ...state,
      selectedContent: payload
    };
  }
);

uploadContent.on(removeContent, (state: IContentReducer, payload: string) => {
  return {
    ...state,
    fileList: filterFilList(state.fileList, payload)
  };
});

uploadContent.on(
  updateContentList,
  (state: IContentReducer, payload: IFileList) => {
    return {
      ...state,
      fileList: updateList(state.fileList, payload)
    };
  }
);

uploadContent.on(
  setRecordingData,
  (state: IContentReducer, payload: IRecordingData[]) => {
    return {
      ...state,
      recordingData: payload
    };
  }
);

const filterFilList = (array: IFileList[], payload: string) => {
  const filterArray = array.filter((val) => val.id !== payload);
  return filterArray;
};

const updateList = (array: IFileList[], payload: IFileList) => {
  const filterArray = [...array];
  filterArray.push(payload);
  return filterArray;
};
