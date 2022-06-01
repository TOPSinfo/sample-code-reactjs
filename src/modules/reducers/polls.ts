import { createReducer } from "redux-act";
import {
  setPollsCreatedForm,
  fetchPolls,
  setPollsList,
  handleCreatePollFormModal,
  togglePollModalLoading,
  selectPoll,
  handleEditPollFormModal
} from "modules/actions";
export type IPolls = {
  id?: string;
  title: string;
  type: string;
  fields?: (IPollsOpinianScale | IPollsMultipleChoice)[];
};

export type IPollsFields = {
  properties?: {
    description: string;
  };
  ref?: string;
  title?: string;
  type?: string;
  validations?: {
    required: boolean;
    max_length: number;
  };
  id?: string;
};
export type IPollsOpinianScale = {
  attachment: {
    href: string;
    scale: number;
    type: string;
  };
  properties: {
    description: string;
    labels: {
      center: string;
      left: string;
      right: string;
    };
    start_at_one: boolean;
    steps: number;
  };
  ref: string;
  title: string;
  type: string;
  validations: {
    required: boolean;
  };
};
export type IPollsMultipleChoice = {
  attachment: {
    href: string;
    scale: number;
    type: string;
  };
  properties: {
    allow_multiple_selection: boolean;
    allow_other_choice: boolean;
    choices: [
      {
        label: string;
        ref: string;
      },
      {
        label: string;
        ref: string;
      }
    ];
    description: string;
    randomize: boolean;
    vertical_alignment: boolean;
  };
  ref: string;
  title: string;
  type: string;
  validations: {
    required: boolean;
    max_selection?: number;
    min_selection?: number;
  };
};

export type IPollsReducerState = {
  pollsTypeFormData: IPolls;
  pollsList: any[];
  isFetchingPolls: boolean;
  isPollModalLoading: boolean;
  selectedPoll?: any;
  pollModal: boolean;
};

const initialState: IPollsReducerState = {
  pollsTypeFormData: {
    title: "",
    type: "form",
    fields: []
  },
  pollsList: [],
  isFetchingPolls: false,
  isPollModalLoading: false,
  selectedPoll: null,
  pollModal: false
};

export const polls = createReducer<IPollsReducerState>({}, initialState);
polls.on(setPollsCreatedForm, (state: IPollsReducerState, payload: IPolls) => ({
  ...state,
  pollsTypeFormData: payload
}));

polls.on(fetchPolls, (state: IPollsReducerState) => ({
  ...state,
  isFetchingPolls: true
}));

polls.on(setPollsList, (state: IPollsReducerState, payload: any[]) => ({
  ...state,
  pollsList: payload,
  isFetchingPolls: false
}));
polls.on(
  togglePollModalLoading,
  (state: IPollsReducerState, payload: boolean) => ({
    ...state,
    isPollModalLoading: payload
  })
);

polls.on(
  handleCreatePollFormModal,
  (state: IPollsReducerState, payload: boolean) => ({
    ...state,
    pollModal: payload
  })
);
polls.on(
  handleEditPollFormModal,
  (state: IPollsReducerState, payload: boolean) => ({
    ...state,
    pollModal: payload
  })
);
polls.on(selectPoll, (state: IPollsReducerState, payload: boolean) => ({
  ...state,
  selectedPoll: payload
}));
