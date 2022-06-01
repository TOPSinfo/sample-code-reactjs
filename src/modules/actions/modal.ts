import { createAction } from "redux-act";

export const openDeleteModal = createAction();
export const closeDeleteModal = createAction();
export const closeCropperModal = createAction<any>();

// new modal actions
export const setAdminUserModalState = createAction<boolean>();
export const setPeopleModalState = createAction<boolean>();
export const setContentModalState = createAction<boolean>();
export const setModalLoading = createAction<boolean>();
export const setAdminModalSuccess = createAction<boolean>();
export const setAdminSuccesModal = createAction<boolean>();
export const setPeopleSuccessModal = createAction<boolean>();
export const setPublishModalState = createAction<boolean>();
export const setSecondThoughtsModalState = createAction<boolean>();
export const handleRenameModal = createAction<boolean>();
export const setDebugModalState = createAction<boolean>();
export const createEditEventComponentModal = createAction<boolean>();
export const setSelectedEventId = createAction<{ eventId: string }>();
export const toggleAddGroupModal = createAction<boolean>();
export const toggleEditDatabaseModal = createAction<boolean>();

export const setCropperImageData = createAction<any>();
export const toggleCropperModal = createAction<any>();

export const setOrganizationModalState = createAction<boolean>();
export const setProfileModalState = createAction<boolean>();

export const createEditConversationComponentModal = createAction<boolean>();
export const setSelectedConversationId = createAction<{ conversationId: string }>();
export const setSpeakerModalState = createAction<boolean>();
export const setSpeakerAddModalOpen = createAction<boolean>();

