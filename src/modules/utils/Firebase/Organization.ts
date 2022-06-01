import { IHero, IVideoHighlights } from "modules/types";
import { Organization } from "modules/utils/Firebase/Api";

export const fecthOrganization = async (organizationId: string) => {
  const organizationRef = await Organization.organization(organizationId);
  const data = await (await organizationRef.get()).data();
  return data;
};
export const saveSocialData = async (
  organizationId: string,
  payload: {
    label: string;
    [key: string]: string;
  }
) => {
  const organizationRef = await Organization.organization(organizationId);
  await organizationRef.update({ social: payload });
};

export const saveLandingData = async (
  organizationId: string,
  payload: {
    pagePrivacy: string;
    cardBorderColor: string;
    videoPlayerColor: string;
    hero: IHero;
    videoHighlights: IVideoHighlights;
  }
) => {
  const organizationRef = await Organization.organization(organizationId);
  await organizationRef.update({ landing: payload });
};
