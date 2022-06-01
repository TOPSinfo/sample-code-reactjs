export const format = {
  get date() {
    return `${this.month} ${this.day}, ${this.year}`;
  },
  day: "DD",
  hour: "hh",
  meridiem: "A",
  minute: "mm",
  month: "MMM",
  get time() {
    return `${this.hour}:${this.minute}${this.meridiem}`;
  },
  year: "YYYY"
};
