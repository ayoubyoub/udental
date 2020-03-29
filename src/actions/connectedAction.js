import {now} from "lodash";
import {dbConnected, dbPresences, dbTyping} from "../utils/firebase";
export const getConnected = (currentUserUid) => () => {
  dbConnected.on("value", (snap) => {
    if (snap.val() === true) {
      // Delete presences by user
      const refPresences = dbPresences.child(currentUserUid);
      refPresences.update({
        timestamp: now(),
        active: true
      });
      refPresences.onDisconnect().update({
        timestamp: now(),
        active: false
      });
      // Delete typings by user
      const refTyping = dbTyping.child(currentUserUid);
      refTyping.onDisconnect().remove();
    }
  });
};

export const saveConnected = (connected) => () => dbConnected.push(connected);

export const editConnected = (id, connected) => () => dbConnected.child(id).update(connected);

export const deleteConnected = (id) => () => dbConnected.child(id).remove();
