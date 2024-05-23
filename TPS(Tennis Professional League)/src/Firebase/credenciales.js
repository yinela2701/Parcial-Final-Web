// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD19sNKO5uZZc7Lurl_ZlsF_K7SH8rFggw",
  authDomain: "tps-tennis-professional-league.firebaseapp.com",
  projectId: "tps-tennis-professional-league",
  storageBucket: "tps-tennis-professional-league.appspot.com",
  messagingSenderId: "782289422835",
  appId: "1:782289422835:web:06203fe509220b6b73aa86"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const storage = getStorage();

export default firebaseApp;
