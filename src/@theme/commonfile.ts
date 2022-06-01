/* eslint-disable no-useless-escape */
import { ISelect } from "modules/types";
import moment from "moment-timezone";
moment.suppressDeprecationWarnings = true;
export const createOption = (label: string) => ({
  label,
  value: label
});
export const createOptionsWithVal = (label: string, value: string) => ({
  label,
  value
});
export const createOptionForArray = (array: string[]) => {
  return array.map((str: string) => {
    const obj = {} as ISelect;
    obj.label = str;
    obj.value = str;
    return obj;
  });
};
// eslint-disable-next-line
export const EmailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const createString = (array: any[], key: string) =>
  array.map((value) => value[key]);

export const makeRepeated = (arr: any, repeats: number) =>
  [].concat(...Array.from({ length: repeats }, () => arr));

export const getFileExtension = (fileName: string) =>
  fileName.substring(fileName.lastIndexOf(".") + 1);

export const getCurrentDate = (date: any) => {
  const todayDate = moment(date).format();
  return todayDate;
};

export const setTags = (childArray: any, parentArray: any) => {
  const tagsArray: any[] = [];
  childArray.map((val: any) => {
    const findObject = parentArray.find((value: any) => value.uid === val.id);
    if (findObject) tagsArray.push(findObject);
    return val;
  });
  return tagsArray;
};

export const convertUtcTimeStamp = (
  date: string,
  hour: string,
  minute: string,
  timezone: string
) => {
  const hourInNumber = parseInt(hour);
  const minuteInNumber = parseInt(minute);
  const getFormatType = hour.replace(/[^a-z]/gi, "");
  const time12To24 = moment(
    `${hourInNumber.toString()}:${minuteInNumber.toString()} ${getFormatType.toUpperCase()}`,
    [`h:mm A`]
  ).unix();
  const convertedHourToNumber = moment(time12To24 * 1000)
    .toDate()
    .getHours();
  const convertedMinuteToNumber = moment(time12To24 * 1000)
    .toDate()
    .getMinutes();
  const timeStamp = moment(date)
    .set({ hour: convertedHourToNumber, minute: convertedMinuteToNumber })
    .tz(timezone)
    .unix();

  return timeStamp * 1000;
};

export const convertToDate = (timeStamp: any) => {
  const date = moment(timeStamp).toDate();
  const hour = moment(timeStamp).toDate().getHours();
  let minute = moment(timeStamp).toDate().getMinutes().toString();
  let hourTo12 = moment(`${hour.toString()}.${minute.toString()}`, [
    "hh.mm A"
  ]).format("hA");
  hourTo12 = hourTo12.toLowerCase();
  minute = `${minute}`;
  return { date, minute, hour: hourTo12 };
};

export const createAndFilterTags = (options: any[], selectedOption: any[]) => {
  if (selectedOption && selectedOption.length) {
    options = options.filter((val: any) => {
      const findObject =
        selectedOption &&
        selectedOption.find((value: any) => value.uid === val.uid);
      return !findObject && val;
    });
    selectedOption = selectedOption.map((opt: any) => {
      const object: any = {};
      object.id = opt.uid;
      object.tag = opt.label;
      return object;
    });
  } else selectedOption = [];

  return { options, selectedOption };
};

export const selectDeSelect = (array: any[], isChecked: boolean | string) => {
  if (typeof isChecked === "boolean") {
    array = array.map((value) => {
      value.isChecked = isChecked;
      return value;
    });
  } else {
    const findIndex = array.findIndex((value) => value.uid === isChecked);
    array[findIndex].isChecked = !array[findIndex].isChecked;
  }
  return JSON.parse(JSON.stringify(array));
};

export const convertUtcTimeStamp2 = (
  date: string,
  time: string,
  timezone: string
) => {
  const hour = moment(time).toDate().getHours();
  const minute = moment(time).toDate().getMinutes();
  const timeStamp = moment(date)
    .set({ hour: hour, minute: minute })
    .tz(timezone.replace(/ *\([^)]*\) */g, ""))
    .unix();
  return timeStamp * 1000;
};

export const getTimeStamp = () => moment().unix();

export const setCalenderDisableData = (date: any) => {
  let updatedDate = moment(date).toDate();
  updatedDate = moment(updatedDate).add(1, "days").toDate();
  return updatedDate;
};

export const getBase64FileExtension = (fileBase64: string) =>
  fileBase64.split(";")[0].split("/")[1];

export const MEETING_TYPES = {
  BROADCAST_ROOM: "BROADCAST_ROOM",
  MEETING_ROOM: "MEETING_ROOM",
  LOBBY: "LOBBY",
  SPONSOR_BOOTH: "SPONSOR_BOOTH",
  CALL_TO_ACTION: "CALL_TO_ACTION",
  NETWORKING_AREA: "NETWORKING_AREA",
  NETWORKING_AREA_BETA: "NETWORKING_AREA_BETA",
  AGENDA: "AGENDA"
};
export const getEventType = (type: string) => {
  switch (type) {
    case MEETING_TYPES.LOBBY:
      return "Lobby";
    case MEETING_TYPES.CALL_TO_ACTION:
      return "Call to Action";
    case MEETING_TYPES.BROADCAST_ROOM:
      return "Broadcast Room";
    case MEETING_TYPES.SPONSOR_BOOTH:
      return "Sponsor Booth";
    case MEETING_TYPES.MEETING_ROOM:
      return "Meeting Room";
    case MEETING_TYPES.NETWORKING_AREA:
      return "Networking Area (Beta)";
    case MEETING_TYPES.NETWORKING_AREA_BETA:
      return "Networking Area";
    case MEETING_TYPES.AGENDA:
      return "Agenda";
    default:
      return "--";
  }
};

export const getConversationType = (type: string) => {
  switch (type) {
    case MEETING_TYPES.LOBBY:
      return "Header";
    case MEETING_TYPES.CALL_TO_ACTION:
      return "Call to Action";
    case MEETING_TYPES.BROADCAST_ROOM:
      return "Broadcast Room";
    case MEETING_TYPES.SPONSOR_BOOTH:
      return "Sponsor Booth";
    case MEETING_TYPES.MEETING_ROOM:
      return "Meeting Room";
    case MEETING_TYPES.NETWORKING_AREA:
      return "Networking Area (Beta)";
    case MEETING_TYPES.NETWORKING_AREA_BETA:
      return "Networking Area";
    case MEETING_TYPES.AGENDA:
      return "Agenda";
    default:
      return "--";
  }
};

export const POLL_FORM_TYPE = {
  OPINION_SCALE: "opinion_scale",
  MULTIPLE_CHOICE: "multiple_choice"
};
