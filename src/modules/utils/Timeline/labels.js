import { format } from "./constants";
import { timestamp } from "./Timeline";

/* ----- LABELS ------ */
export function labelDate(milliseconds) {
  return timestamp(milliseconds).format(format.date);
}

export function labelRunningTime(startTime, durationMinutes) {
  const end = timestamp(startTime).add(durationMinutes, "minutes");
  return `${labelDate(startTime)} | ${labelTime(startTime)} - ${end.format(
    format.time
  )}`;
}

export function labelEventDate(startTime) {
  return `${labelDate(startTime)}`;
}

export function labelEventRunningTime(startTime, durationMinutes) {
  const end = timestamp(startTime).add(durationMinutes, "minutes");
  return `${labelTime(startTime)} - ${end.format(format.time)}`;
}
export function labelTime(milliseconds) {
  return timestamp(milliseconds).format(format.time);
}
