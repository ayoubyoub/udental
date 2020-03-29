// Databases
import {dbUsers} from "../utils/firebase";
// Types
import {SET_PARAMS} from "./types";
// Begin
export const setParams = (params) => (dispatch) => {
  dispatch({
    type: SET_PARAMS,
    payload: params
  });
};

export const saveParam = (param) => () => dbUsers.push(param);

export const editParam = (uid, langs) => () => {
  dbUsers
    .child(uid)
    .child("params")
    .update({langs});
};

export const editColors = (uid, key, color) => () => {
  dbUsers
    .child(uid)
    .child("params")
    .child("colors")
    .child(key)
    .update(color);
};

export const setColors = (uid, newKey, oldKey) => () => {
  dbUsers
    .child(uid)
    .child("params")
    .child("colors")
    .child(oldKey)
    .update({active: false});
  dbUsers
    .child(uid)
    .child("params")
    .child("colors")
    .child(newKey)
    .update({active: true});
};
export const deleteParam = (uid, key) => () => {
  dbUsers
    .child(uid)
    .child("params")
    .child("colors")
    .child(key)
    .remove();
};
