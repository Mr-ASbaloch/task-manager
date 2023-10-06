// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDezu-gzPFyhNFC3Ro59dHYhG4nrL9UIP4",
  authDomain: "task-manager-5ea3d.firebaseapp.com",
  projectId: "task-manager-5ea3d",
  storageBucket: "task-manager-5ea3d.appspot.com",
  messagingSenderId: "787102064797",
  appId: "1:787102064797:web:cab54c8e07816655eff474",
  measurementId: "G-TEMS2F4P5Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
