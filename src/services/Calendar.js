/* eslint-disable */
import moment from "moment";

const CALENDAR_ID = "93e1ti3h6kd0b62rlvvvmcel4k@group.calendar.google.com";
const API_KEY = "AIzaSyAq40b3QvRjwyHp5K4aT6qAjW0S4KVZDHI";
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

const test = () => {
  console.info("test");
};
