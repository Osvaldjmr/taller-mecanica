// App.js
import React, { useState } from "react";
import Login from "./components/Login"; // Importa el componente de login
import Dashboard from "./components/Dashboard"; // Importa el componente Dashboard
import "./App.css"; // Importa estilos globales

// Componente principal
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar la sesión

  return (
    <div>
      {/* Si no está logueado, muestra el formulario de login */}
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} /> // Pasa la función onLogin como prop
      ) : (
        // Si está logueado, muestra el Dashboard
        <Dashboard />
      )}
    </div>
  );
}

export default App;
