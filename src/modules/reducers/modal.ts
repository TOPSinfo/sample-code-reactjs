import { createReducer } from "redux-act";
import {
  openDeleteModal,
  closeDeleteModal,
  setModalLoading,
  closeCropperModal,
  // new modal reducer actions
  setAdminUserModalState,
  setAdminModalSuccess,
  setPeopleModalState,
  setContentModalState,
  setOrganizationModalState,
  setAdminSuccesModal,
  setPeopleSuccessModal,
  setPublishModalState,
  setSecondThoughtsModalState,
  handleRenameModal,
  setDebugModalState,
  createEditEventComponentModal,
  toggleAddGroupModal,
  toggleEditDatabaseModal,
  setCropperImageData,
  toggleCropperModal,
  setProfileModalState,
  createEditConversationComponentModal,
  setSpeakerModalState,
  setSpeakerAddModalOpen
} from "modules/actions/modal";

export type ModalReducerState = {
  isDeleteModalOpen: boolean;
  isConfimModalOpen: boolean;
  cropperModalData: CropperState;
  addAdminUserModal: boolean;
  addPeopleModal: boolean;
  addContentModal: boolean;
  addAdminUserAddSuccessModal: boolean;
  isModalLoading: boolean;
  isTeamAddEditSuccesModal: boolean;
  isPeopleAddSuccesModal: boolean;
  isPublishPopup: boolean;
  isRenameModal: boolean;
  isDebugModal: boolean;
  isSecondThoughtsPopupOpen: boolean;
  createEditEventComponentState: boolean;
  addGroupModal: boolean;
  editDatabaseModal: boolean;
  cropperData: any;
  isCropperModal: boolean;
  isOrganizationModalOpen: boolean;
  addProfileModal: boolean;
  createEditConversationComponentState: boolean;
  addSpeakerModal: boolean;
  addSpeakerModalOpen: boolean;
};

interface CropperState {
  src: string;
  show: boolean;
}

const initialState: ModalReducerState = {
  isDeleteModalOpen: false,
  isConfimModalOpen: false,
  cropperModalData: { src: "", show: false },
  addAdminUserModal: false,
  addPeopleModal: false,
  addContentModal: false,
  addAdminUserAddSuccessModal: false,
  isModalLoading: false,
  isTeamAddEditSuccesModal: false,
  isPeopleAddSuccesModal: false,
  isPublishPopup: false,
  isRenameModal: false,
  isDebugModal: false,
  isSecondThoughtsPopupOpen: false,
  createEditEventComponentState: false,
  addGroupModal: false,
  editDatabaseModal: false,
  cropperData: null,
  isCropperModal: false,
  isOrganizationModalOpen: false,
  addProfileModal:false,
  createEditConversationComponentState: false,
  addSpeakerModal:false,
  addSpeakerModalOpen:false
};

export const modal = createReducer<ModalReducerState>({}, initialState);
modal.on(openDeleteModal, (state: ModalReducerState) => ({
  ...state,
  isDeleteModalOpen: true
}));

modal.on(closeDeleteModal, (state: ModalReducerState) => ({
  ...state,
  isDeleteModalOpen: false
}));

// =======================================handle new modal states =======================================================
modal.on(
  setAdminUserModalState,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    addAdminUserModal: payload
  })
);

modal.on(setModalLoading, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  isModalLoading: payload
}));

modal.on(
  setAdminModalSuccess,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    addAdminUserAddSuccessModal: payload
  })
);

modal.on(setPeopleModalState, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  addPeopleModal: payload
}));

modal.on(
  setContentModalState,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    addContentModal: payload
  })
);

modal.on(setAdminSuccesModal, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  isTeamAddEditSuccesModal: payload
}));

modal.on(
  setPeopleSuccessModal,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    isPeopleAddSuccesModal: payload
  })
);

modal.on(
  setPublishModalState,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    isPublishPopup: payload
  })
);

modal.on(
  setSecondThoughtsModalState,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    isSecondThoughtsPopupOpen: payload
  })
);

modal.on(handleRenameModal, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  isRenameModal: payload
}));

modal.on(setDebugModalState, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  isDebugModal: payload
}));

modal.on(
  createEditEventComponentModal,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    createEditEventComponentState: payload
  })
);
modal.on(closeCropperModal, (state: ModalReducerState, payload: any) => ({
  ...state,
  cropperModalData: payload
}));
modal.on(toggleAddGroupModal, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  addGroupModal: payload
}));
modal.on(
  toggleEditDatabaseModal,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    editDatabaseModal: payload
  })
);

modal.on(setCropperImageData, (state: ModalReducerState, payload: any) => ({
  ...state,
  cropperData: payload
}));
modal.on(toggleCropperModal, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  isCropperModal: payload
}));

modal.on(
  setOrganizationModalState,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    isOrganizationModalOpen: payload
  })
);

modal.on(
  setProfileModalState,
  (state:ModalReducerState, payload: boolean) => ({
    ...state,
    addProfileModal: payload
  })
)

modal.on(
  createEditConversationComponentModal,
  (state: ModalReducerState, payload: boolean) => ({
    ...state,
    createEditConversationComponentState: payload
  })
);

modal.on(setSpeakerModalState, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  addSpeakerModal: payload
}));

modal.on(setSpeakerAddModalOpen, (state: ModalReducerState, payload: boolean) => ({
  ...state,
  addSpeakerModalOpen: payload
}));

