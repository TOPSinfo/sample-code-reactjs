import { createAction } from "redux-act";

export const createPollForm = createAction();
export const setPollsCreatedForm = createAction<any>();
export const fetchPolls = createAction();
export const removePollListner = createAction();
export const setPollsList = createAction<any[]>();
export const handleEditPollFormModal = createAction<boolean>();
export const handleCreatePollFormModal = createAction<boolean>();
export const togglePollModalLoading = createAction<boolean>();
export const selectPoll = createAction<any>();
export const changeQuestion = createAction<{ data: any; index: number }>();
export const addQuestion = createAction();
export const handlePollFieldValue = createAction<any>();
export const removeMultipleChoiceAnswer = createAction<any>();
export const deleteSelectedPoll = createAction();
