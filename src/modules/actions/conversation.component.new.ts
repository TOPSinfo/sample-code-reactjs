import { createAction } from "redux-act";
import {
  IConversationComponentsNew,
  ICreateConversationProperty
} from "modules/types/globals";

export const setConversationComponentsRowSelectedNew =
  createAction<IConversationComponentsNew | null>("fetch conversation Friendly Name");

export const setDoubleClickConversationComponentsRowSelected = createAction<any>(
  "control double click data and modal view"
);

export const unMountConversationState = createAction("unmount u conversation data");


export const setConversationComponentViewType = createAction<string>(
  "fetch broadcast channel"
);

export const setConversationComponentsNew = createAction<IConversationComponentsNew[]>(
  "fetch conversation Friendly Name"
);

export const setCurrentConversationId = createAction<string>(
  "set conversation id for event component"
);

export const removeCurrentConversationId = createAction(
  "remove conversation id for event component"
);

export const fetchConversationComponents = createAction<{ conversationId: string }>(
  "fech conversation Friendly Name"
);


export const createConversationComponentActions = createAction<
  ICreateConversationProperty | any
>("manipulate create conversation data");

export const saveCreatedConversationComponent = createAction<any>(
  "save created conversation component"
);

export const createConversationApi = createAction<any>("control double click state");

export const createdConversationSuccess = createAction<boolean>(
  "conversation created status"
);

export const createConversationSpeakerActions = createAction<any>(
  "conversation speaker data"
);

export const savingConversationSpeakerAction = createAction<any>(
  "saving speaker data"
);

export const setFecthedPeopleUserList = createAction<any>("fetching user Data");

export const deleteSpeakerPeople = createAction<any>(
  "delete from firebase team user"
);







