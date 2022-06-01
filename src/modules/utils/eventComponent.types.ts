import {
  IBreakoutRoom,
  IEventLobby,
  ICallToAction,
  ISponsorsData,
  ILounge
} from "../types";

const breakoutSegment = (
  data: any
): {
  id: string;
  title: string;
  componentType: string;
} & IBreakoutRoom => ({
  id: data.id,
  title: data.title,
  isHidden: data.isHidden,
  componentType: data.componentType,
  isLiveStream: data.isLiveStream,
  liveStreamSrc: data.liveStreamSrc,
  RTMPEndpoint: data.RTMPEndpoint,
  visible: data.visible,
  typeLabel: data.typeLabel,
  order: data.order,
  redirectUrl: data.redirectUrl,
  broadcastType: data.broadcastType,
  capacity: data.capacity,
  breakoutRoom: {
    attendeeReJoin: data?.breakoutRoom?.attendeeReJoin ?? false,
    type: data?.breakoutRoom?.type ?? "none"
  },
  about: data.about,
  durationMinutes: data.durationMinutes,
  ingestEndpoint: data.ingestEndpoint,
  channelName: data.channelName,
  // presenterUrl: data.presenterUrl,
  // directorUrl: data.directorUrl,
  streamKey: data.streamKey,
  subTitle: data.subTitle,
  type: data.type,
  utcStartTimeMillis: data.utcStartTimeMillis,
  presenters: data.presenters,
  moderators: data.moderators,
  tags: data.tags,
  isRoomChat: data.isRoomChat,
  waitingImageSrc: data.waitingImageSrc,
  backgroundImageSrc: data.backgroundImageSrc,
  waitingNotifyTitle: data.waitingNotifyTitle,
  promoteSession: data.promoteSession,
  autoRecord: data.autoRecord,
  autoBreakoutGroupRecord: data.autoBreakoutGroupRecord
});
const lobbySegment = (
  data: any
): {
  id: string;
  title: string;
  componentType: string;
} & IEventLobby => ({
  id: data.id,
  title: data.title,
  componentType: data.componentType,
  header: {
    titleHtml: data?.header?.titleHtml,
    imageUrl: data?.header?.imageUrl
  },
  social: {
    label: data?.social?.label,
    twitter: data?.social?.twitter,
    facebook: data?.social?.facebook,
    linkedin: data?.social?.linkedin,
    youtube: data?.social?.youtube,
    instagram: data?.social?.instagram
  },
  keynotes: {
    activeKeynoteText: data?.keynotes?.activeKeynoteText,
    expiredKeynoteText: data?.keynotes?.expiredKeynoteText,
    lobbyDescription: data?.keynotes?.lobbyDescription,
    _startDate: data?.keynotes?._startDate,
    utcStartTimeMillis: data?.keynotes?.utcStartTimeMillis,
    lobbyTitle: data?.keynotes?.lobbyTitle,
    showSpeakers: data?.keynotes?.showSpeakers,
    showTimer: data?.keynotes?.showTimer,
    durationMinutes: data?.keynotes?.durationMinutes,
    card: {
      background: {
        imageUrl: data?.keynotes?.card?.background?.imageUrl
      },
      description: data?.keynotes?.card?.description
    },
    roomId: data?.keynotes?.roomId,
    gradients: data?.keynotes?.gradients,
    hasGradient: data?.keynotes?.hasGradient,
    roomIds: data?.keynotes?.roomIds,
    roomAutomaticJoin: data?.keynotes?.roomAutomaticJoin,
    automaticJoin: data?.keynotes?.automaticJoin,
    relativePath: data?.keynotes?.relativePath,
    showKeynoteSection: data?.keynotes?.showKeynoteSection
  },
  sponsors: {
    action: {
      label: data?.sponsors?.action?.label
    },
    page: {
      title: data?.sponsors?.page?.title,
      bgImage: data?.sponsors?.page?.bgImage
    }
  },
  conference: {
    sponsorTypeText: data?.conference?.sponsorTypeText,
    isChatActive: data?.conference?.isChatActive,
    sponsorDisplayInKeynote: data?.conference?.sponsorDisplayInKeynote
  },
  invite: {
    label: data?.invite?.label,
    placeholder: data?.invite?.placeholder,
    showInvitee: data?.invite?.showInvitee
  },
  action: {
    label: data?.action?.label
  },
  schedule: {
    page: {
      title: data?.schedule?.page?.title
    },
    action: {
      label: data?.schedule?.action?.label
    }
  }
});

const callToActionSegment = (
  data: any
): {
  id: string;
  title: string;
  componentType: string;
} & ICallToAction => ({
  id: data.id,
  title: data?.title,
  componentType: data?.componentType,
  card: {
    background: {
      imageUrl: data?.card?.background?.imageUrl
    },
    html: data?.card?.html,
    openUrl: data?.card?.openUrl
  },
  component: data?.component,
  name: data?.name,
  order: data?.order,
  isEditorActive: data?.isEditorActive
});

const sponsorSegment = (
  data: any
): {
  id: string;
  title: string;
  componentType: string;
} & ISponsorsData => ({
  id: data.id,
  title: data?.title, // data?.title,
  componentType: data?.componentType,
  name: data?.name,
  eventId: data?.eventId,
  html: data?.html,
  isSponsorWelcome: data?.isSponsorWelcome,
  mediaUrl: data?.mediaUrl,
  logoUrl: data?.logoUrl,
  subTitle: data?.name,
  about: `Breakout room for sponsor - ${data?.name}`,
  organizationId: data?.organizationId,
  sponsorLoungeRedirectToBreakout: data?.sponsorLoungeRedirectToBreakout,
  type: data?.type,
  visible: false,
  presenters: data?.presenters,
  moderators: data?.moderators,
  websiteUrl: data?.websiteUrl,
  bgSponImageUrl: data?.bgSponImageUrl,
  isBoothVideo: data?.isBoothVideo,
  sponsorFollowupLabel: data?.sponsorFollowupLabel,
  sponsorVisitWebsiteLabel: data?.sponsorVisitWebsiteLabel,
  sponsorLoungeBtn: data?.sponsorLoungeBtn
});

const eventSegment = (data: any) => ({
  name: data?.name,
  title: data?.title,
  description: data?.description,
  startDate: data?.startDate,
  startTime: data?.startTime,
  timezone: data?.timezone,
  websiteUrl: data?.websiteUrl,
  access: {
    requiresRegistration: data?.access?.requiresRegistration,
    isSignInWithEmailRequired: data?.access?.isSignInWithEmailRequired,
    link: {
      preview: data?.access?.link?.preview
    }
  },
  id: data?.id,
  status: data?.status,
  updatedAt: data?.updatedAt,
  createdAt: data?.createdAt,
  welcome: {
    background: {
      imageUrl: data?.welcome?.background?.imageUrl
    },
    banner: {
      tagline: data?.welcome?.banner.tagline,
      imageUrl: data?.welcome?.banner.imageUrl
    },
    hero: {
      title: data?.welcome?.hero?.title,
      imageUrl: data?.welcome?.hero?.imageUrl
    },
    sponsors: {
      title: data?.welcome?.sponsors?.title,
      visible: data?.welcome?.sponsors?.visible,
      list: data?.welcome?.sponsors?.list
    },
    favicon: {
      imageUrl: data?.welcome?.favicon?.imageUrl
    }
  },
  theme: {
    fillColorOverlay: data?.theme?.fillColorOverlay,
    fillColorOpacity: data?.theme?.fillColorOpacity,
    buttonColor: data?.theme?.buttonColor
  },
  organizationId: data.organizationId,
  utcStartTimeMillis: data?.utcStartTimeMillis
});

const loungeSegment = (
  data: any
): {
  id: string;
  title: string;
  componentType: string;
} & ILounge => ({
  id: data?.id,
  title: data?.title, // data?.title,
  componentType: data?.componentType,
  capacity: data?.capacity,
  isHidden: data?.isHidden,
  isLimitedCapacity: data?.isLimitedCapacity,
  meetingTables: {
    minTables: data?.meetingTables?.minTables,
    capacity: data?.meetingTables?.capacity,
    isNamedTable: data?.meetingTables?.isNamedTable,
    meetingTableNames: data?.meetingTables?.meetingTableNames
  },

  bgImage: data?.bgImage,
  cardImg: data?.cardImg,
  groupDiscuss: {
    maxGroupParticipant: data?.groupDiscuss?.maxGroupParticipant,
    isLimitDiscussGroup: data?.groupDiscuss?.isLimitDiscussGroup,
    // isRandomMatch: data?.groupDiscuss?.isRandomMatch,
    // isGroupParticipant: data?.groupDiscuss?.isGroupParticipant,
    limitDicussionGroupTime: data?.groupDiscuss?.limitDicussionGroupTime
  },
  subTitle: data?.subTitle
  // description: data?.description
});
export {
  breakoutSegment,
  lobbySegment,
  callToActionSegment,
  sponsorSegment,
  eventSegment,
  loungeSegment
};
