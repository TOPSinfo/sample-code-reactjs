import { createReducer } from "redux-act";
import { addDoumetationUrl } from "modules/actions";

export interface IDocumentationReducerState {
  documentUrl: string | null;
}
const initialState: IDocumentationReducerState = {
  documentUrl: null
};

export const documentation = createReducer<IDocumentationReducerState>(
  {},
  initialState
);

documentation.on(
  addDoumetationUrl,
  (state: IDocumentationReducerState, payload: any) => ({
    ...state,
    documentUrl: payload
  })
);
