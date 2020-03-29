import {now} from "lodash";
import {GET_CHANNELS, CHANNELS_STATUS} from "./types";
import {dbChannels} from "../services/firebase";

export const getChannels = () => (dispatch) => {
  dispatch({
    type: CHANNELS_STATUS,
    payload: true
  });
  dbChannels.on("value", (snapshot) => {
    dispatch({
      type: GET_CHANNELS,
      payload: snapshot.val()
    });
    dispatch({
      type: CHANNELS_STATUS,
      payload: false
    });
  });
};
export const setStarred = (user, channel, isChannelStarred) => () => {
  if (isChannelStarred) {
    dbChannels
      .child(channel.id)
      .child("starredBy")
      .update({[user.uid]: {timestamp: now()}});
  } else {
    dbChannels
      .child(channel.id)
      .child("starredBy")
      .child(user.uid)
      .remove();
  }
};
export const saveChannel = (id, channel) => () => dbChannels.child(id).update(channel);

export const deleteChannel = (id) => () => dbChannels.child(id).remove();
