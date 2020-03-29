// Firebase
import firebase from "firebase/app";
// Databases
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// Config
const config = {
  apiKey: "****",
  authDomain: "****.firebaseapp.com",
  databaseURL: "https://****.firebaseio.com",
  projectId: "****",
  storageBucket: "****.appspot.com",
  messagingSenderId: "****"
};
// Initialization
firebase.initializeApp(config);
// Auth ref Firebase
export const auth = firebase.auth();
// Google Auth ref Firebase
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Storage ref Firebase
export const storage = firebase.storage().ref();
// Notes ref Firebase
export const dbNotes = firebase.database().ref("/notes");
// Users ref Firebase
export const dbUsers = firebase.database().ref("/users");
// Presences ref Firebase
export const dbPresences = firebase.database().ref("/presences");
// Connected ref Firebase
export const dbConnected = firebase.database().ref(".info/connected");
// Typing ref Firebase
export const dbTyping = firebase.database().ref("/typing");
// Channels ref Firebase
export const dbChannels = firebase.database().ref("/channels");
// Messages ref Firebase
export const dbMessages = firebase.database().ref("/messages");
// PrivateMessages ref Firebase
export const dbPrivateMessages = firebase.database().ref("/privateMessages");
// Settings ref Firebase
export const dbSettings = firebase.database().ref("/settings");
// Patients ref Firebase
export const dbPatients = firebase.database().ref("/patients");
