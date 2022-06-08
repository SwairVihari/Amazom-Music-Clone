// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQlLtibkb1-TjyA9aEpHdvfHplJCIpzCc",
  authDomain: "music-clone-30206.firebaseapp.com",
  projectId: "music-clone-30206",
  storageBucket: "music-clone-30206.appspot.com",
  messagingSenderId: "143063021055",
  appId: "1:143063021055:web:3495f07386bc81943523ca",
  measurementId: "G-VHY45J7RCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

