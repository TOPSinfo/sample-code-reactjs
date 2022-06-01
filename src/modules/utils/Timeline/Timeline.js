import moment from "moment-timezone";
import * as constants from "./constants";
import * as labels from "./labels";
moment.suppressDeprecationWarnings = true;
// exports
export default {
  ...constants,
  ...labels,
  timestamp,
  add,
  subtract,
  difference,
  isAfter,
  isBefore,
  isBetween,
  isMoment
};

// ----- LOCALE -----
// will ensure moment maintains relation to locale with utc timestamp
export function timestamp(milliseconds) {
  return moment(milliseconds).utc(true);
}

// ----- MEASURE ------
// add(unit, value)
export function add(date, value, unitOfTime) {
  return moment(date).add(value, unitOfTime);
}

// subtract(value, unit)
export function subtract(date, value, unitOfTime) {
  return moment(date).subtract(value, unitOfTime);
}

// diff(moment,unitOfTime) | a.diff(b, 'days') => 1
export function difference(fromDate, toDate, unitOfTime) {
  fromDate = moment(fromDate);
  toDate = moment(toDate);
  return fromDate.diff(toDate, unitOfTime);
}

// ----- VALIDATE ------
// isSameOrAfter | moment('2010-10-20').isSame('2011-01-01', 'year');  // false
export function isAfter(date) {
  return moment().isAfter(date);
}

export function isBefore(date) {
  return moment().isBefore(date);
}

export function isBetween(fromDate, toDate) {
  return moment().isBetween(fromDate, toDate);
}

export function isMoment(value) {
  return moment.isMoment(value);
}
