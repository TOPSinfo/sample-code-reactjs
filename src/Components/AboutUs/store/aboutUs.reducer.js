import { aboutUsConstants } from './aboutUs.types';
const initialState = {
  aboutList: [],
  totalRows: 0,
  currentAboutUs: {},
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case aboutUsConstants.GET_ABOUT_LIST:
      if (payload.docs) {
        return {
          ...state,
          aboutList: payload.docs,
          totalRows: payload.totalDocs,
          currentAboutUs: {},
        };
      }
      return {
        ...state,
        aboutList: payload,
      };
    case aboutUsConstants.GET_ABOUT_DATA_BY_ID:
      return {
        currentAboutUs: payload,
      };
    default:
      return state;
  }
}
