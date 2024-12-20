// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Configuración de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCXEcvOjYUXS82obPBOVp7ClCRr4PMLfEE",
    authDomain: "taller-mecanica-c746b.firebaseapp.com",
    projectId: "taller-mecanica-c746b",
    storageBucket: "taller-mecanica-c746b.firebasestorage.app",
    messagingSenderId: "771330988097",
    appId: "1:771330988097:web:491b7109ec71a08e208ec0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);


// Exporta el servicio de autenticación
export const auth = getAuth(app);

export const db = getFirestore(app);