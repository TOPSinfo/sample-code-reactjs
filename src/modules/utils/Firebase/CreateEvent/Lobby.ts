import { Event, Lobby } from "modules/utils/Firebase/Api";
import { toast } from "react-toastify";
export const addLobbyDetails = async (payload: any) => {
  try {
    const eventRef = Event.docReference(
      payload.organizationId,
      payload.eventId
    );

    await eventRef.update({
      lobby: {
        action: {
          label: payload.lobbyActionLabel
        },
        page: {
          title: payload.lobbyPageTitle
        }
      },
      schedule: {
        action: {
          label: payload.scheduleActionLabel
        },
        page: {
          title: payload.schedulePageTitle
        }
      },
      sponsors: {
        action: {
          label: payload.sponsorsActionLabel
        },
        page: {
          title: payload.sponsorsPageTitle
        }
      },
      sponsor: {
        page: {
          followUp: {
            label: payload.sponsorPageFollowUp
          },
          visitWebsite: {
            label: payload.visitWebsite
          },
          sponsorLoungeBtn: {
            label: payload.sponsorLoungeBtn
          }
        }
      },
      invite: {
        label: payload.inviteLabel,
        placeholder: payload.invitePlaceholder
      },
      social: payload.socialLabel
    });
    return true;
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return false;
  }
};

export const getLobbyDetails = async (payload: any) => {
  try {
    const lobbyRef = Event.docReference(
      payload.organizationId,
      payload.eventId
    );
    const querySnapshot = await lobbyRef.get();
    const data = querySnapshot.data();

    const response = {
      lobbyActionLabel: data?.lobby?.action?.label
        ? data?.lobby?.action?.label
        : "Back To Lobby",
      lobbyPageTitle: data?.lobby?.page?.title
        ? data.lobby.page.title
        : "Main Lobby",
      scheduleActionLabel: data?.schedule?.action?.label
        ? data.schedule.action.label
        : "Full Schedule",
      schedulePageTitle: data?.schedule?.page?.title
        ? data.schedule.page.title
        : "Schedule",
      sponsorsActionLabel: data?.sponsors?.action?.label
        ? data.sponsors.action.label
        : "Meet The Experts",
      sponsorsPageTitle: data?.sponsors?.page?.title
        ? data.sponsors.page.title
        : "Sponsors",
      sponsorPageFollowUp: data?.sponsor?.page?.followUp?.label
        ? data.sponsor.page.followUp.label
        : "Request Follow Up",
      visitWebsite: data?.sponsor?.page?.visitWebsite?.label
        ? data.sponsor.page.visitWebsite?.label
        : "Visit Website",
      sponsorLoungeBtn: data?.sponsor?.page?.sponsorLoungeBtn?.label
        ? data.sponsor.page.sponsorLoungeBtn?.label
        : "Sponsor Lounge",
      inviteLabel: data?.invite?.label
        ? data.invite.label
        : "Invite a colleague",
      invitePlaceholder: data?.invite?.placeholder
        ? data.invite.placeholder
        : "email@example.com",
      socialLabel: data?.social
        ? data.social
        : [{ label: "Follow/Post the Event" }]
    };
    return response;
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return {};
  }
};

export const addLobbyEventComponentApi = async (
  payload: any,
  organizationId: string,
  eventId: string
) => {
  try {
    const lobbyRef = Lobby.reference(organizationId, eventId);
    await lobbyRef.doc(payload.id).set(payload);
    return payload;
  } catch (e) {
    console.error(String(e));
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    return false;
  }
};
