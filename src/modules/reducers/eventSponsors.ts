import { createReducer } from "redux-act";
import cloneDeep from "lodash/cloneDeep";

import { ISponsors } from "../types";
import { addSponsors, removeSponsor } from "../actions";

export interface ISponsorsReducer {
  sponsors: ISponsors[];
  sponsorData: ISponsors;
}

const initialState = {
  sponsors: [],
  sponsorData: {
    id: "",
    html: "",
    logoUrl: "",
    mediaUrl: "",
    name: "",
    sponsorLoungeRedirectToBreakout: false,
    isSponsorWelcome: false,
    websiteUrl: "",
    type: "",
    bgSponImageUrl: "",
    sponsorFollowupLabel: "REQUEST FOLLOW-UP",
    sponsorVisitWebsiteLabel: "VISIT WEBSITE",
    sponsorLoungeBtn: "SPONSOR LOUNGE"
  }
};

export const sponsors = createReducer<ISponsorsReducer>({}, initialState);

sponsors.on(addSponsors, (state: ISponsorsReducer, payload: ISponsors[]) => {
  return {
    ...state,
    sponsors: payload
  };
});
sponsors.on(removeSponsor, (state: ISponsorsReducer, payload: ISponsors) => {
  const sponsorsAction = cloneDeep(state.sponsors || []);
  const callToAction = sponsorsAction.findIndex((x) => x.id === payload.id);
  if (callToAction !== -1) {
    sponsorsAction.splice(callToAction, 1);
  }
  return {
    ...state,
    sponsors: sponsorsAction
  };
});
