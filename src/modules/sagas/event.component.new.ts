import { SagaIterator, eventChannel } from "redux-saga";
import {
  setEventComponentsNew,
  createEditEventComponentModal,
  setModalLoading,
  setEventComponentsRowSelectedNew,
  closeDeleteModal,
  // savePresentersInLookups,
  setBroadcastChannel,
  createEventComponentActions,
  setCurrentEventId,
  removeCurrentEventId,
  createdEventSuccess,
  fetchSponsorTypes,
  resetOrganizationData
} from "../actions";
import { ISagaAction } from "../types";
import * as eventComponentNewApi from "../utils/Firebase/CreateEvent/eventComponentNew";
import {
  call,
  put,
  select,
  all,
  take,
  fork,
  cancel,
  cancelled
} from "redux-saga/effects";
import * as selectors from "modules/selectors";
import {
  breakoutSegment,
  lobbySegment,
  callToActionSegment,
  sponsorSegment,
  loungeSegment
} from "../utils/eventComponent.types";
import { MEETING_TYPES } from "../../@theme/commonfile";
import { compactObject } from "modules/utils/commonFn";
import { get, cloneDeep } from "lodash";
import firebase from "firebase/app";
import { EventComponent } from "modules/utils/Firebase/Api";
import { toast } from "react-toastify";
import * as eventAPi from "modules/utils/Firebase/CreateEvent/Event";
// import { copyToClipboard } from "modules/utils";
// import moment from "moment-timezone";

export const saveEventComponentSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  // save data logic goes here
  try {
    const orgId = yield select(selectors.getOrganizationId);
    // const allEventComponents = yield select(selectors.getAllEventComponents);
    const currentUser = yield select(selectors.getUserProfile);

    yield put(setModalLoading(true));
    let requestPayload = null;
    let payload = action.payload;
    if (!("id" in action.payload)) {
      const ref = EventComponent.reference(orgId, action.payload.eventId).doc();
      payload = { ...payload, id: ref.id };
    }
    if (
      [MEETING_TYPES.BROADCAST_ROOM, MEETING_TYPES.MEETING_ROOM].includes(
        payload.componentType
      )
    ) {
      requestPayload = breakoutSegment(payload);
    }
    if ([MEETING_TYPES.LOBBY].includes(payload.componentType)) {
      requestPayload = compactObject(lobbySegment(payload));
      if (
        requestPayload &&
        requestPayload.keynotes &&
        requestPayload.keynotes.gradients &&
        !Array.isArray(requestPayload.keynotes.gradients)
      ) {
        requestPayload.keynotes.gradients = Object.values(
          requestPayload.keynotes.gradients
        );
      }
    }
    if ([MEETING_TYPES.CALL_TO_ACTION].includes(payload.componentType)) {
      requestPayload = compactObject(callToActionSegment(payload));
    }
    if ([MEETING_TYPES.SPONSOR_BOOTH].includes(payload.componentType)) {
      requestPayload = sponsorSegment(payload);
    }
    if ([MEETING_TYPES.NETWORKING_AREA].includes(payload.componentType)) {
      requestPayload = compactObject(loungeSegment(payload));
      yield call(eventComponentNewApi.setLoungeData, {
        ...requestPayload,
        organizationId: orgId,
        eventId: payload.eventId
      });
    }
    if (currentUser && currentUser.uid) {
      requestPayload.updatedBy = currentUser.uid;
    }
    const response = yield call(eventComponentNewApi.saveEventComponentApi, {
      ...requestPayload,
      organizationId: orgId,
      eventId: payload.eventId
    });
    if (response) {
      yield all([
        put(setModalLoading(false)),
        put(createEditEventComponentModal(false)),
        put(setEventComponentsRowSelectedNew(response))
      ]);
      // if ("id" in action.payload)
      //   yield put(setEventComponentsRowSelectedNew(response));
    }
  } catch (e) {
    yield put(setModalLoading(false));
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const deleteEventComponentSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  // delete component business logic goes her
  try {
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      ...action.payload,
      organizationId
    };
    let allEventComponents = yield select(selectors.getAllEventComponents);
    allEventComponents = allEventComponents.filter(
      (value: any) => value.id !== action.payload.id
    );
    yield put(setModalLoading(true));
    const response = yield call(
      eventComponentNewApi.deleteEventComponentApi,
      obj
    );
    yield put(setEventComponentsRowSelectedNew(null));
    if (response) {
      yield all([
        put(closeDeleteModal()),
        put(setModalLoading(false)),
        put(setEventComponentsNew(allEventComponents)),
        put(setEventComponentsRowSelectedNew(null))
      ]);
    }
  } catch (e) {
    yield put(setModalLoading(false));
    console.error(String(e))
    toast.error(e.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });
  }
};

export const createBroadcastChannelSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const orgId = yield select(selectors.getOrganizationId);
    let ivsdata = yield select(selectors.getIVSData);
    const eventData = yield select(selectors.getEventComponentData);
    if (!(eventData && eventData.channelName)) {
      toast.error("Channel name is required", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      return;
    }
    if (ivsdata && ivsdata.length > 0 && !ivsdata.message) {
      if (
        !(
          ivsdata[0].channel.tags.organizationId === orgId &&
          ivsdata[0].channel.tags.eventId === action.payload.eventId
        )
      ) {
        ivsdata = null;
        console.log("old IVS data, fetching new...");
      }
    }
    if (!ivsdata || ivsdata.message || action.payload.isCreate) {
      if (
        ivsdata &&
        ivsdata.find(
          (x: any) =>
            x.channel.name === eventData.channelName.split(" ").join("_")
        )
      ) {
        toast.error("Channel is already exist.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
        return;
      }
      // firebase.functions().useFunctionsEmulator("http://localhost:5001");
      const ivsFetchChannel = firebase
        .functions()
        .httpsCallable("ivsFetchChannel");
      try {
        const response = yield all([
          put(setModalLoading(true)),
          call(ivsFetchChannel, {
            eventId: action.payload.eventId,
            isCreate: action.payload.isCreate,
            isShoFloRequired: false,
            channelName: eventData.channelName || "",
            organizationId: orgId,
            baseUrl:
              process.env.REACT_APP_ENVIRONMENT === "development"
                ? "https://admin.tops.com"
                : "https://admin.tops.com
          })
        ]);
        yield put(setModalLoading(false));
        const iVSChannelResponse = response[1];
        if (iVSChannelResponse && iVSChannelResponse.data) {
          if (iVSChannelResponse.data && !iVSChannelResponse.data.message) {
            ivsdata = iVSChannelResponse.data;
            // yield put(setBroadcastChannel(ivsdata));
            const eventDta = cloneDeep(eventData);
            try {
              const selectedChannel = ivsdata.find(
                (x: any) =>
                  x.channel.name === eventData.channelName.split(" ").join("_")
              );
              if (selectedChannel) {
                eventDta.channelName = get(selectedChannel, "channel.name", "");
                eventDta.presenterUrl = get(
                  selectedChannel,
                  "shoFlo.presenterUrl",
                  ""
                );
                eventDta.directorUrl = get(
                  selectedChannel,
                  "shoFlo.directorUrl",
                  ""
                );
                eventDta.streamKey = get(
                  selectedChannel,
                  "streamKey.value",
                  ""
                );
                eventDta.liveStreamSrc = get(
                  selectedChannel,
                  "channel.playbackUrl",
                  ""
                );
                eventDta.ingestEndpoint = get(
                  selectedChannel,
                  "channel.ingestEndpoint",
                  ""
                );
                yield put(createEventComponentActions(eventDta));
              }
            } catch (e) {
              console.log(e);
            }
          } else if (iVSChannelResponse.data.message) {
            toast.error(iVSChannelResponse.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000
            });
          }
        }
      } catch (e) {
        yield put(setModalLoading(false));
      }
    }
  } catch (e) {
    console.error(String(e))
  }
};

export const createShoFloSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    const orgId = yield select(selectors.getOrganizationId);
    const ivsdata = yield select(selectors.getIVSData);
    const eventData = yield select(selectors.getEventComponentData);
    if (!(eventData && eventData.channelName)) {
      toast.error("Channel name is required", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      return;
    }
    if (!(eventData && eventData.liveStreamSrc)) {
      toast.error("Playback url is required", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      return;
    }
    if (!(eventData && eventData.streamKey)) {
      toast.error("Secret key is required", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      return;
    }
    if (!(eventData && eventData.ingestEndpoint)) {
      toast.error("Ingest endpoint is required", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
      return;
    }
    // const existingShoFlo = ivsdata.find(
    //   (x: any) =>
    //     x.channel.playbackUrl === eventData.liveStreamSrc &&
    //     x.streamKey.value === eventData.streamKey &&
    //     x.channel.ingestEndpoint === eventData.ingestEndpoint
    // );
    // if (
    //   ivsdata &&
    //   existingShoFlo &&
    //   existingShoFlo.shoFlo &&
    //   existingShoFlo.shoFlo.createdAt &&
    //   moment(existingShoFlo.shoFlo.createdAt).add("days", 30).unix() >
    //     moment().utc().unix()
    // ) {
    //   const eventDta = cloneDeep(eventData);
    //   eventDta.presenterUrl = existingShoFlo.shoFlo.presenterUrl;
    //   eventDta.directorUrl = existingShoFlo.shoFlo.directorUrl;
    //   yield put(createEventComponentActions(eventDta));
    //   return;
    // }
    // firebase.functions().useFunctionsEmulator("http://localhost:5000");
    const ivsFetchChannel = firebase.functions().httpsCallable("shoFlo");
    try {
      const response = yield all([
        put(setModalLoading(true)),
        call(ivsFetchChannel, {
          eventId: action.payload.eventId,
          channelName: eventData.channelName || "",
          organizationId: orgId,
          playbackUrl: eventData.liveStreamSrc,
          ingestEndpoint: eventData.ingestEndpoint,
          streamKey: eventData.streamKey,
          baseUrl:
            process.env.REACT_APP_ENVIRONMENT === "development"
              ? "https://admin.tops.com"
              : "https://admin.tops.com"
        })
      ]);

      const shoFloResponse = response[1];
      if (shoFloResponse && shoFloResponse.data) {
        if (shoFloResponse.data && !shoFloResponse.data.message) {
          const clonnedIvsdata = cloneDeep(ivsdata);
          let existingDataIndex = -1;
          try {
            existingDataIndex = clonnedIvsdata.findIndex(
              (x: any) =>
                x.streamKey.value === shoFloResponse.data.streamKey.value
            );
          } catch (e) { }
          if (existingDataIndex !== -1) {
            clonnedIvsdata[existingDataIndex] = shoFloResponse.data;
          } else {
            clonnedIvsdata.push(shoFloResponse.data);
          }
          // yield put(setBroadcastChannel(clonnedIvsdata));
          const eventDta = cloneDeep(eventData);
          try {
            const selectedChannel = clonnedIvsdata.find(
              (x: any) =>
                x.channel.name === eventData.channelName.split(" ").join("_")
            );
            if (selectedChannel) {
              eventDta.channelName = get(selectedChannel, "channel.name", "");
              eventDta.presenterUrl = get(
                selectedChannel,
                "shoFlo.presenterUrl",
                ""
              );
              eventDta.directorUrl = get(
                selectedChannel,
                "shoFlo.directorUrl",
                ""
              );
              eventDta.streamKey = get(selectedChannel, "streamKey.value", "");
              eventDta.liveStreamSrc = get(
                selectedChannel,
                "channel.playbackUrl",
                ""
              );
              eventDta.ingestEndpoint = get(
                selectedChannel,
                "channel.ingestEndpoint",
                ""
              );
              yield put(createEventComponentActions(eventDta));

              // if (action.payload.isCopyShoFlo) {
              //   yield call(
              //     copyToClipboard,
              //     get(shoFloResponse, "data.shoFlo.directorUrl", "")
              //   );
              //   toast.success("Shoflo director URL copied to clipboard", {
              //     position: toast.POSITION.TOP_CENTER,
              //     autoClose: 3000
              //   });
              // } else if (action.payload.isCopySpeakerUrl) {
              //   yield call(
              //     copyToClipboard,
              //     get(shoFloResponse, "data.shoFlo.presenterUrl", "")
              //   );

              //   toast.success("URL copied to clipboard", {
              //     position: toast.POSITION.TOP_CENTER,
              //     autoClose: 3000
              //   });
              // }
            }
          } catch (e) {
            console.log(e);
          }
        } else if (shoFloResponse.data.message) {
          toast.error(shoFloResponse.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          });
        }
      }
      yield put(setModalLoading(false));
    } catch (e) {
      yield put(setModalLoading(false));
    }
  } catch (e) {
    console.error(String(e))
  }
};

// export const fetchBroadcastChannelSaga = function* (
//   action: ISagaAction<any>
// ): SagaIterator {
//   try {
//     const orgId = yield select(selectors.getOrganizationId);
//     const data = yield call(eventComponentNewApi.getEventIVSData, {
//       organizationId: orgId,
//       eventId: action.payload.eventId
//     });
//     yield put(setBroadcastChannel(data));
//   } catch (e) {}
// };

export const fetchBroadcastChannelListener = function* (): SagaIterator {
  while (yield take(setCurrentEventId)) {
    const connectionTask = yield fork(fetchBroadcastChannelSaga);
    // wait for the user stop action
    yield take(removeCurrentEventId);

    yield cancel(connectionTask);
  }
};
export const fetchBroadcastChannelSaga = function* (): SagaIterator {
  try {
    const eventId = yield select(selectors.getCurrentEventId);
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      organizationId,
      eventId
    };

    const channel = yield call(eventComponentNewApi.getEventIVSData, obj);
    try {
      while (true) {
        const result = yield take(channel);
        if (result && Array.isArray(result)) {
          yield put(setBroadcastChannel(result));
        } else {
          yield put(setBroadcastChannel([]));
        }
      }
    } catch (e) {
      console.warn(e);
    } finally {
      // unregister listener if the saga was cancelled
      if (yield cancelled()) {
        channel.close();
      }
    }
  } catch (e) {
    console.error(String(e))
  }
};

export const fetchEventComponentListemer = function* (): SagaIterator {
  while (yield take(setCurrentEventId)) {
    const connectionTask = yield fork(FetchAllEventComponents);
    // wait for the user stop action
    yield take([removeCurrentEventId, resetOrganizationData]);

    yield cancel(connectionTask);
  }
};
export const FetchAllEventComponents = function* (): SagaIterator {
  try {
    const eventId = yield select(selectors.getCurrentEventId);
    const organizationId = yield select(selectors.getOrganizationId);
    const obj = {
      organizationId,
      eventId
    };
    const channel = yield call(getComponents, obj);
    try {
      while (true) {
        const result = yield take(channel);
        if (result && typeof result === "object") {
          yield put(setEventComponentsNew(result || []));
        } else {
          yield put(setEventComponentsNew([]));
        }
      }
    } catch (e) {
      console.warn(e);
    } finally {
      // unregister listener if the saga was cancelled
      if (yield cancelled()) {
        channel.close();
        yield put(setEventComponentsNew([]));
      }
    }
  } catch (e) {
    console.error(String(e))
  }
};

const getComponents = (props: any) => {
  const eventComponentRef = EventComponent.reference(
    props.organizationId,
    props.eventId
  );

  const connectionRoomListner = eventChannel((emit) => {
    const unsubscribe = eventComponentRef.onSnapshot(
      (querySnapshot: firebase.firestore.QuerySnapshot) => {
        if (querySnapshot.docs) {
          return emit(querySnapshot.docs.map((x: any) => x.data()));
        } else return emit(false);
      }
    );
    return () => {
      unsubscribe();
    };
  });
  return connectionRoomListner;
};

export const createEventAtInitial = function* (
  action: ISagaAction<any>
): SagaIterator {
  const response = yield call(eventAPi.createEvent, action.payload);
  if (response?.data?.data?.status) {
    yield all([
      put(createdEventSuccess(false)),
      put(fetchSponsorTypes({ eventId: action.payload.eventId }))
    ]);
  }
};

export const updateLobbyKeynoteSaga = function* (
  action: ISagaAction<any>
): SagaIterator {
  try {
    try {
      const eventId = yield select(selectors.getCurrentEventId);
      const organizationId = yield select(selectors.getOrganizationId);
      const payload = compactObject(lobbySegment(action.payload));
      if (action.payload.keynotes?.roomIds) {
        payload.keynotes.roomIds = action.payload.keynotes?.roomIds;
      }
      if (
        payload &&
        payload.keynotes &&
        payload.keynotes.gradients &&
        !Array.isArray(payload.keynotes.gradients)
      ) {
        payload.keynotes.gradients = Object.values(payload.keynotes.gradients);
      }
      yield call(eventComponentNewApi.saveEventComponentApi, {
        ...payload,
        organizationId,
        eventId
      });
    } catch (e) {
      console.warn(e);
    }
  } catch (e) {
    console.error(String(e))
  }
};
