import {GET_PATIENTS, PATIENTS_STATUS} from "./types";
import {dbPatients, storage} from "../services/firebase";

export const getPatients = () => (dispatch) => {
  dispatch({
    type: PATIENTS_STATUS,
    payload: true
  });
  dbPatients.on("value", (snapshot) => {
    dispatch({
      type: GET_PATIENTS,
      payload: snapshot.val()
    });
    dispatch({
      type: PATIENTS_STATUS,
      payload: false
    });
  });
};

export const uploadImage = (id, blob, metadata) => () => storage
  .child("patients")
  .child(id)
  .put(blob, metadata);

export const eventPatient = (id, patient) => () => dbPatients.child(id).update(patient);

export const eventsPatient = (id, data) => () => dbPatients
  .child(id)
  .child("events")
  .update(data);

export const eventsCalPatient = (id, idevent, data) => () => dbPatients
  .child(id)
  .child("events")
  .child(idevent)
  .update(data);

export const removeCalPatient = (id, idevent) => () => dbPatients
  .child(id)
  .child("events")
  .child(idevent)
  .remove();

export const deletePatient = (id) => () => dbPatients.child(id).remove();
