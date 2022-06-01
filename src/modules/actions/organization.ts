import { createAction } from "redux-act";
import { IOrganization } from "modules/reducers";
import { IHero, IVideoHighlights } from "modules/types";

export const fetchOrganizationSuccess = createAction<IOrganization>(
  "Fetch Organization Success"
);
export const setSocial = createAction<{ label: string;[key: string]: string }>(
  "Fetch Organization Success"
);
export const filterTableData = createAction<string>(
  "value to filter table data "
);
export const setLanding = createAction<{
  pagePrivacy: string, cardBorderColor: string, videoPlayerColor: string, hero: IHero; videoHighlights: IVideoHighlights;
}>(
  "Fetch Organization Success"
);
