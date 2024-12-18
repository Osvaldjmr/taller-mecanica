// Importo las dependencias necesarias
import React, { useState } from "react"; // React y useState para manejar estados locales
import { signOut } from "firebase/auth"; // Función para cerrar sesión de Firebase
import { auth } from "../firebase"; // Importo la configuración de Firebase
import "../styles/DashboardEncargado.css"; // Importo el archivo de estilos CSS para este componente

// Declaro el componente DashboardEncargado
function DashboardEncargado() {
  // Estado local para manejar el término de búsqueda en la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Función para cerrar sesión usando Firebase Authentication
  const handleLogout = () => {
    signOut(auth) // Llama a la función signOut de Firebase
      .then(() => {
        console.log("Sesión cerrada exitosamente"); // Mostramos un mensaje en consola si todo sale bien
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error.message); // Mostramos un error si algo falla
      });
  };

  return (
    <div className="encargados-container">
      {/* Encabezado del área de encargados */}
      <header className="header">
        {/* Logo de la empresa */}
        <img src="/logo.png" alt="Logo Mechanical" className="logo" /> {/* debemos sustituir el logo */}
        {/* Título del área */}
        <h2 className="title">Área de Encargados</h2>
      </header>

      {/* Grupo de botones para realizar acciones */}
      <div className="button-group">
        <button>Incidencias</button> {/* Botón para incidencias */}
        <button>Peticiones de material</button> {/* Botón para peticiones */}
        <button>Alta de material</button> {/* Botón para agregar material */}
        <button>Actualizar material</button> {/* Botón para actualizar material */}
        <button>Eliminar material</button> {/* Botón para eliminar material */}
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text" // Tipo de input es texto
          placeholder="Buscar stock" // Texto de ayuda dentro del input
          className="search-input" // Clase CSS para aplicar estilos
          value={searchTerm} // El valor del input viene del estado "searchTerm"
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado cuando el usuario escribe
        />
        {/* Botón para ejecutar la búsqueda */}
        <button className="search-button" onClick={() => console.log(searchTerm)}>
          🔍 {/* Ícono de lupa */}
        </button>
      </div>

      {/* Grid de tarjetas para mostrar herramientas */}
      <div className="tools-grid">
        {/* Genero 4 tarjetas usando el método map */}
        {Array(4)
          .fill(null) // Creo un arreglo temporal de 4 posiciones vacías
          .map((_, index) => (
            <div key={index} className="tool-card">
              {/* Imagen de la herramienta */}
              <div className="tool-image">aquí, img</div>
              {/* Detalles de la herramienta */}
              <div className="tool-details">
                <p>aquí, nombre herramienta</p>
                <p>aquí, tipo herramienta</p>
                <p>aquí, marca</p>
                <p>aquí, descripción</p>
                <p>aquí, cantidad</p>
              </div>
            </div>
          ))}
      </div>

      {/* Botón para cerrar sesión */}
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default DashboardEncargado; // Exporto el componente para usarlo en otros archivos
