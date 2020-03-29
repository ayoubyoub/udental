import {auth, dbUsers, storage, googleProvider} from "../utils/firebase";
import {GET_USER, USER_STATUS, GET_USERS, USERS_STATUS} from "./types";
import {updatePresence} from "./presencesAction";
import {deleteTyping} from "./typingAction";
// Default
const _active = false;
const _role = "GUEST";
const _primaryColor = "#4c3c4c";
const _secondaryColor = "#eee";
const _activeColor = true;
const _primaryLang = "FR";
const _activeLang = true;
const _default = "default";

const defaultParams = (createdUser) => ({
  uid: createdUser.user.uid,
  name: createdUser.user.displayName,
  email: createdUser.user.email,
  avatar: createdUser.user.photoURL,
  params: {
    active: _active,
    role: _role,
    colors: {
      default: {
        primaryColor: _primaryColor,
        secondaryColor: _secondaryColor,
        active: _activeColor,
        id: _default
      }
    },
    langs: {
      primaryLang: _primaryLang,
      active: _activeLang
    }
  }
});

export const simpleLogin = (email, password) => () => auth.signInWithEmailAndPassword(email, password);

export const getUser = () => (dispatch) => {
  dispatch({
    type: USER_STATUS,
    payload: true
  });
  auth.onAuthStateChanged((user) => {
    dispatch({
      type: GET_USER,
      payload: {currentUser: user}
    });
    dispatch({
      type: USER_STATUS,
      payload: false
    });
  });
};

export const getUsers = () => (dispatch) => {
  dispatch({
    type: USERS_STATUS,
    payload: true
  });
  dbUsers.on("value", (snapshot) => {
    dispatch({
      type: GET_USERS,
      payload: snapshot.val()
    });
    dispatch({
      type: USERS_STATUS,
      payload: false
    });
  });
};

export const setAvatarFirebase = (uid, uploadedCroppedImage) => () => auth.currentUser.updateProfile({photoURL: uploadedCroppedImage});

export const setAvatarLocal = (uid, uploadedCroppedImage) => () => dbUsers.child(uid).update({avatar: uploadedCroppedImage});

export const uploadImage = (uid, blob, metadata) => () => storage
  .child("avatars")
  .child("users")
  .child(uid)
  .put(blob, metadata);

export const googleLogin = () => () => auth.signInWithPopup(googleProvider).then((createdUser) => {
  dbUsers
    .orderByChild("uid")
    .equalTo(createdUser.user.uid)
    .on("value", (snapshot) => {
      if (!snapshot.exists()) {
        dbUsers.child(createdUser.user.uid).update(defaultParams(createdUser));
      }
    });
});

export const register = (username, email, password, image) => () => auth.createUserWithEmailAndPassword(email, password).then((createdUser) => {
  createdUser.user
    .updateProfile({
      displayName: username,
      photoURL: image
    })
    .then(() => {
      dbUsers.child(createdUser.user.uid).update(defaultParams(createdUser));
    });
});

export const logout = (uid) => (dispatch) => auth.signOut().then(() => {
  dispatch(updatePresence(uid));
  dispatch(deleteTyping(uid));
});

export const resetPwd = (email) => () => auth.sendPasswordResetEmail(email);

export const editParamsUser = (uid, data) => () => dbUsers
  .child(uid)
  .child("params")
  .update(data);

export const editUser = (uid, data) => () => dbUsers.child(uid).update(data);

export const deleteUser = (uid) => () => dbUsers.child(uid).remove();
