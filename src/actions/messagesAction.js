import {map, now, last} from "lodash";
import {GET_MESSAGES, MESSAGES_STATUS, GET_PRIVATE_MESSAGES, PRIVATE_MESSAGES_STATUS} from "./types";
import {dbMessages, dbPrivateMessages, storage} from "../services/firebase";
// Storage of Messages

export const setUploadTask = (filePath, file, metadata) => () => storage.child(filePath).put(file, metadata);
// Messages
export const getMessages = () => (dispatch) => {
  dispatch({
    type: MESSAGES_STATUS,
    payload: true
  });
  dbMessages.on("value", (snapshot) => {
    dispatch({
      type: GET_MESSAGES,
      payload: snapshot.val()
    });
    dispatch({
      type: MESSAGES_STATUS,
      payload: false
    });
  });
};

export const saveMessages = (id, message) => () => dbMessages.child(id).update(message);

export const deleteMessage = (id) => () => dbMessages.child(id).remove();

// Private Messages

export const getPrivateMessages = () => (dispatch) => {
  dispatch({
    type: PRIVATE_MESSAGES_STATUS,
    payload: true
  });
  dbPrivateMessages.on("value", (snapshot) => {
    dispatch({
      type: GET_PRIVATE_MESSAGES,
      payload: snapshot.val()
    });
    dispatch({
      type: PRIVATE_MESSAGES_STATUS,
      payload: false
    });
  });
};

export const savePrivateMessages = (id, uid, message) => () => dbPrivateMessages
  .child(id)
  .child(uid)
  .update(message);

export const setNotifViewedPb = (user, notifs, channelID) => () => {
  map(notifs, (notif) => {
    if (notif.channel === channelID) {
      dbMessages
        .child(channelID)
        .child(notif.message)
        .child("vuPar")
        .update({
          [user.uid]: {
            name: user.displayName,
            timestamp: now(),
            message: channelID
          }
        });
    }
  });
};

export const setNotifViewedPv = (user, notification, channelData) => () => {
  map(notification, (notif) => {
    if (notif.user === channelData.id) {
      let lastMsg = last(notif.messages);
      dbPrivateMessages
        .child(user.uid)
        .child(channelData.id)
        .child(lastMsg)
        .child("vuPar")
        .update({
          [user.uid]: {
            name: user.displayName,
            timestamp: now(),
            message: lastMsg
          }
        });
    }
  });
};

export const deletePrivateMessage = (id) => () => dbPrivateMessages.child(id).remove();
