
import { createAction } from "redux-act";
export const setCreateConversationState = createAction<any>(
  "manipulate created conversation state"
);

export const setCreateConversationErrorState = createAction<any>(
  "set error for created conversation"
);

export const unMountCreateDConversationState = createAction(
  "unmount data from reducer"
);

export const setConversationFieldErrorState = createAction<any>(
  "set error for created conversation"
);