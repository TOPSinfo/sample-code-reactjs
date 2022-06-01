import * as reducers from "modules/reducers";
import firebase from "modules/utils/Firebase";
import { IPresenter, IVirtualAgendaType } from "modules/reducers";

export interface IStoreState {
  readonly user: reducers.IUserReducer;
  readonly events: reducers.IEventsReducer;
  readonly userManagement: reducers.IUserManagementReducer;
  readonly modal: reducers.ModalReducerState;
  readonly organization: reducers.organizationReducerState;
  readonly settings: reducers.settingReducerState;
  readonly callToAction: reducers.ICallToReducerState;
  readonly meetingRoom: reducers.IMeetingRoomReducerState;
  readonly sponsors: reducers.ISponsorsReducer;
  readonly keynotes: reducers.IEventKeynotesList;
  readonly people: reducers.IPeopleListReducer;
  readonly breakout: reducers.IBreakoutReducerState;
  readonly eventRouting: reducers.IEventRoutingReducerState;
  readonly eventComponent: reducers.IEventComponentReducerState;
  readonly eventComponentNew: reducers.IEventComponentNewReducerState;
  readonly uploadContent: reducers.IContentReducer;
  readonly createEventState: reducers.ICreateEventReducerState;
  readonly eventRegistrees: reducers.IEventRegistreesReducerState;
  readonly documentation: reducers.IDocumentationReducerState;
  readonly polls: reducers.IPollsReducerState;
  readonly organizations: reducers.organizationsReducerState;
  readonly conversations: reducers.IConversationsReducer;
  readonly createConversationState: reducers.ICreateConversationReducerState;
  readonly conversationComponentNew: reducers.IConversationComponentNewReducerState;
  readonly conversationRegistrees: reducers.IConversationRegistreesReducerState;
  readonly discoveryRouting: reducers.IDiscoveryRoutingReducerState;
}

export interface ISagaAction<T> {
  readonly type: string;
  readonly payload: T;
  readonly error: boolean;
}

/* VIRTUAL EVENTS */
export interface IVirtualAgendaItem {
  _startDate: string;
  description: string;
  durationMinutes: number;
  id: string;
  title: string;
  type: IVirtualAgendaType;
  utcStartTimeMillis: number;
}

export interface IVirtualConference extends IVirtualAgendaItem {
  capacity: number;
  imageSrc: string;
  presenters: IPresenter[];
  roomUuid: string;
}

export type Registration = {
  createdAt: string;
  id: string;
  registered: boolean;
};

export type UserProfile = {
  attendeeType: string;
  emailAddress: string;
  eventId: string;
  familyName: string;
  fullName: string;
  givenName: string;
  jobTitle: string;
  organization: string;
  phone: number | string;
  token: string;
  tracks: Array<Registration>;
  uid: string;
  userId: string;
};

export interface Config {
  header: { display: boolean };
  footer: { display: boolean };
  navbar: { display: boolean };
}

export interface INavigation {
  path: string;
  exact: boolean;
  title: string;
  routes?: INavigation[];
  icon?: any;
  activeIcon?: any;
  isSidebarIcon: boolean;
  type?: string;
  redirect?: string;
  private?: boolean;
  roles?: string[];
  breadCrumb?: string[];
  breadCrumbs?: Array<{ path: string; title: string }>;
  settings?: INavigationSettings;
}

export interface INavigationSettings {
  layout: ISettingLayout;
}

export interface ISettingLayout {
  config: ISettingConfig;
}
export interface ISettingConfig {
  header: { display: boolean };
  footer: { display: boolean };
  navbar: { display: boolean };
}
export interface ISelect {
  value: string;
  label: string;
}

// create event interfcaes
export interface IWelcome {
  welBannerTagline: string;
  welHeroTitle: string;
  welSponsorsTitle: string;
  welHeroImage: string;
  welBgImage: string;
  welBannerImage: string;
  headerImage: string;
}

export interface IDays {
  day: string;
  hour: string;
  minute: string;
  duration: string;
  date: firebase.firestore.Timestamp;
  utcStartTimeMillis: number;
}

export interface ISponsorTypes {
  id?: string;
  order?: number;
  priority?: string;
  theme?: string;
  title?: string;
  type?: string;
}

interface IKeynoteApiData {
  id: string;
  title: string;
  description: string;
  card: {
    background: {
      imageUrl: string;
    };
    heading: string;
    description: string;
  };
  eventId: string;
  caption: string;
  durationMinutes: number;
  capacity: number;
  _startDate: string;
  _startTime: string;
  utcStartTimeMillis: number | null;
}
export interface ISponsors {
  id: string;
  html?: string;
  logoUrl?: string;
  mediaUrl?: string;
  name?: string;
  sponsorLoungeRedirectToBreakout?: boolean;
  isSponsorWelcome?: boolean;
  websiteUrl?: string;
  type?: string;
  eventId?: string;
  bgSponImageUrl?: string;
  isBoothVideo?: boolean;
  sponsorFollowupLabel: string;
  sponsorLoungeBtn: string;
  sponsorVisitWebsiteLabel: string;
}

export interface IEvent {
  eventName: string;
  timezone: string;
  eventWebsite: string;
  // headerImage: string;
  days: IDays[];
}

export interface ILobby {
  lobbyPageTitle: string;
  lobbyActionLabel: string;
  scheduleActionLabel: string;
  schedulePageTitle: string;
  sponsorsActionLabel: string;
  sponsorsPageTitle: string;
  visitWebsite: string;
  sponsorPageFollowUp: string;
  inviteLabel: string;
  invitePlaceholder: string;
  socialLabel: { label: string }[];
}

export interface ILounge {
  capacity: number;
  isLimitedCapacity: boolean;
  isHidden: boolean;
  meetingTables: {
    minTables: number;
    capacity: number;
    isNamedTable: boolean;
    meetingTableNames: Array;
  };
  bgImage?: string;
  // bgMusic?: string;
  id?: string;
  cardImg?: string;
  groupDiscuss: {
    maxGroupParticipant: number;
    isLimitDiscussGroup?: boolean;
    // isRandomMatch: boolean;
    // isGroupParticipant?: boolean;
    limitDicussionGroupTime?: number;
  };
  subTitle: string;
  // description: string;
}

export interface IKeynotes {
  showPresenter?: boolean;
  presenterModerator?: any[];
  title: string;
  description: string;
  detailsPageImage: string;
  cardBackgroundImage: string;
  cardHeading: string;
  cardDescription: string;
  cardStyle: string;
  type: string;
  date: string;
  hour: number;
  minute: number;
  timezone: string;
  duration: number;
  id: string;
  roomUuid: string;
}

export interface ITrack {
  trackName: string;
  date: string;
  hour: number;
  minute: number;
  duration: number;
  timezone: string;
  about: string;
  trackImage: string;
  orderInLobby: number;
  id: string;
  trackImageFilename: string;
  selectedOption?: ISelect;
}
export interface ISessions {
  sessionTitle: string;
  sessionDescription: string;
  date: string;
  hour: string;
  minute: string;
  duration: string;
  timezone: string;
  capacity: string;
  presenterModerator: string[];
  trackId: string;
  id: string;
}
export interface IPartnerSponsors {
  sponsorName: string;
  category: string;
  media: string;
  title: string;
  companyDescription: string;
  sponsorRepresentative: any[];
  id: string;
}
export interface IPresenters {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  title: string;
  description: string;
  imageSrc: string;
  type: string;
  // id: string;
}

export interface IPresentersApi {
  name: string;
  company: string;
  email: string;
  title: string;
  description: string;
  imageSrc: string;
  type: string;
  uid: string;
}
export interface IBreakoutRooms {
  presenterModerator: any[];
  name: string;
  description: string;
  capacity: string;
  image: string;
  duration: string;
  timezone: string;
  id: string;
  utcStartTimeMillis: number;
}

export interface RefObject {
  callWelcomeFn?: () => void | boolean;
  getWelcomeError?: () => boolean;
  callEventFn?: () => void | boolean;
  callLobbyFn?: () => void | boolean;
  callKeynotesFn?: () => void | boolean;
  callTracksFn?: () => void | boolean;
}

export interface IPayload {
  organizationId: string;
  eventId: string;
}

export interface IPayload {
  organizationId: string;
  eventId: string;
}

export interface ICallToAction {
  card: {
    background?: {
      imageUrl: string;
    };
    html: string;
    openUrl: string;
  };
  component: string;
  id: string;
  name?: string;
  order: number;
  isEditorActive?: boolean;
}

export interface IMeetingRoom {
  liveStreamSrc?: string;
  visible?: boolean;
  typeLabel?: string;
  order?: number;
  redirectUrl?: string;
  capacity: number;
  about: string;
  durationMinutes: number;
  id: string;
  title: string;
  type: IBreakoutType;
  utcStartTimeMillis: number;
  presenters: string[];
  id?: string;
}

export enum IBreakoutType {
  keynote = "keynote",
  interactive = "interactive",
  stream = "stream",
  breakout = "breakout",
  broadcast = "broadcast",
  informative = "informative"
}

export type IEvnetType = "conversation" | "event";

export type BreakoutType = "interactive" | "broadcast" | "stream" | "breakout";

export interface IBreakoutRoom {
  liveStreamSrc?: string;
  isLiveStream?: boolean;
  RTMPEndpoint?: string;
  visible?: boolean;
  typeLabel?: string;
  order?: number;
  redirectUrl?: string;
  capacity: number;
  isHidden?: boolean;
  about: string;
  ingestEndpoint?: string;
  streamKey?: string;
  durationMinutes: number;
  id: string;
  subTitle: string;
  channelName?: string;
  presenterUrl?: string;
  directorUrl?: string;
  broadcastType?: string;
  type: BreakoutType;
  utcStartTimeMillis: number;
  presenters: string[];
  moderators?: string[];
  tags?: {
    presenters: string[];
    moderators?: string[];
    others?: string[];
  };
  id?: string;
  isRoomChat?: boolean;
  waitingImageSrc?: string;
  backgroundImageSrc?: string;
  waitingNotifyTitle?: string;
  promoteSession?: boolean;
  autoRecord?: boolean;
  autoBreakoutGroupRecord?: boolean;
  breakoutRoom?: {
    type: string;
    attendeeReJoin: boolean;
  };
}

export interface IEventComponentsNew
  extends IBreakoutData,
    ISponsorsData,
    ICallToAction,
    IEventLobby {
  id: string;
  title: string;
  componentType: string;
  updatedAt: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
}
export interface IConversationComponentsNew
  extends IBreakoutData,
    ISponsorsData,
    ICallToAction,
    IEventLobby {
  id: string;
  title: string;
  componentType: string;
  updatedAt: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
}
export interface IBroadCastChannel {
  channel: {
    playbackUrl: string;
    ingestEndpoint: string;
    arn: string;
    name: string;
    tags: {
      organizationId: string;
      eventId: string;
    };
  };
  streamKey: {
    value: string;
  };
  shoFlo?: {
    presenterUrl: string;
    directorUrl: string;
    createdAt?: number;
  };
}
export interface IEventcomponents {
  breakoutData?: IBreakoutData;
  componentRef: any;
  id: string;
  name: string;
  type: string;
  updatedAt: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  utcStartTimeMillis: number;
  visible?: boolean;
  sponsorData?: ISponsorsData;
  lobby?: any;
  callToAction?: ICallToAction;
}

export interface ISponsorsData {
  eventId: string;
  html?: string;
  id: string;
  isSponsorWelcome: boolean;
  logoUrl?: string;
  mediaUrl?: string;
  subTitle?: string;
  about?: string;
  name: string;
  organizationId: string;
  sponsorLoungeRedirectToBreakout?: boolean;
  type?: string;
  websiteUrl?: string;
  visible?: boolean;
  presenters?: any[];
  moderators?: any[];
  bgSponImageUrl?: string;
  isBoothVideo?: boolean;
  sponsorFollowupLabel: string;
  sponsorVisitWebsiteLabel: string;
  sponsorLoungeBtn: string;
}

export interface IBreakoutData {
  capacity?: number;
  durationMinutes: number;
  id: string;
  title: string;
  type: string;
  isHidden: boolean;
  utcStartTimeMillis: number;
  visible: boolean;
  presenters: any[];
  moderators: any[];
  tags: {
    presenters: any[];
    moderators: any[];
    others: any[];
  };
}

export interface IEventHeaderProps {
  titleHtml: string;
  imageUrl: any;
}
export interface ICreateEventComponentProperty
  extends IBreakoutRoom,
    ISponsors,
    IEventLobby,
    ICallToAction,
    ILobby,
    ILounge {
  title: string;
  componentType: string;
  id?: string;
}

export interface ICreateConversationComponentProperty
  extends IBreakoutRoom,
    ISponsors,
    IEventLobby,
    ICallToAction,
    ILobby,
    ILounge {
  title: string;
  componentType: string;
  id?: string;
}

export interface ICreateEventProperty {
  name: string;
  type: any;
  utcStartTimeMillis: number;
  componentRef: any;
  breakoutData?: IBreakoutRoom;
  compId?: string;
  sponsorData?: ISponsors;
  sponsorId?: string;
  id?: string;
  lobby?: IEventLobby;
  callToAction?: ICallToAction;
}

export interface ICreateConversationProperty {
  name: string;
  type: any;
  utcStartTimeMillis: number;
  componentRef: any;
  breakoutData?: IBreakoutRoom;
  compId?: string;
  sponsorData?: ISponsors;
  sponsorId?: string;
  id?: string;
  lobby?: IEventLobby;
  callToAction?: ICallToAction;
}

export interface IEventLobby {
  header?: IEventHeaderProps;
  social?: ISocialTags;
  keynotes?: IKeynotesProps;
  sponsors?: {
    action: {
      label: string;
    };
    page: {
      title: string;
      bgImage: string;
    };
  };

  conference?: {
    sponsorTypeText: string;
    isChatActive: boolean;
    sponsorDisplayInKeynote: string;
  };
  invite?: {
    label: string;
    placeholder: string;
    showInvitee: boolean;
  };
  action?: {
    label: string;
  };
  schedule?: {
    page: {
      title: string;
    };
    action: {
      label: string;
    };
  };
  // lounge: ILounge;
}
export interface ISocialTags {
  label: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}
export interface IKeynotesProps {
  activeKeynoteText: string;
  expiredKeynoteText: string;
  lobbyDescription: string;
  _startDate: string;
  utcStartTimeMillis: number;
  lobbyTitle: string;
  // lobbyTitleBackground: string;
  showSpeakers: string;
  showTimer: string;
  showKeynoteSection: boolean;
  durationMinutes: number;
  gradients?: string[];
  hasGradient?: boolean;
  card: {
    background: {
      imageUrl: string;
    };
    description: string;
  };
  roomId?: string;
  automaticJoin?: boolean;
  roomIds?: string[];
  roomAutomaticJoin?: any;
  relativePath?: string;
}

export interface IEventList {
  title?: string;
  name?: string;
  description?: number;
  status: "Final" | "Draft" | "opened";
  utcStartTimeMillis: number;
  isChecked?: boolean;
  isDeleted?: boolean;
  id: string;
  days: IDays[];
}

export interface IConversationList {
  title?: string;
  name?: string;
  description?: number;
  status: "Final" | "Draft" | "opened";
  utcStartTimeMillis: number;
  isChecked?: boolean;
  isDeleted?: boolean;
  id: string;
  days: IDays[];
}

export interface IEventSavingStatus {
  isChangeLoader: boolean;
  isSavedloader: boolean;
}

export interface IUser {
  firstName: string;
  email: string;
  lastName: string;
  jobTitle?: string;
  organization?: string;
  organizationId?: string;
  roles?: object;
  uid?: string;
  companyName: string;
  workLocation: string;
}

export interface CreateEventStateProps {
  name: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  timezone: any;
  status: string;
  websiteUrl: string;
  access: AttendeeRegistrationProps;
  id?: string;
  currentSelectedTab: string;
  updatedAt: any;
  createdAt: any;
  welcome: IEventWelcomeProps;
  theme: IThemeHeaderProps;
  organizationId: string;
  utcStartTimeMillis?: number;
}

export interface CreateConversationStateProps {
  name: string;
  title: string;
  subTitle: string;
  startDate: string;
  componentType: string;
  startTime: string;
  timezone: any;
  status: string;
  description: string;
  thirdPartyUrl: string;
  id?: string;
  currentSelectedTab: string;
  updatedAt: any;
  createdAt: any;
  organizationId: string;
  access: AttendeeRegistrationProps;
  videoPlatform: string;
  roomType: string;
  isConversationLounge: boolean;
  isDisabled: boolean;
  welcome: IEventWelcomeProps;
  theme: IThemeHeaderProps;
}

export interface AttendeeRegistrationProps {
  requiresRegistration?: boolean;
  isSignInWithEmailRequired?: boolean;
  link?: {
    preview: boolean;
  };
}

export interface IThemeHeaderProps {
  fillColorOverlay: string;
  fillColorOpacity: string;
  buttonColor?: string;
  sidePanelTextColor: string;
  bannerColor: string;
  bannerColorOpacity: string;
  landingBannerTextColor: string;
}

export interface IHero {
  type: string;
  deck?: string;
  heading: string;
  description: string;
  thumbnail: string;
  video?: string;
  backdrop?: string;
  bodyBgColor: string;
}

export interface IVideoHighlights {
  deck: string;
  heading: string;
  description: string;
  thumbnail: string;
  video: string;
  bodyBgColor: string;
}
