import { IStoreState } from "modules/types";

export const getDeleteModalFlag = (state: IStoreState) =>
  state.modal.isDeleteModalOpen;

export const getCropperModalFlag = (state: IStoreState) =>
  state.modal.cropperModalData;

// new modal selectors
export const getAdminUserModalState = (state: IStoreState) =>
  state.modal.addAdminUserModal;
export const getAddAdminUserSuccessModalState = (state: IStoreState) =>
  state.modal.addAdminUserAddSuccessModal;
export const getModalLoading = (state: IStoreState) =>
  state.modal.isModalLoading;

export const getAddPeopleModalState = (state: IStoreState) =>
  state.modal.addPeopleModal;
export const getContentModalState = (state: IStoreState) =>
  state.modal.addContentModal;
export const getPeopleAddSuccesModal = (state: IStoreState) =>
  state.modal.isPeopleAddSuccesModal;

export const getTeamAddEditUserSuccesModal = (state: IStoreState) =>
  state.modal.isTeamAddEditSuccesModal;

export const getPublishPopup = (state: IStoreState) =>
  state.modal.isPublishPopup;
export const getSecondThoughtsPopup = (state: IStoreState) =>
  state.modal.isSecondThoughtsPopupOpen;

export const getRenameModalState = (state: IStoreState) =>
  state.modal.isRenameModal;

export const getDebugModalState = (state: IStoreState) =>
  state.modal.isDebugModal;

export const getCreateEditEventComponent = (state: IStoreState) =>
  state.modal.createEditEventComponentState;
export const getAddGroupModal = (state: IStoreState) =>
  state.modal.addGroupModal;
export const getEditDatabaseModal = (state: IStoreState) =>
  state.modal.editDatabaseModal;

export const getCropperData = (state: IStoreState) => state.modal.cropperData;
export const getCropperModalState = (state: IStoreState) =>
  state.modal.isCropperModal;
export const getOrganizationModalState = (state: IStoreState) =>
  state.modal.isOrganizationModalOpen;
export const getAddProfileModalState = (state: IStoreState) => 
  state.modal.addProfileModal;

export const getCreateEditConversationComponent = (state: IStoreState) =>
  state.modal.createEditConversationComponentState;

export const getAddSpeakerModalState = (state: IStoreState) =>
  state.modal.addSpeakerModal;

export const getAddOpenModalState = (state: IStoreState) =>
  state.modal.addSpeakerModalOpen;
  
