import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyAOQuibumTiwqAIhrncz-Z8s6qM1xZvIhU",
    authDomain: "dmail-app-9f867.firebaseapp.com",
    projectId: "dmail-app-9f867",
    storageBucket: "dmail-app-9f867.appspot.com",
    messagingSenderId: "661101977483",
    appId: "1:661101977483:web:2b62fbdbca69d6ac60d98e"
})

const db = getFirestore();
const auth = getAuth();

export { db,auth }