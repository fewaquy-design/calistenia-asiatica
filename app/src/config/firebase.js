import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// IMPORTANTE: O usuário precisa substituir essas chaves reais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSy_YOUR_API_KEY_HERE",
  authDomain: "calistenia-app.firebaseapp.com",
  projectId: "calistenia-app",
  storageBucket: "calistenia-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
