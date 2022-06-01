import { createAction } from "redux-act";
import { ISponsors } from "modules/types/globals";

export const saveSponsors = createAction<ISponsors>("Save Sponsors");
export const addSponsors = createAction<ISponsors[]>("add Sponsors");
export const removeSponsor = createAction<ISponsors>("remove Sponsor");
