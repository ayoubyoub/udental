// Databases
import {dbTyping} from "../services/firebase";
// Types
import {GET_TYPING, TYPING_STATUS} from "./types";

export const getTyping = () => (dispatch) => {
  dispatch({
    type: TYPING_STATUS,
    payload: true
  });
  dbTyping.on("value", (snapshot) => {
    dispatch({
      type: GET_TYPING,
      payload: snapshot.val()
    });
    dispatch({
      type: TYPING_STATUS,
      payload: false
    });
  });
};

export const saveTyping = (uid, id, typing) => () => {
  dbTyping
    .child(uid)
    .child(id)
    .update({typing});
};

export const deleteTyping = (uid) => () => {
  dbTyping.child(uid).remove();
};
