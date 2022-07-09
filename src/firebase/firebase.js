import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    return "TRUE";
  } catch (e) {
    return e.message;
  }
};

const signUpWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return "TRUE";
  } catch (e) {
    return e.message;
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "TRUE";
  } catch (e) {
    return e.message;
  }
};

const logoutUser = () => {
  signOut(auth);
  localStorage.setItem("userInfo", null);
};

const getUserToken = async () => {
  const token = await getAuth().currentUser.getIdToken(true);
  return token;
};

const isUserLoggedIn = () => {
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  if (userInfoFromStorage) {
    return true;
  } else {
    return false;
  }
};

const loggedInUserToken = () => {
  const userToken = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  return userToken;
};

export {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  logInWithEmailAndPassword,
  logoutUser,
  getUserToken,
  isUserLoggedIn,
  loggedInUserToken
};
