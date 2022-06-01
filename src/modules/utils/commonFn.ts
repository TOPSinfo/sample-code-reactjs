/* eslint-disable no-octal */
import { ISelect } from "modules/types";
import moment from "moment-timezone";
import { capitalize } from "lodash";
import firebase from "modules/utils/Firebase";
import { MEETING_TYPES } from "../../@theme/commonfile";
import { DateTime } from "luxon";
// import copy from "copy-to-clipboard";

moment.suppressDeprecationWarnings = true;
export const defaultBackground =
  "https://assets.tops.com/dynamic/images/vhBBdmj5EpKczKJ5k6oZ/Event/background.jpg";

export const createOption = (label: string) => ({
  label: capitalize(label),
  value: label
});
export const createOptionWithoutChanges = (label: string) => ({
  label: label,
  value: label
});
export const createOptionWithValueChanges = (label: string, value: string) => ({
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
  // eslint-disable-next-line
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
    // array[isChecked].isChecked = !array[isChecked].isChecked;
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

export const isURL = (str: string) => {
  const regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
};

export const getlastStringValue = (str: string) => {
  const value = str.split("/");
  return value[value.length - 1];
};

export const sortGetRecentItems = (
  list: any[],
  { count = 7, sortKey = "updatedAt", sortParentKey, isDesc = false }: any
) => {
  return sortParentKey
    ? list
        .sort(
          (b: any, a: any) =>
            (moment((!isDesc ? a : b)[sortParentKey][sortKey] * 1000) as any) -
            (moment((isDesc ? a : b)[sortParentKey][sortKey] * 1000) as any)
        )
        .slice(0, count)
    : list
        .sort((b: any, a: any) => {
          try {
            if (
              (a[sortKey] || b[sortKey]) &&
              ("seconds" in a[sortKey] || "seconds" in b[sortKey])
            ) {
              return (
                (moment((!isDesc ? a : b)[sortKey].seconds * 1000) as any) -
                (moment((isDesc ? a : b)[sortKey].seconds * 1000) as any)
              );
            } else {
              return (
                (moment((!isDesc ? a : b)[sortKey] * 1000) as any) -
                (moment((isDesc ? a : b)[sortKey] * 1000) as any)
              );
            }
          } catch (e) {
            return 0;
          }
        })
        .slice(0, count);
};

export const randomString = (length: number) => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

export const getLastSlashValue = (value: string) => {
  const n = value.lastIndexOf("/");
  return value.substring(n + 1);
};

export const getPayloadObj = (value: any, path: string) => {
  return {
    value,
    path
  };
};

export const getManipulatedPresentersModerators = (
  selectedRow: firebase.firestore.DocumentReference[],
  array: any,
  presenters: any[],
  moderators: any[],
  presenterTags: any[],
  moderatorTags: any[],
  otherTags: any[]
) => {
  const updateArray: any = [];
  const idData: string[] = [];
  selectedRow.forEach((doc) => {
    const find = array.find(
      (val: any) => !idData.includes(val.id) && val.id === doc.id
    );
    if (find) {
      const isPresenter = presenters
        ? !!presenters.find((x) => x.id === find.id)
        : false;
      const isModerator = moderators
        ? !!moderators.find((x) => x.id === find.id)
        : false;
      let tag = isModerator ? "Moderator" : "Presenter";
      if (presenterTags.find((x) => x.id === find.id)) {
        tag = "Presenter";
      } else if (moderatorTags.find((x) => x.id === find.id)) {
        tag = "Moderator";
      } else if (otherTags.find((x) => x.id === find.id)) {
        tag = "Others";
      }
      updateArray.push({
        label: `${find?.firstName} ${find?.lastName}`,
        value: find.email,
        ref: doc,
        id : find.id,
        checked: tag,
        isPresenter,
        isModerator
      });
      idData.push(find.id);
    }
  });

  return updateArray;
};

export const filterArrays = (
  list: any,
  pageCount: number,
  pageIndex: number
) => {
  const updateArray: any[] = [];
  list.forEach((element: any, i: number) => {
    if (i >= pageIndex * pageCount && i < (pageIndex + 1) * pageCount) {
      updateArray.push(element);
    }
  });
  return updateArray;
};

export const manipulateEventComponentObj = (
  obj: any,
  organizationId: string
) => {
  return {
    id: obj.id,
    compId: obj.compId || null,
    eventId: obj.eventId || "",
    name: obj.name,
    type: obj.type,
    utcStartTimeMillis: obj.utcStartTimeMillis,
    visible: obj.visible || false,
    organizationId,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    key: obj.key
  };
};

export const eventTypeBasedKey = (type: string) => {
  let compType = type;
  switch (type) {
    case MEETING_TYPES.MEETING_ROOM:
    case MEETING_TYPES.BROADCAST_ROOM:
      compType = "breakoutData";
      break;
    case MEETING_TYPES.LOBBY:
      compType = "lobby";
      break;
    case MEETING_TYPES.SPONSOR_BOOTH:
      compType = "sponsorData";
      break;
    case MEETING_TYPES.CALL_TO_ACTION:
      compType = "callToAction";
      break;
    default:
      break;
  }
  return compType;
};

export const sortItems = (
  prev: any,
  curr: any,
  columnId: string,
  childColumn?: string
) => {
  if (childColumn) {
    if (
      prev.original &&
      curr.original &&
      columnId in prev.original[childColumn] &&
      columnId in curr.original[childColumn] &&
      prev.original[childColumn][columnId].toLowerCase() >
        curr.original[childColumn][columnId].toLowerCase()
    ) {
      return 1;
    } else if (
      prev.original &&
      curr.original &&
      columnId in prev.original[childColumn] &&
      columnId in curr.original[childColumn] &&
      prev.original[childColumn][columnId].toLowerCase() <
        curr.original[childColumn][columnId].toLowerCase()
    ) {
      return -1;
    }
    return 0;
  } else if (
    prev.original &&
    curr.original &&
    columnId in prev.original &&
    columnId in curr.original &&
    prev.original[columnId].toLowerCase() >
      curr.original[columnId].toLowerCase()
  ) {
    return 1;
  } else if (
    prev.original &&
    curr.original &&
    columnId in prev.original &&
    columnId in curr.original &&
    prev.original[columnId].toLowerCase() <
      curr.original[columnId].toLowerCase()
  ) {
    return -1;
  } else {
    return 0;
  }
};

export const copyToClipboard = (text: string) => {
  try {
    const input = document.body.appendChild(
      document.createElement("input")
    ) as any;
    input.value = text;
    input.focus();
    input.select();
    document.execCommand("copy");
    input?.parentNode.removeChild(input);
  } catch (e) {
    console.log(e);
  }
};

export const splitType = (str: string, capital: boolean) => {
  const frags = str.split("_");
  for (let i = 0; i < frags.length; i++) {
    if (capital)
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    else frags[i] = frags[i].charAt(0).toLowerCase() + frags[i].slice(1);
  }
  return frags.join(" ");
};

export const mapProfileToAEP = (profile: any) => {
  const {
    firstName,
    lastName,
    companyName,
    description,
    workLocation,
    jobTitle,
    imageSrc
  } = profile;
  return {
    firstName,
    lastName,
    organization: companyName,
    location: workLocation,
    title: jobTitle,
    about: description,
    avatar: imageSrc
  };
};

export const getAvatarUrl = (image: any, organizationId: string) =>
  image &&
  organizationId &&
  (image.startsWith("https://")
    ? image
    : `${process.env.REACT_APP_tops_ASSETS_URL}/dynamic/images/${organizationId}` +
      image);

export const convertToNewTimeZone = (date: Date, timezone: string) => {
  const dt = DateTime.fromJSDate(date).setZone(timezone, {
    keepLocalTime: true
  });

  return dt.valueOf();
};

export const convertTime = (timeStamp: number | string, timezone: string) => {
  return timeStamp
    ? moment(timeStamp).tz(timezone).format("DD MMM yyyy hh:mm a")
    : moment().tz(timezone).format("DD MMM yyyy hh:mm a");
};

export const getTrimmedObject = (props: any = {}) => {
  try {
    const updatedProps = props;
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === "string") updatedProps[key] = value.trim();
    });
    return updatedProps;
  } catch (e) {
    return props;
  }
};

export function compactObject(data: any) {
  if (typeof data !== "object") {
    return data;
  }

  return Object.keys(data).reduce(function (accumulator, key) {
    const isObject = typeof data[key] === "object";
    const value: any = isObject ? compactObject(data[key]) : data[key];
    const isEmptyObject = isObject && !Object.keys(value).length;
    if (value === undefined || isEmptyObject) {
      return accumulator;
    }

    return Object.assign(accumulator, { [key]: value });
  }, {});
}

export const sponsorTypes = [
  {
    order: 3,
    theme: "gold",
    title: "Gold",
    type: "gold"
  },
  {
    order: 4,
    theme: "silver",
    title: "Silver",
    type: "silver"
  },
  {
    order: 5,
    theme: "bronze",
    title: "Bronze",
    type: "bronze"
  },
  {
    order: 1,
    theme: "platinum",
    title: "Platinum",
    type: "platinum"
  },
  {
    order: 2,
    theme: "gold",
    title: "Diamond",
    type: "diamond"
  }
];

export const validURL = (str: string) => {
  return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(
    str
  );
};

export const convertOldToNewTimeZone = (
  timeInMilliseconds: number,
  oldTimezone: string,
  newTimezone: string
) => {
  const oldTimeZonOffset = moment().tz(oldTimezone).utcOffset();
  const now = moment().tz(newTimezone);
  const newTimeZoneOffset = now.utcOffset();
  const diffInMinutes = oldTimeZonOffset - newTimeZoneOffset;
  return moment(timeInMilliseconds).add(diffInMinutes, "minutes").valueOf();
};

export function rgba2hex(orig: string) {
  let a;
  const rgb: any = orig
    .replace(/\s/g, "")
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  const alpha = ((rgb && rgb[4]) || "").trim();
  let hex = rgb
    ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
      (rgb[2] | (1 << 8)).toString(16).slice(1) +
      (rgb[3] | (1 << 8)).toString(16).slice(1)
    : orig;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = "01";
  }
  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1);
  hex = hex + a;

  if (hex.includes("#")) return hex;
  else return `#${hex}`;
}

export function hexToRGB(hex: string, alpha: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export function rgbatohex(color: string) {
  const rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(",");

  return `#${(
    (1 << 24) +
    (parseInt(rgba[0]) << 16) +
    (parseInt(rgba[1]) << 8) +
    parseInt(rgba[2])
  )
    .toString(16)
    .slice(1)}`;
}

export function alphaValue(bgCol: string) {
  return parseFloat(bgCol.split(",")[3]).toString();
}

export function chunkArrayInGroups(arr: any, size: number) {
  const myArray = [];
  for (let i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}

export const typeDescription = (type: string) => {
  let compType = type;
  switch (type) {
    case MEETING_TYPES.MEETING_ROOM:
      compType =
        "A meeting room is a place to hold interactive meetings between participants, be they regular attendees, hosts, external speakers, etc.: everyone can be on camera. Content management and moderation controls are included.";
      break;
    case MEETING_TYPES.BROADCAST_ROOM:
      compType =
        "A broadcast room is like a theater with a stage that can host panel discussions and presentations (videos, slide decks…). As in a meeting room, regular attendees can ask questions, interact with the chat and real-time polls, but they don’t appear on camera, only presenters on stage do. tops offers a built-in broadcast room but also supports streaming from external studios and streaming to social media platforms.";
      break;
    case MEETING_TYPES.LOBBY:
      compType = "Hall";
      break;
    case MEETING_TYPES.NETWORKING_AREA:
      compType =
        "A networking lounge is an area where attendees can connect and discuss, either one on one or in small groups. Add a networking lounge for greater interactivity and engagement.";
      break;
    default:
      compType = "";
      break;
  }
  return compType;
};

export async function dataUrlToFile(
  dataUrl: string,
  fileName: string
): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
}

// get file duration for supported files by players
export const getDuration = async (file: any) => {
  const videoNode = document.createElement("video");
  const promise = new Promise((resolve, reject) => {
    if (videoNode) {
      videoNode.addEventListener("loadedmetadata", () => {
        resolve(videoNode.duration);
      });
      videoNode.addEventListener("error", () => {
        if (videoNode?.error)
          reject(
            new Error(
              videoNode?.error?.message + "(" + videoNode?.error?.code + ")"
            )
          );
      });
    }
  });
  const URL = window.URL || window.webkitURL;
  videoNode.src = URL.createObjectURL(file);
  return promise;
};

// get file duration for supported files by players
export const convertDurationToHrMin = (duration: number, typeObj?: boolean) => {
  let hour: any = Math.floor(duration / 3600);
  let minutes: any = Math.floor(duration / 60);
  let seconds: any = Math.floor(duration % 60);
  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if (typeObj) return { hour, minutes, seconds };
  return `${hour}:${minutes}:${seconds}`;
};

export const setLimitTabsByType = (type: string) => {
  let compType = "0";
  switch (type) {
    case MEETING_TYPES.MEETING_ROOM:
    case MEETING_TYPES.BROADCAST_ROOM:
      compType = "2";
      break;
    default:
      break;
  }
  return compType;
};
