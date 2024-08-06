// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {collection, getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBoqCwVUuv3EYLA5qh5FM4W2SspzY-zb2Q",
  authDomain: "pokedex-6057d.firebaseapp.com",
  projectId: "pokedex-6057d",
  storageBucket: "pokedex-6057d.appspot.com",
  messagingSenderId: "1034163422918",
  appId: "1:1034163422918:web:ebe98094eec44196afb9c7",
  measurementId: "G-PY6X2M3HRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app) 
export const firebaseDB = getFirestore(app) 

export const userRef = collection(firebaseDB, "users")
export const pokemonListRef = collection(firebaseDB, "pokemonList")