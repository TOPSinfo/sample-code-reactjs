import { takeLatest, fork } from "redux-saga/effects";
import * as actions from "modules/actions";
import * as user from "modules/sagas/user";
import * as organization from "modules/sagas/organization";
import * as userManagement from "modules/sagas/userManagement";
import * as people from "modules/sagas/people";
import * as event from "modules/sagas/Event";
import * as eventSponsors from "modules/sagas/eventSponsors";
import * as eventRoutings from "modules/sagas/event.routing";
import * as orgRoutings from "modules/sagas/organization.routing"
import * as eventComponent from "modules/sagas/event.component.new";
import * as eventRegisrees from "modules/sagas/eventRegistrees";
import * as documentation from "modules/sagas/documentation";
import * as uploader from "modules/sagas/content";
import * as polls from "modules/sagas/polls";
import * as organizations from "modules/sagas/organizations";
import * as conversation from "modules/sagas/conversation";
import * as conversationComponent from "modules/sagas/conversation.component.new";
import * as conversationRegisrees from "modules/sagas/conversationRegistrees";
export default function* rootSaga() {
  yield takeLatest(actions.authUser, user.signInUser);
  yield takeLatest(actions.disableDashboardFrame, user.disableDashboardFrame);
  yield fork(user.signInSessionUser);
  yield takeLatest(actions.authUserSuccess, organization.fetchOrganizationSaga);
  yield takeLatest(
    actions.authUserSuccess,
    documentation.fetchDocumentationUrl
  );
  yield takeLatest(
    actions.sendMailToResetPassword,
    user.sendMailToResetPassword
  );
  yield takeLatest(actions.authUserSuccess, user.getExploDashboardData);
  yield takeLatest(actions.signOutUser, user.signOutUser);
  yield takeLatest(actions.updatePassword, user.updatePasswordSaga);
  yield takeLatest(actions.updateProfile, user.updateProfileSaga);
  yield takeLatest(
    actions.fetchOrganizationsByContractId,
    userManagement.fetchUserManagementListSaga
  );
  yield takeLatest(actions.fetchEventList, event.fetchEventListSaga);
  yield takeLatest(actions.addAdminUser, userManagement.addAdminUserSaga);
  yield takeLatest(actions.editAdminUser, userManagement.editAdminUserSaga);
  yield takeLatest(actions.deleteTeamUser, userManagement.deleteAdminTeamUser);
  yield takeLatest(actions.createNewEvent, event.createEventSaga);
  yield takeLatest(actions.fetchSponsorTypes, event.fetchEventSponsorTypes);

  yield takeLatest(actions.storeEventDataWithoutDebounce, event.SaveEventData);
  yield fork(event.throttleSaveEvent);

  yield takeLatest(actions.deleteEvent, event.deleteEventSaga);
  yield takeLatest(actions.restoreEvent, event.restoreEventSaga);
  yield takeLatest(actions.copyEvent, event.copyEventSaga);
  yield takeLatest(actions.renameEventName, event.renameEventSaga);
  // yield takeLatest(actions.fetchUserListProfiles, event.fetchUserSaga);
  yield takeLatest(actions.fetchGroupLists, event.fetchGroupSaga);
  yield takeLatest(actions.saveGroupData, event.saveGroupSaga);

  yield takeLatest(actions.removeSponsor, eventSponsors.deleteSponsor);
  // yield takeLatest(actions.fetchPeopleList, people.fetchPeopleListSaga);
  yield takeLatest(actions.addPeople, people.addPeopleSaga);
  yield takeLatest(actions.editPeople, people.editPeopleSaga);
  yield takeLatest(actions.deletePeople, people.deletePeopleSaga);
  yield takeLatest(actions.fetchProfileByEmail, people.fetchProfileByEmailSaga);
  yield takeLatest(actions.removeSponsor, eventSponsors.deleteSponsor);
  /*
   * event component
   * */
  yield takeLatest(
    actions.saveCreatedEventComponent,
    eventComponent.saveEventComponentSaga
  );

  yield takeLatest(
    actions.fetchEventFriendlyName,
    eventRoutings.getEventFriendlyName
  );

  yield takeLatest(
    actions.setEventFriendlyName,
    eventRoutings.saveEventFriendlyName
  );
  yield fork(eventComponent.fetchEventComponentListemer);
  yield fork(eventRegisrees.fetchEventRegistreeListemer);
  yield takeLatest(actions.editRowSelected, eventRegisrees.editEventRegistree);
  yield takeLatest(
    actions.deleteRowSelected,
    eventRegisrees.removeEventRegistree
  );
  yield takeLatest(
    actions.importCsvData,
    eventRegisrees.addImportedCsvFileDataSaga
  );

  yield takeLatest(
    actions.deleteEvenComponent,
    eventComponent.deleteEventComponentSaga
  );

  yield takeLatest(
    actions.copyEventComponent,
    eventComponent.saveEventComponentSaga
  );

  yield takeLatest(
    actions.createBroadcastChannel,
    eventComponent.createBroadcastChannelSaga
  );
  yield takeLatest(actions.createShoFlo, eventComponent.createShoFloSaga);
  yield fork(eventComponent.fetchBroadcastChannelListener);
  yield takeLatest(actions.createEventApi, eventComponent.createEventAtInitial);

  yield takeLatest(actions.addFileToDb, uploader.addContentFileSaga);
  yield takeLatest(actions.fetchContentFile, uploader.fetchContentDatasaga);
  yield takeLatest(actions.deleteContent, uploader.deleteContentSaga);
  yield takeLatest(
    actions.updateLobbyKeynote,
    eventComponent.updateLobbyKeynoteSaga
  );
  yield fork(event.fetchEventListListener);
  yield takeLatest(actions.clearChat, eventRegisrees.clearChatSaga);
  yield fork(people.fetchPeoplerListener);
  yield fork(polls.fetchPollListListner);
  yield takeLatest(actions.createPollForm, polls.createPollFormSaga);
  yield takeLatest(actions.changeQuestion, polls.changeQuestionSaga);
  yield takeLatest(actions.addQuestion, polls.addNewQuestionSaga);
  yield takeLatest(actions.handleCreatePollFormModal, polls.initializeNewForm);
  yield takeLatest(actions.handlePollFieldValue, polls.handleFieldValueSaga);
  yield takeLatest(
    actions.removeMultipleChoiceAnswer,
    polls.removeMultipleChoiceSaga
  );
  yield takeLatest(actions.deleteSelectedPoll, polls.deletePollFormSaga);
  yield fork(user.getCustomTokenSaga);
  yield takeLatest(
    actions.fetchOrganizationsByContractId,
    organizations.fetchOrganizationsSaga
  );
  yield takeLatest(
    actions.createOrganization,
    organizations.createNewOrganizationSaga
  );
  yield takeLatest(
    actions.fetchDiscoveryFriendlyName,
    orgRoutings.getDiscoveryFriendlyName
  );
  yield takeLatest(
    actions.setDiscoveryFriendlyName,
    orgRoutings.saveDiscoveryFriendlyName
  );
  yield fork(conversation.fetchConversationListListener);
  yield takeLatest(actions.saveUserPreference, user.saveUserPreferenceSaga);
  yield takeLatest(
    actions.fetchConversationList,
    conversation.fetchConversionListSaga
  );
  yield fork(conversation.throttleSaveConversation);
  yield takeLatest(
    actions.deleteConversation,
    conversation.deleteConversationSaga
  );
  yield takeLatest(actions.copyConversation, conversation.copyConversationSaga);

  yield fork(conversationComponent.fetchConversationComponentListemer);

  yield takeLatest(
    actions.storeConversationDataWithoutDebounce,
    conversation.SaveConversationData
  );

  yield takeLatest(
    actions.saveCreatedConversationComponent,
    conversationComponent.saveConversationComponentSaga
  );
  yield takeLatest(
    actions.createConversationApi,
    conversationComponent.createConversationAtInitial
  );

  yield fork(conversationRegisrees.fetchConversationRegistreeListemer);
  yield takeLatest(
    actions.importCsvConversationData,
    conversationRegisrees.addImportedCsvConversationFileDataSaga
  );

  yield takeLatest(
    actions.clearChatConversation,
    conversationRegisrees.clearChatConversationSaga
  );
  yield takeLatest(
    actions.editConversationRowSelected,
    conversationRegisrees.editConversationRegistree
  );
  yield takeLatest(
    actions.deleteConversationRowSelected,
    conversationRegisrees.removeConversationRegistree
  );
  yield fork(conversationComponent.fetchConversationSpeakerListemer);
  yield takeLatest(
    actions.savingConversationSpeakerAction,
    conversationComponent.savingConversationSpeakerData
  );
  yield takeLatest(
    actions.deleteSpeakerPeople,
    conversationComponent.deleteSpeakerPeopleSaga
  );

  yield fork(uploader.fetchRecordingListner);
  yield fork(organization.setOrgLandingDataSaga);
}
