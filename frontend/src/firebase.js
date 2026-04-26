// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRn5VhoVbnelG3lpkOgZfT827NtXwTr-8",
  authDomain: "social-sphere-bcf98.firebaseapp.com",
  projectId: "social-sphere-bcf98",
  storageBucket: "social-sphere-bcf98.firebasestorage.app",
  messagingSenderId: "531100915241",
  appId: "1:531100915241:web:f54730283969ccee46ae38"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };
