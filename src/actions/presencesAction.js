import {now} from "lodash";
import {GET_PRESENCES, PRESENCES_STATUS} from "./types";
import {dbPresences} from "../utils/firebase";

export const getPresences = () => (dispatch) => {
  dispatch({
    type: PRESENCES_STATUS,
    payload: true
  });
  dbPresences.on("value", (snapshot) => {
    dispatch({
      type: GET_PRESENCES,
      payload: snapshot.val()
    });
    dispatch({
      type: PRESENCES_STATUS,
      payload: false
    });
  });
};

export const updatePresence = (id) => () => {
  dbPresences.child(id).update({
    timestamp: now(),
    active: false
  });
};
