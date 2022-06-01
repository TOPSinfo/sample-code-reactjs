import { firestore } from "modules/utils/Firebase";

function organizationReference(organizationId: string) {
  return firestore.collection("Events").doc(organizationId);
}

function contractRefenerece(contractId: string) {
  return firestore.collection("Contracts").doc(contractId);
}

function organizationsReference() {
  return firestore.collection("Events");
}

function eventDocReference(organizationId: string, eventId: string) {
  return organizationReference(organizationId)
    .collection("events")
    .doc(eventId);
}

function eventReference(organizationId: string) {
  return organizationReference(organizationId).collection("events");
}

function profileRef(userId: string) {
  return firestore.collection("Profiles").doc(userId);
}

function peopleRef() {
  return firestore.collection("AdminEventPeople");
}

function breakoutRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("breakoutRooms");
}

function ivsRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("ivs");
}

function keynoteRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("keynotes");
}

function presenterRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("presenters");
}

function trackRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("tracks");
}

function sessionRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("sessions");
}

function sponsorRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("sponsors");
}

function LookupsRef(userId: string, organizationId: string, eventId: string) {
  return firestore
    .collection("Lookups")
    .doc(userId)
    .collection(organizationId)
    .doc(eventId);
}

function sponsorTypesRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("sponsorTypes");
}

function LookupsOrgRef(userId: string, organizationId: string) {
  return firestore.collection("Lookups").doc(userId).collection(organizationId);
}

function rolesRef() {
  return firestore.collection("Roles");
}

function componentsRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("components");
}

function usersProfileRef() {
  return firestore.collection("AdminEventPeople");
}
function eventRoutingRef() {
  return firestore.collection("Routing");
}
function eventComponentRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("components");
}
function eventRegisreeRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("registrees");
}
function eventGroupRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("groups");
}
function lobbyRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("Lobby");
}

function conversationComponentRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection("components");
}

function videoRef(organizationId: string) {
  return firestore
    .collection("Videos")
    .doc(organizationId)
    .collection("videos");
}

function imageRef(organizationId: string) {
  return firestore
    .collection("Videos")
    .doc(organizationId)
    .collection("images");
}

function recordingRef() {
  return firestore
    .collection("Recordings")
}

function loungeRef(organizationId: string, eventId: string) {
  return eventDocReference(organizationId, eventId).collection(
    "networkingLounge"
  );
}

function PollsRef(organizationId: string) {
  const pollsRef = firestore
    .collection("Events")
    .doc(organizationId)
    .collection("typeforms");
  return pollsRef;
}
export const Event = {
  docReference: eventDocReference,
  reference: eventReference
};

export const Organization = {
  organization: organizationReference
};

export const Profile = {
  profile: profileRef
};

export const Lookups = {
  reference: LookupsRef
};

export const Breakout = {
  reference: breakoutRef
};

export const Keynote = {
  reference: keynoteRef
};

export const Presenter = {
  reference: presenterRef
};

export const Track = {
  reference: trackRef
};

export const Sponsor = {
  reference: sponsorRef
};

export const Session = {
  reference: sessionRef
};

export const SponsorType = {
  reference: sponsorTypesRef
};

export const LookupToOragnization = {
  reference: LookupsOrgRef
};

export const Roles = {
  reference: rolesRef
};

export const Components = {
  reference: componentsRef
};

export const Users = {
  reference: usersProfileRef
};

export const EventComponent = {
  reference: eventComponentRef
};
export const EventRegistree = {
  reference: eventRegisreeRef
};

export const EventGroupComponent = {
  reference: eventGroupRef
}

export const Routing = {
  reference: eventRoutingRef
};

export const Lobby = {
  reference: lobbyRef
};

export const AdminEventPeople = {
  reference: peopleRef
};

export const IVSData = {
  reference: ivsRef
};

export const Video = {
  reference: videoRef
};

export const Image = {
  reference: imageRef
};

export const Lounge = {
  reference: loungeRef
};

export const Polls = {
  reference: PollsRef
};

export const Contracts = {
  reference: organizationsReference,
  contractReference: contractRefenerece
};

export const ConversationComponent = {
  reference: conversationComponentRef,
};

export const Recording = {
  reference: recordingRef,
}

