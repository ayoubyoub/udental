// Firebase
import firebase from "firebase/app";
// Databases
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// Config
const config = {
  apiKey: "AIzaSyBUi8CL8LJQX5Qptv1VhzmxY64BqUe7k1A",
  authDomain: "youbapp-2020.firebaseapp.com",
  databaseURL: "https://youbapp-2020.firebaseio.com",
  projectId: "youbapp-2020",
  storageBucket: "youbapp-2020.appspot.com",
  messagingSenderId: "1022223137548"
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
