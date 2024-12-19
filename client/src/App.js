import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./components/Login";
import DashboardEncargado from "./components/DashboardEncargado";
import DashboardMecanico from "./components/DashboardMecanico";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // se instalo react-router-dom para usar 
import FetchIncidents from './components/FetchIncidents'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const [loading, setLoading] = useState(true); // Estado de carga
  const [role, setRole] = useState(""); // Estado para el rol del usuario

  // Simula la obtención del rol desde Firebase
  const fetchUserRole = (user) => {
    // Aquí colocarías tu lógica real para obtener el rol desde Firestore o backend
    // Simulamos un rol basado en el email del usuario (temporal)
    if (user.email === "encargado@fake.com") {
      setRole("encargado");
    } else if (user.email === "mecanico@fake.com") {
      setRole("mecanico");
    } else {
      setRole(""); // Rol no reconocido
    }
  };

  // Verifica si el usuario está autenticado
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // Usuario autenticado
        fetchUserRole(user); // Obtiene el rol del usuario
      } else {
        setIsLoggedIn(false); // Usuario no autenticado
        setRole(""); // Limpia el rol
      }
      setLoading(false); // Finaliza la carga
    });
  }, []);

  if (loading) return <p>Cargando...</p>; // Muestra la pantalla de carga

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        {!isLoggedIn ? (
          <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        ) : role === "encargado" ? (
          <>
            {/* Rutas para el encargado */}
            <Route path="/" element={<DashboardEncargado />} />
            <Route path="/incidencias" element={<FetchIncidents />} />
          </>
        ) : role === "mecanico" ? (
          <>
            {/* Ruta para el mecánico */}
            <Route path="/" element={<DashboardMecanico />} />
          </>
        ) : (
          <Route path="/" element={<p>No tienes permisos para acceder.</p>} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
