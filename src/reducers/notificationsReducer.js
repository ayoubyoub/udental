import {SET_CURRENT_NOTIFS_PV, SET_CURRENT_NOTIFS_PB} from "../actions/types";

const initialState = {
  notifsPv: null,
  notifsPb: null
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENT_NOTIFS_PV:
    return {
      ...state,
      notifsPv: action.payload.notifsPv
    };
  case SET_CURRENT_NOTIFS_PB:
    return {
      ...state,
      notifsPb: action.payload.notifsPb
    };
  default:
    return state;
  }
};

export default notificationsReducer;
