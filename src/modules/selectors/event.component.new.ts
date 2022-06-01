import { IStoreState } from "modules/types";
import { MEETING_TYPES } from "@theme/commonfile";
export const getAllEventComponents = (state: IStoreState) =>
  state.eventComponentNew.eventComponents;
export const getSelectedEventComponents = (state: IStoreState) =>
  state.eventComponentNew.selectedRow;

export const getFetchingEventCompStatus = (state: IStoreState) =>
  state.eventComponentNew.fetchingEventComp;

export const getEventComponentData = (state: IStoreState) =>
  state.eventComponentNew.eventComponentData;

export const getDoubleClickedStatus = (state: IStoreState) =>
  state.eventComponentNew.isDoubleClicked;

export const getIVSData = (state: IStoreState) =>
  state.eventComponentNew.broadCastRoom;

export const getEventComponentViewType = (state: IStoreState) =>
  state.eventComponentNew.eventComponentViewType;

export const getCurrentEventId = (state: IStoreState) =>
  state.eventComponentNew.eventId;

export const getFilteredMeetingRoom = (state: IStoreState) =>
  state.eventComponentNew.eventComponents
    .map((val) => {
      return {
        ...val,
        value: val.title,
        label: val.title
      };
    })
    .filter(
      (val) =>
        val.componentType === MEETING_TYPES.MEETING_ROOM ||
        val.componentType === MEETING_TYPES.BROADCAST_ROOM
    );

export const getEventComponentsLobbyData = (state: IStoreState) =>
  state.eventComponentNew.eventComponents.find(
    (val) => val.componentType === "LOBBY"
  );

export const getCreatingEventStatus = (state: IStoreState) =>
  state.eventComponentNew.isCreatingEvent;
