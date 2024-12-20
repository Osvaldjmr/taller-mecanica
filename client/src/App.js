// =======================================
// Autor: Natalia, Anamaria, Borja, Osvaldo
// Fecha: 19/12/2024
// Descripción: Archivo principal de la aplicación React. Gestiona la autenticación y las rutas según los roles obtenidos de Firebase Firestore.
// Versión de la app: 1.0.0
// =======================================

import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; // Configuración de Firebase Authentication
import { doc, getDoc } from "firebase/firestore"; // Para obtener documentos desde Firestore
import { db } from "./firebase"; // Configuración de Firestore
import Login from "./components/Login"; // Componente para la autenticación
import DashboardEncargado from "./components/DashboardEncargado"; // Vista principal para encargados
import DashboardMecanico from "./components/DashboardMecanico"; // Vista principal para mecánicos
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import FetchIncidence from './components/FetchIncidence';
import SendPetitions from "./components/SendPetitions";
import SendIncidence from "./components/SendIncidence";
import FetchPetitions from "./components/FetchPetitions";
import AddMaterial from "./components/AddMaterial";
import UpdateMaterial from "./components/UpdateMaterial";
import HideMaterial from "./components/HideMaterial";

function App() {
  // ======== ESTADOS ========
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Estado para saber si el usuario está autenticado
  const [loading, setLoading] = useState(true); // Estado de carga mientras se obtiene el usuario y rol
  const [role, setRole] = useState(""); // Rol del usuario autenticado ("encargado" o "mecanico")

  // ======== FUNCIONES ========

  // Obtiene el rol del usuario desde Firestore
  const fetchUserRole = async (user) => {
    try {
      console.log("UID del usuario autenticado:", user.uid);
      const userDoc = await getDoc(doc(db, "usuarios", user.uid)); // Accede a la colección "usuarios"
      if (userDoc.exists()) {
        return userDoc.data().role; // Retorna el rol del usuario desde Firestore
      } else {
        console.error("El documento del usuario no existe");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
      return null;
    }
  };

  // Verifica si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Usuario autenticado UID:", user.uid);
        const userRole = await fetchUserRole(user); // Obtén el rol dinámicamente desde Firestore
        setIsLoggedIn(!!userRole); // Establece autenticado si existe un rol
        setRole(userRole || ""); // Define el rol o lo deja vacío si no existe
      } else {
        setIsLoggedIn(false); // Usuario no autenticado
        setRole(""); // Limpia el rol
      }
      setLoading(false); // Finaliza la carga
    });

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, []);

  // ======== RENDERIZADO ========

  if (loading) {
    return <div className="loading-screen">Cargando...</div>; // Pantalla de carga
  }

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        {!isLoggedIn ? (
          <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        ) : role === "encargado" ? (
          <>
            {/* Rutas específicas para encargados */}
            <Route path="/" element={<DashboardEncargado />} />
            <Route path="/incidencias" element={<FetchIncidence />} />
            <Route path="/peticiones" element={<FetchPetitions />} />
            <Route path="/alta-material" element={<AddMaterial />} />
            <Route path="/actualizar-material" element={<UpdateMaterial />} />
            <Route path="/eliminar-material" element={<HideMaterial />} />
          </>
        ) : role === "mecanico" ? (
          <>
            {/* Rutas específicas para mecánicos */}
            <Route path="/" element={<DashboardMecanico />} />
            <Route path="/peticiones" element={<SendPetitions />} />
            <Route path="/incidencias" element={<SendIncidence />} />
          </>
        ) : (
          <Route
            path="/"
            element={<p>{role ? "No tienes permisos para acceder como " + role : "No se encontró rol para este usuario."}</p>}
          />
        )}
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
