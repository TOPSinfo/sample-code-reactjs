import moment from "moment-timezone";
import { createOptionsWithVal } from "../../@theme/commonfile";
moment.suppressDeprecationWarnings = true;

const countries = moment.tz.countries();

export default function useTimeZones() {
  let timeZoneOptions: any[] = [];
  const zones = new Set();
  const sortByZone = (a: any, b: any) => {
    const [ahh, amm] = a.value.split("GMT")[1].split(")")[0].split(":");
    const [bhh, bmm] = b.value.split("GMT")[1].split(")")[0].split(":");
    return +ahh * 60 + amm - (+bhh * 60 + bmm);
  };
  const localTimexone = moment.tz.guess();
  for (const country of countries) {
    moment.tz
      .zonesForCountry(country)
      .reduce((set, zone) => set.add(zone), zones);
  }
  let selectedTimeZone: any = {};
  zones.forEach((zone: any) => {
    const momentzone = moment.tz(zone);
    const tz = momentzone.format("z") ? ` - (${momentzone.format("z")})` : "";
    if (localTimexone === zone) {
      selectedTimeZone = createOptionsWithVal(
        `(GMT ${momentzone.format("Z")}) ${zone}${tz}`,
        `(GMT ${momentzone.format("Z")}) ${zone}`
      );
    }
    if (tz) {
      timeZoneOptions.push(
        createOptionsWithVal(
          `(GMT ${momentzone.format("Z")}) ${zone}${tz}`,
          `(GMT ${momentzone.format("Z")}) ${zone}`
        )
      );
    }
  });
  timeZoneOptions = timeZoneOptions.sort(sortByZone);
  if (!(selectedTimeZone && selectedTimeZone.value)) {
    selectedTimeZone = timeZoneOptions[0];
  }
  return { timeZoneOptions, selectedTimeZone };
}
