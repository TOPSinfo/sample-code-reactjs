import { IStoreState } from "modules/types";

export const getDocumentationUrl = (state: IStoreState) =>
  state.documentation.documentUrl;
