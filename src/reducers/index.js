import {combineReducers} from "redux";
// Reducers
import {userReducer, usersReducer} from "./usersReducer";
import paramsReducer from "./paramsReducer";
import channelReducer from "./channelReducer";
import channelsReducer from "./channelsReducer";
import notesReducer from "./notesReducer";
import patientsReducer from "./patientsReducer";
import loadingReducer from "./loadingReducer";
import presencesReducer from "./presencesReducer";
import typingReducer from "./typingReducer";
import notificationsReducer from "./notificationsReducer";
import {messagesReducer, privateMessagesReducer} from "./messagesReducer";
import settingsReducer from "./settingsReducer";
import routingReducer from "./routingReducer";
// Combine All
const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  patients: patientsReducer,
  params: paramsReducer,
  typing: typingReducer,
  messages: messagesReducer,
  privateMessages: privateMessagesReducer,
  notifications: notificationsReducer,
  channel: channelReducer,
  channels: channelsReducer,
  notes: notesReducer,
  presences: presencesReducer,
  settings: settingsReducer,
  loading: loadingReducer,
  routing: routingReducer
});
// Export to Store
export default rootReducer;
