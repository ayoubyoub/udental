import {GET_NOTES, NOTES_STATUS} from "./types";
import {dbNotes} from "../services/firebase";

export const getNotes = () => (dispatch) => {
  dispatch({
    type: NOTES_STATUS,
    payload: true
  });
  dbNotes.on("value", (snapshot) => {
    dispatch({
      type: GET_NOTES,
      payload: snapshot.val()
    });
    dispatch({
      type: NOTES_STATUS,
      payload: false
    });
  });
};

export const saveNote = (note) => () => dbNotes.push(note);

export const editNote = (id, note) => () => dbNotes.child(id).update(note);

export const deleteNote = (id) => () => dbNotes.child(id).remove();

export const saveComment = (noteId, comment) => () => {
  dbNotes
    .child(noteId)
    .child("comments")
    .push(comment);
};
