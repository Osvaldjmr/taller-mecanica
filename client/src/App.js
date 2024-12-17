//Autores Borja, Ana Maria, Natali, Osvaldo 
// Fecha 17/12/2024
//Deescripcion Implementación del login para mecanico/encargado
// Versión de la app 1.0.0


import React from "react";
import "./App.css"; // Importamos el archivo de estilos CSS

// Componente principal App
function App() {
  return (
    // Contenedor principal que envuelve todo el formulario
    <div className="login-container">
      {/* Encabezado principal */}
      <h1>Stock de herramientas</h1>

      {/* Subtítulo */}
      <h2>Login</h2>

      {/* Formulario */}
      <form>
        {/* Grupo para el campo Email */}
        <div className="form-group">
          {/* Etiqueta para el campo Email */}
          <label>Email</label>
          {/* Input para ingresar el Email */}
          <input type="email" placeholder=" " />
        </div>

        {/* Grupo para el campo Password */}
        <div className="form-group">
          {/* Etiqueta para el campo Password */}
          <label>Password</label>
          {/* Input para ingresar la Password */}
          <input type="password" placeholder=" " />
        </div>

        {/* Botón de envío */}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default App; // Exporta el componente para usarlo en otros archivos
