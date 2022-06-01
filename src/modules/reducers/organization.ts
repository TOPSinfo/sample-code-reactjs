import { createReducer } from "redux-act";
import {
  fetchOrganizationSuccess,
  setSocial,
  filterTableData,
  setLanding
} from "modules/actions";
import { ISocialTags, IHero, IVideoHighlights } from "modules/types/globals";
export interface IOrganization {
  name: string;
  id: string;
  connectedServiceProviders: string[];
  eventBriteAuthKey?: string;
  social: ISocialTags;
  landing: {
    pagePrivacy: string;
    cardBorderColor: string;
    videoPlayerColor: string;
    hero: IHero;
    videoHighlights: IVideoHighlights;
  };
  filterValue: string | null;
  plan: { availableFeatures: string[] };
}

export type organizationReducerState = {
  organization: IOrganization;
};

const initialState: organizationReducerState = {
  organization: {
    name: "",
    id: "",
    social: {
      label: ""
    },
    landing: {
      pagePrivacy: "public",
      cardBorderColor: "",
      videoPlayerColor: "",
      hero: {
        type: "",
        heading: "",
        description: "",
        thumbnail: "",
        bodyBgColor: ""
      },
      videoHighlights: {
        deck: "",
        heading: "",
        description: "",
        thumbnail: "",
        video: "",
        bodyBgColor: ""
      }
    },
    connectedServiceProviders: [],
    filterValue: null,
    plan: {
      availableFeatures: []
    }
  }
};

export const organization = createReducer<organizationReducerState>(
  {},
  initialState
);
organization.on(
  fetchOrganizationSuccess,
  (state: organizationReducerState, payload: IOrganization) => ({
    ...state,
    organization: {
      name: payload.name,
      id: payload.id,
      social: payload.social,
      landing: { ...initialState.organization.landing, ...payload.landing },
      connectedServiceProviders: payload.eventBriteAuthKey
        ? ["eventbrite"]
        : [],
      filterValue: null,
      plan: payload.plan || {
        availableFeatures: []
      }
    }
  })
);

organization.on(
  setSocial,
  (state: organizationReducerState, payload: ISocialTags) => {
    return {
      ...state,
      organization: {
        ...state.organization,
        social: payload
      }
    };
  }
);

organization.on(
  setLanding,
  (
    state: organizationReducerState,
    payload: {
      pagePrivacy: string;
      cardBorderColor: string;
      videoPlayerColor: string;
      hero: IHero;
      videoHighlights: IVideoHighlights;
    }
  ) => {
    return {
      ...state,
      organization: {
        ...state.organization,
        landing: payload
      }
    };
  }
);

organization.on(
  filterTableData,
  (state: organizationReducerState, payload: string) => {
    return {
      ...state,
      organization: {
        ...state.organization,
        filterValue: payload
      }
    };
  }
);
