// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//Configuracion de firebase como backend
const firebaseConfig = {
  apiKey: "AIzaSyBXcw0YRO_7cW9I_PDDocbXXTjhJqV7yik",
  authDomain: "pokemon-api-78e78.firebaseapp.com",
  projectId: "pokemon-api-78e78",
  storageBucket: "pokemon-api-78e78.appspot.com",
  messagingSenderId: "125054575437",
  appId: "1:125054575437:web:aee9062cb80330e5180d04"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)  // Permite la autenticación de usuarios