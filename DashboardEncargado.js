import React, { useState } from "react"; // React y useState para manejar estados locales
import { signOut } from "firebase/auth"; // Función para cerrar sesión de Firebase
import { auth } from "../firebase"; // Importo la configuración de Firebase
import "../styles/DashboardEncargado.css"; // Importo el archivo de estilos CSS para este componente
import FetchIncidents from './FetchIncidents '; 

function DashboardEncargado() {
  // Estado local para manejar el término de búsqueda en la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [showIncidents, setShowIncidents] = useState(false); // Nuevo estado para mostrar incidencias

  // Función para cerrar sesión usando Firebase Authentication
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada exitosamente");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error.message);
      });
  };

  // Función para manejar el clic en el botón de "Incidencias"
  const handleShowIncidents = () => {
    setShowIncidents(true); // Cambia el estado para mostrar las incidencias
  };

  return (
    <div className="encargados-container">
      <header className="header">
        <img src="/logo.png" alt="Logo Mechanical" className="logo" />
        <h2 className="title">Área de Encargados</h2>
      </header>

      <div className="button-group">
        {/* Aquí, pasas una función en el onClick */}
        <button onClick={handleShowIncidents}>Incidencias</button>
        <button>Peticiones de material</button>
        <button>Alta de material</button>
        <button>Actualizar material</button>
        <button>Eliminar material</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar stock"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={() => console.log(searchTerm)}>
          🔍
        </button>
      </div>

      <div className="tools-grid">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="tool-card">
              <div className="tool-image">aquí, img</div>
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

      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>

      {/* Condicional para mostrar el componente FetchIncidents si es necesario */}
      {showIncidents && <FetchIncidents />}
    </div>
  );
}

export default DashboardEncargado;
