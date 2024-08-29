import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyADv19h29SdRk4BuCOKbOyhIl_tFc554KA",
  authDomain: "video-9278f.firebaseapp.com",
  projectId: "video-9278f",
  storageBucket: "video-9278f.appspot.com",
  messagingSenderId: "1042000799652",
  appId: "1:1042000799652:web:4129a66f1a16e7178c4331"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;