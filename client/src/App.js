import React, { useState } from "react"; // Importa React y el hook useState
import Login from "./components/Login"; // Importa el componente Login
import Dashboard from "./components/Dashboard"; // Importa el componente Dashboard
import "./App.css"; // Importa los estilos globales

// Componente principal App
function App() {
  // Estado para controlar si el usuario está logueado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {/* Renderiza el componente Login si el usuario NO está logueado */}
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        // Renderiza el componente Dashboard si el usuario está logueado
        <Dashboard />
      )}
    </div>
  );
}

export default App; // Exporta el componente para usarlo en otros archivos
