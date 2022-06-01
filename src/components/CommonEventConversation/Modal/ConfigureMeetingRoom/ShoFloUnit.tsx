import React, { useEffect, useMemo, useRef, useState } from "react";
import { UIButton } from "@theme";
import { Col } from "react-bootstrap";
import { cloneDeep } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import styled from "styled-components";
import { copyToClipboard } from "modules/utils";
import { createEventComponentActions } from "modules/actions";
import { toast } from "react-toastify";
import { ToolTip } from "components";

const BroadCastTypeSpan = styled.span<{ isSteamType?: boolean }>`
  ${(props) => props.isSteamType && `color: rgba(40, 55, 71, 1) !important;`}
`;
const ShoFloUnit = () => {
  const eventData = useSelector(selectors.getEventComponentData);
  const isModalLoading = useSelector(selectors.getModalLoading);
  const dispatch = useDispatch();
  const ivsdata = useSelector(selectors.getIVSData);
  const eventState = useSelector(selectors.getEventState);
  const previousEventData = useRef(eventData);
  const ivsDatas = useSelector(selectors.getIVSData);
  const [isApiCalling, setApiCalling] = useState<string | null>(null);
  const currentSelectedIVSData = useMemo(() => {
    const playbackUrl = eventData.liveStreamSrc;
    return (ivsDatas || []).find(
      (x) => x.channel.playbackUrl === playbackUrl || ""
    );
  }, [eventData?.liveStreamSrc, ivsDatas]);
  const createShoFlo = () => {
    if (eventData.type === "stream") {
      dispatch(
        actions.createShoFlo({
          eventId: eventState.id || ""
        })
      );
    }
  };

  useEffect(() => {
    if (!isModalLoading && isApiCalling) {
      if (isApiCalling === "directorurl" && eventData?.directorUrl) {
        copyToClipboard(eventData?.directorUrl);
        toast.success("Shoflo director URL copied to clipboard", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
      } else if (isApiCalling === "speakerUrl" && eventData?.presenterUrl) {
        copyToClipboard(eventData?.presenterUrl);
        toast.success("Shoflo director URL copied to clipboard", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
      }
      setApiCalling(null);
    }
  }, [isApiCalling, isModalLoading, eventData]);

  const copyShoFlo = () => {
    setApiCalling("directorurl");
    dispatch(
      actions.createShoFlo({
        eventId: eventState.id || "",
        isCopyShoFlo: true
      })
    );
  };

  const copySpeakerUrl = () => {
    setApiCalling("speakerUrl");
    dispatch(
      actions.createShoFlo({
        eventId: eventState.id || "",
        isCopySpeakerUrl: true
      })
    );
  };

  const toastCopy = () =>
    toast.success("URL copied to clipboard", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });

  useEffect(() => {
    if (
      previousEventData.current.streamKey !== eventData.streamKey ||
      previousEventData.current.ingestEndpoint !== eventData.ingestEndpoint
    ) {
      if (ivsdata) {
        const existingShoFlo = ivsdata.find(
          (x: any) =>
            x.streamKey.value === eventData.streamKey &&
            x.channel.ingestEndpoint === eventData.ingestEndpoint
        );
        const eventDta = cloneDeep(eventData);
        if (ivsdata && existingShoFlo && existingShoFlo.shoFlo) {
          if (existingShoFlo.shoFlo.directorUrl !== eventData.directorUrl) {
            eventDta.presenterUrl = existingShoFlo.shoFlo.presenterUrl;
            eventDta.directorUrl = existingShoFlo.shoFlo.directorUrl;
            previousEventData.current = eventDta;
            dispatch(createEventComponentActions(eventDta));
          }
        } else {
          if (eventData.directorUrl !== "") {
            eventDta.presenterUrl = "";
            eventDta.directorUrl = "";
            previousEventData.current = eventDta;
            dispatch(createEventComponentActions(eventDta));
          }
        }
      }
    }
  }, [dispatch, ivsdata, eventData]);

  if (
    !currentSelectedIVSData ||
    (currentSelectedIVSData && !currentSelectedIVSData.shoFlo)
  ) {
    return eventData.ingestEndpoint ? (
      <React.Fragment>
        <Col
          md={12}
          lg={12}
          sm={12}
          xs={12}
          className={"text-center mt-4 mb-4"}
        >
          <UIButton
            border
            label={"Create Sho Flo"}
            disabled={
              eventData.type !== "stream" ||
              isModalLoading ||
              !eventData.channelName
            }
            onClick={createShoFlo}
          />
        </Col>
      </React.Fragment>
    ) : (
      <React.Fragment />
    );
  }
  return (
    <React.Fragment>
      <BroadCastTypeSpan className={"tops-label"} isSteamType={true}>
        Shortcut to access the studio (Url is Valid once for one device)
        <ToolTip
          infoText={`Because of the way Shoflo security works, you'll need a new link for each access to the studio as a director. Click on the button below to generate it and copy it to the clipboard. Note that this is NOT the case for speakers access`}
        />
      </BroadCastTypeSpan>

      <React.Fragment>
        <Col
          md={12}
          lg={12}
          sm={12}
          xs={12}
          className={"text-center mt-4 mb-4"}
        >
          <UIButton
            border
            disabled={isModalLoading}
            label={"Copy Studio Director Url"}
            onClick={copyShoFlo}
          />
        </Col>
      </React.Fragment>
      {/* <UIInput
        type='text'
        placeholder=''
        disabled
        className={"pr-5"}
        inputCopyIcon={eventData.directorUrl ? "icon-ic-copy-grey-1" : ""}
        inputInfoIconClick={() => copyToClipboard(eventData.directorUrl)}
        value={get(eventData, "directorUrl", "")}
      /> */}

      <BroadCastTypeSpan className={"tops-label"} isSteamType={true}>
        Shortcut to access the speaker
        <ToolTip
          infoText={
            "Because of the way Shoflo security works, you'll need a new link for each access to the studio as a director. Click on the button below to generate it and copy it to the clipboard. Note that this is NOT the case for speakers access"
          }
        />
      </BroadCastTypeSpan>
      <React.Fragment>
        <Col
          md={12}
          lg={12}
          sm={12}
          xs={12}
          className={"text-center mt-4 mb-4"}
        >
          <UIButton
            border
            label={"Copy Studio Speaker Url"}
            disabled={isModalLoading}
            onClick={() => {
              if (currentSelectedIVSData) {
                toastCopy();
                copyToClipboard(
                  currentSelectedIVSData?.shoFlo?.presenterUrl || ""
                );
              } else {
                copySpeakerUrl();
              }
            }}
          />
        </Col>
      </React.Fragment>
      {/* <UIInput
        type='text'
        placeholder=''
        disabled
        className={"pr-5"}
        inputCopyIcon={eventData.presenterUrl ? "icon-ic-copy-grey-1" : ""}
        inputInfoIconClick={() => copyToClipboard(eventData.presenterUrl)}
        value={get(eventData, "presenterUrl", "")}
      /> */}
    </React.Fragment>
  );
};
export default ShoFloUnit;
