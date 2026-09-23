import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7PGO9seuZ2Jbamb1Ccy_f-YdQIH_IEMA",
  authDomain: "student-portal-cf0c6.firebaseapp.com",
  projectId: "student-portal-cf0c6",
  storageBucket: "student-portal-cf0c6.firebasestorage.app",
  messagingSenderId: "850449692853",
  appId: "1:850449692853:web:0d809e3897d9459f05a25c",
  measurementId: "G-Q2X754KBJP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);