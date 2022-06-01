import { INavigation } from "modules/types";
import { authRoles } from "modules/utils/RouteAuth";
import mic from "assets/img/icons/speaker.svg";
import calendar from "assets/img/icons/calendar.svg";
import CalendarActive from "assets/img/icons/calendar-active.svg";

const routes: INavigation[] = [
  {
    path: "/",
    exact: true,
    icon: mic,
    title: "Dashboard",
    private: true,
    redirect: "/dashboard",

    isSidebarIcon: false,
    breadCrumbs: [{ path: "/dashboard", title: "Dashboard" }]
  },
  {
    path: "/login",
    title: "Login",

    exact: false,
    private: false,
    isSidebarIcon: false,
    breadCrumbs: [{ path: "/login", title: "Login" }]
  },
  {
    path: "/events",
    title: "Events",

    icon: calendar,
    roles: authRoles.admin,
    activeIcon: CalendarActive,
    exact: true,
    private: true,
    isSidebarIcon: true,
    breadCrumbs: [{ path: "/events", title: "Events" }]
  },
  {
    path: "/forgot-password",
    title: "Forgot Password",

    exact: true,
    private: false,
    isSidebarIcon: false,
    breadCrumbs: [{ path: "/forgot-password", title: "Forgot Password" }]
  },
  {
    path: "/events/create-event/:stages/:eventId?",
    title: "CreateEvent",

    exact: true,
    private: true,
    roles: authRoles.admin,
    isSidebarIcon: false,
    breadCrumbs: [
      { path: "/events", title: "Events" },
      { path: "/events/create-event/event", title: "Create Event" },
      { path: "/events/create-event/event", title: "event" }
    ],
    routes: [
      {
        path: "/events/create-event/event/:eventId?",
        title: "CreateEvent",
        exact: true,
        private: true,
        isSidebarIcon: false,
        breadCrumbs: [
          { path: "/events", title: "Events" },
          { path: "/events/create-event/event", title: "Create Event" },
          { path: "/events/create-event/event", title: "Event" }
        ]
      },
      {
        path: "/events/create-event/lobby/:eventId?",
        title: "CreateEvent",
        exact: true,
        private: true,
        isSidebarIcon: false,
        breadCrumbs: [
          { path: "/events", title: "Events" },
          { path: "/events/create-event/event", title: "Create Event" },
          { path: "/create-event/lobby", title: "Lobby" }
        ]
      },
      {
        path: "/events/create-event/keynotes/:eventId?",
        title: "CreateEvent",
        exact: true,
        private: true,
        isSidebarIcon: false,
        breadCrumbs: [
          { path: "/events", title: "Events" },
          { path: "/events/create-event/event", title: "Create Event" },
          { path: "/create-event/keynotes", title: "Keynotes" }
        ]
      },
      {
        path: "/events/create-event/tracks/:eventId?",
        title: "CreateEvent",
        exact: true,
        private: true,
        isSidebarIcon: false,
        breadCrumbs: [
          { path: "/events", title: "Events" },
          { path: "/events/create-event/event", title: "Create Event" },
          { path: "/create-event/tracks", title: "Tracks" }
        ]
      },
      {
        path: "/events/create-event/partners-sponsors/:eventId?",
        title: "CreateEvent",
        exact: true,
        private: true,
        isSidebarIcon: false,
        breadCrumbs: [
          { path: "/events", title: "Events" },
          { path: "/events/create-event/event", title: "Create Event" },
          {
            path: "/create-event/partners-sponsors",
            title: "Partners Sponsors"
          }
        ]
      },
      {
        path: "/events/create-event/presenters/:eventId?",
        title: "CreateEvent",
        exact: true,
        private: true,
        isSidebarIcon: false,
        breadCrumbs: [
          { path: "/events", title: "Events" },
          { path: "/events/create-event/event", title: "Create Event" },
          {
            path: "/create-event/presenters",
            title: "Presenters"
          }
        ]
      },
      {
        path: "/events/create-event/breakout-rooms/:eventId?",
        title: "CreateEvent",
        exact: true,
        private: true,
        isSidebarIcon: false,
        breadCrumbs: [
          { path: "/events", title: "Events" },
          { path: "/events/create-event/event", title: "Create Event" },
          {
            path: "/create-event/breakout-rooms",
            title: "Breakout Rooms"
          }
        ]
      },
      {
        path: "/events/create-event/networking-lounge/:eventId?",
        title: "CreateEvent",
        exact: true,
        private: true,
        isSidebarIcon: false,

        breadCrumbs: [
          { path: "/events", title: "Events" },
          { path: "/events/create-event/event", title: "Create Event" },
          {
            path: "/create-event/networking-lounge",
            title: "Networking Lounge"
          }
        ]
      }
    ]
  },
  {
    path: "/update-password",
    title: "Update Password",

    exact: true,
    private: true,
    isSidebarIcon: false,
    breadCrumbs: [{ path: "/UpdatePassword", title: "Update Password" }]
  }
];

export default routes;
