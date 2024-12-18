import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./components/Login";
import DashboardEncargado from "./components/DashboardEncargado";
import DashboardMecanico from "./components/DashboardMecanico";

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
    <div>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : role === "encargado" ? (
        <DashboardEncargado /> // Muestra el Dashboard para Encargados
      ) : role === "mecanico" ? (
        <DashboardMecanico /> // Muestra el Dashboard para Mecánicos
      ) : (
        <p>No tienes permisos para acceder.</p> // Mensaje para rol no reconocido
      )}
    </div>
  );
}

export default App;