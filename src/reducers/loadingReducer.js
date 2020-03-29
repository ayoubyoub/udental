import {
  NOTES_STATUS,
  USER_STATUS,
  USERS_STATUS,
  CHANNELS_STATUS,
  PRESENCES_STATUS,
  CONNECTED_STATUS,
  MESSAGES_STATUS,
  PRIVATE_MESSAGES_STATUS,
  TYPING_STATUS,
  SETTINGS_STATUS,
  PATIENTS_STATUS
} from "../actions/types";

const loadingReducer = (state = {}, action) => {
  switch (action.type) {
  case USER_STATUS:
    return {
      ...state,
      user: action.payload
    };
  case USERS_STATUS:
    return {
      ...state,
      users: action.payload
    };
  case CHANNELS_STATUS:
    return {
      ...state,
      channels: action.payload
    };
  case NOTES_STATUS:
    return {
      ...state,
      notes: action.payload
    };
  case PRESENCES_STATUS:
    return {
      ...state,
      presences: action.payload
    };
  case TYPING_STATUS:
    return {
      ...state,
      typing: action.payload
    };
  case CONNECTED_STATUS:
    return {
      ...state,
      connected: action.payload
    };
  case MESSAGES_STATUS:
    return {
      ...state,
      messages: action.payload
    };
  case PRIVATE_MESSAGES_STATUS:
    return {
      ...state,
      privateMessages: action.payload
    };
  case SETTINGS_STATUS:
    return {
      ...state,
      settings: action.payload
    };
  case PATIENTS_STATUS:
    return {
      ...state,
      patients: action.payload
    };
  default:
    return state;
  }
};

export default loadingReducer;
