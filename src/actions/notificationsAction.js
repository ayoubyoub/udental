import {SET_CURRENT_NOTIFS_PV, SET_CURRENT_NOTIFS_PB} from "./types";

export const setCurrentNotifsPv = (notifsPv) => ({
  type: SET_CURRENT_NOTIFS_PV,
  payload: {notifsPv}
});

export const setCurrentNotifsPb = (notifsPb) => ({
  type: SET_CURRENT_NOTIFS_PB,
  payload: {notifsPb}
});
