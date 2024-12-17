// firebase.js
// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración del proyecto Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyCXEcvOjYUXS82obPBOVp7ClCRr4PMLfEE",
    authDomain: "taller-mecanica-c746b.firebaseapp.com",
    projectId: "taller-mecanica-c746b",
    storageBucket: "taller-mecanica-c746b.firebasestorage.app",
    messagingSenderId: "771330988097",
    appId: "1:771330988097:web:491b7109ec71a08e208ec0"
};

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Exporta los servicios de Firebase para usarlos en otros archivos
export const auth = getAuth(app); // Servicio de autenticación
export const db = getFirestore(app); // Base de datos Firestore
