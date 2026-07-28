import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOSKPqhu9WomKozm00uF678-hM-ImfPdo",
  authDomain: "gelatina-mounjaro.firebaseapp.com",
  databaseURL: "https://gelatina-mounjaro-default-rtdb.firebaseio.com",
  projectId: "gelatina-mounjaro",
  storageBucket: "gelatina-mounjaro.firebasestorage.app",
  messagingSenderId: "677492215121",
  appId: "1:677492215121:web:d71ba767f38d40569ed770",
  measurementId: "G-RLTZTX2FWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
