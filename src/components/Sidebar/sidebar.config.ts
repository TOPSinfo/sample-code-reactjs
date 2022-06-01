interface SidebarConfigInterface {
  name: string;
  href?: string;
  iconName?: string;
  children?: SidebarConfigInterface[];
  innerHref?: string[];
  hasChildren?: boolean;
  authRoles?: string[];
}
export const SidebarConfig: SidebarConfigInterface[] = [
  {
    name: "Conversations",
    href: "/conversations-list",
    iconName: "icon-ic-event-white",
    innerHref: ["/create-conversation", "/edit-conversation"],
    hasChildren: false
  },
  {
    name: "Events",
    href: "/dashboard",
    iconName: "icon-ic-event-white",
    innerHref: ["/dashboard", "/create-event", "/edit-event"],
    hasChildren: false
  },
  {
    name: "Event Resources",
    iconName: "icon-ic-resource-white",
    hasChildren: true,
    innerHref: ["/people", "/contents", "/polls"],
    // innerHref: ["/people", "/content", "/contents", "/partners"],
    children: [
      {
        name: "People",
        hasChildren: false,
        innerHref: [],
        children: [],
        href: "/people"
      },

      {
        name: "Content",
        hasChildren: false,
        innerHref: [],
        children: [],
        href: "/contents"
      },
      {
        name: "Polls",
        hasChildren: false,
        innerHref: [],
        children: [],
        href: "/polls"
      }
      // {
      //   name: "Partners",
      //   hasChildren: false,
      //   innerHref: [],
      //   children: [],
      //   href: "/partners"
      // }
    ]
  },
  {
    name: "Landing Page",
    href: "/landing-page",
    iconName: "icon-ic-event-white",
    innerHref: ["/landing-page"],
    hasChildren: false
  },
  // {
  //   name: "Integrations",
  //   iconName: "icon-ic-integrations-white",
  //   hasChildren: false,
  //   innerHref: [],
  //   href: "/integrations"
  // },
  {
    name: "Team",
    href: "/team",
    iconName: "icon-ic-team-white",
    innerHref: [],
    hasChildren: false,
    authRoles: ["team-admin"]
  },
  // {
  //   name: "Organizations",
  //   href: "/organizations",
  //   iconName: "icon-ic-team-white",
  //   innerHref: [],
  //   hasChildren: false,
  //   authRoles: ["billing-contract"]
  // },

  {
    name: "Account",
    iconName: "icon-ic-settings-white",
    hasChildren: false,
    innerHref: [],
    href: "/account",
    authRoles: []
  },
  {
    name: "Documentation",
    iconName: "icon-ic-about-white",
    hasChildren: false,
    innerHref: [],
    href: ""
  },
  {
    name: "About",
    iconName: "icon-ic-about-white",
    hasChildren: false,
    innerHref: ["/about"],
    href: "/about"
  }
];
