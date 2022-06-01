import {
  EventComponent,
  Breakout,
  Lobby,
  Components,
  Sponsor
} from "modules/utils/Firebase/Api";
import { omit } from "lodash";
import { MEETING_TYPES } from "../../../../@theme/commonfile";
import { firestore } from "../index";
import { toast } from "react-toastify";
export const saveEventComponentApi = async (payload: any) => {
  try {
    const eventComponentRef = EventComponent.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);
    const updatedPayload = omit(payload, ["eventId", "organizationId", "key"]);
    await eventComponentRef.set(updatedPayload);
    if (updatedPayload.componentRef) {
      const data = await updatedPayload.componentRef.get();
      if (data.data()) {
        if (updatedPayload.type === MEETING_TYPES.SPONSOR_BOOTH)
          updatedPayload.sponsorData = data.data();
        else updatedPayload[payload.key] = data.data();
      }

      if (
        updatedPayload[payload.key] &&
        updatedPayload[payload.key].presenters &&
        Array.isArray(updatedPayload[payload.key].presenters) &&
        updatedPayload[payload.key].presenters.length > 0
      ) {
        const promises = updatedPayload[payload.key].presenters.map(
          (value: any) => value.get()
        );
        const presenters = await Promise.all(promises);
        updatedPayload[payload.key].presenters = presenters.map((x: any) =>
          x.data()
        );
      }
      if (
        updatedPayload[payload.key] &&
        updatedPayload[payload.key].moderators &&
        Array.isArray(updatedPayload[payload.key].moderators) &&
        updatedPayload[payload.key].moderators.length > 0
      ) {
        const promises = updatedPayload[payload.key].moderators.map(
          (value: any) => value.get()
        );
        const moderators = await Promise.all(promises);
        updatedPayload[payload.key].moderators = moderators.map((x: any) =>
          x.data()
        );
      }
    }
    return updatedPayload;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};
/* export const getEventComponentsApi = async (
  eventId: string,
  organizationId: string
) => {
  try {
    const eventComponentRef = EventComponent.reference(organizationId, eventId);
    const querySelectorData = await eventComponentRef.get();
    const eventComponentList: any = [];
    querySelectorData.forEach((resp) => {
      eventComponentList.push({ id: resp.id, ...resp.data() });
    });
    /!* for (const data of eventComponentList) {
      listData.push(data);
    } *!/
    return eventComponentList;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      // closeOnClick: true,
      autoClose: 3000
    });
    console.log("error here is", e);
    return [];
  }
}; */

export const deleteEventComponentApi = async (payload: any) => {
  try {
    const eventRef = EventComponent.reference(
      payload.organizationId,
      payload.eventId
    );
    if (payload.compId && payload.compId.length > 0) {
      switch (payload.type) {
        case MEETING_TYPES.MEETING_ROOM:
        case MEETING_TYPES.BROADCAST_ROOM: {
          const breakoutRef = Breakout.reference(
            payload.organizationId,
            payload.eventId
          );
          const breakoutDoc = breakoutRef.doc(payload.compId);
          await breakoutDoc.delete();
          break;
        }
        case MEETING_TYPES.LOBBY: {
          const lobbyRef = Lobby.reference(
            payload.organizationId,
            payload.eventId
          );
          const lobbyDoc = lobbyRef.doc(payload.compId);
          await lobbyDoc.delete();
          break;
        }
        case MEETING_TYPES.SPONSOR_BOOTH: {
          const sponsorRef = Sponsor.reference(
            payload.organizationId,
            payload.eventId
          );
          const sponsorDoc = sponsorRef.doc(payload.compId);
          await sponsorDoc.delete();
          if (payload.isBreakoutRoom) {
            const breakoutRef = Breakout.reference(
              payload.organizationId,
              payload.eventId
            );
            const breakoutDoc = breakoutRef.doc(payload.compId);
            await breakoutDoc.delete();
          }
          break;
        }
        case MEETING_TYPES.CALL_TO_ACTION: {
          const componentRef = Components.reference(
            payload.organizationId,
            payload.eventId
          );
          const componentDoc = componentRef.doc(payload.compId);
          await componentDoc.delete();
          break;
        }
        default:
          break;
      }
    }
    const eventDoc = eventRef.doc(payload.id);
    await eventDoc.delete();
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

export const saveLobbyEventComponentApi = async (payload: any) => {
  try {
    const eventComponentRef = EventComponent.reference(
      payload.organizationId,
      payload.eventId
    ).doc(payload.id);
    const updatedPayload = omit(payload, ["eventId", "organizationId"]);
    eventComponentRef.set(updatedPayload);
    if (updatedPayload.componentRef) {
      const data = await updatedPayload.componentRef.get();
      if (data.data()) updatedPayload.lobby = data.data();
    }
    return updatedPayload;
  } catch (e) {
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
    console.error(String(e));
    return false;
  }
};

export const fetchComponentRef = async (
  selectedRow: any,
  organizationId: string,
  eventId: string
) => {
  try {
    if (
      selectedRow &&
      selectedRow.componentRef &&
      selectedRow.componentRef.path
    ) {
      const getRefencedData = await firestore
        .doc(selectedRow.componentRef.path)
        .get();
      if (
        selectedRow.type === MEETING_TYPES.MEETING_ROOM ||
        selectedRow.type === MEETING_TYPES.BROADCAST_ROOM
      ) {
        selectedRow.breakoutData = getRefencedData.data();
      } else if (selectedRow.type === MEETING_TYPES.SPONSOR_BOOTH) {
        selectedRow.sponsorData = getRefencedData.data();
        if (selectedRow.sponsorData?.sponsorLoungeRedirectToBreakout) {
          // get breakout data
          const breakoutRef = Breakout.reference(organizationId, eventId);
          const breakoutRefData = await breakoutRef
            .doc(selectedRow.sponsorData?.id)
            .get();
          selectedRow.breakoutData = breakoutRefData.data();
        }
      } else if (selectedRow.type === MEETING_TYPES.LOBBY) {
        selectedRow.lobby = getRefencedData.data();
      } else if (selectedRow.type === MEETING_TYPES.CALL_TO_ACTION) {
        selectedRow.callToAction = getRefencedData.data();
      }
    }
    return selectedRow;
  } catch (e) {
    console.error(String(e));
    return {};
  }
};
