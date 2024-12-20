/**
 * @file DashboardEncargado.js
 * @author Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 * @description Componente principal para la gestión de herramientas y materiales desde el área de encargados.
 * @version 1.0.0
 */

// Importamos las dependencias necesarias
import React, { useState, useEffect } from "react"; // React, useState y useEffect para manejar estados y efectos
import { signOut } from "firebase/auth"; // Función para cerrar sesión de Firebase
import { auth } from "../firebase"; // Importo la configuración de Firebase
import "../styles/DashboardEncargado.css"; // Importo el archivo de estilos CSS para este componente
import { useNavigate } from "react-router-dom"; // Navegación entre rutas
import logo from "../logo.jpg"; // Logo para el encabezado

// Componente principal para el Dashboard del encargado
function DashboardEncargado() {
  // ======== ESTADOS ======== //
  const [searchTerm, setSearchTerm] = useState(""); // Manejo del término de búsqueda
  const [tools, setTools] = useState([]); // Lista de herramientas filtradas
  const [originalTools, setOriginalTools] = useState([]); // Lista completa de herramientas
  const [error, setError] = useState(null); // Manejo de errores
  const navigate = useNavigate(); // Navegación entre rutas

  // ======== FUNCIONES ======== //

  // Cierra la sesión actual del usuario
  const handleLogout = () => {
    signOut(auth)
      .then(() => console.log("Sesión cerrada exitosamente"))
      .catch((error) => console.error("Error al cerrar sesión:", error.message));
  };

  // Navega a la ruta de gestión de peticiones
  const handleNavigateToPetitions = () => {
    navigate("/peticiones");
  };

  // Navega a la ruta de incidencias
  const handleNavigateToIncidence = () => {
    navigate("/incidencias");
  };

  // Navega a la ruta para agregar material
  const handleNavigateToAddMaterial = () => {
    navigate("/alta-material");
  };

  // Navega a la ruta para actualizar material
  const handleNavigatetoUpdateMaterial = () => {
    navigate("/actualizar-material");
  };

  // Navega a la ruta para ocultar/eliminar material
  const handleNavigatetoHideMaterial = () => {
    navigate("/eliminar-material");
  };

  // Carga las herramientas desde el servidor al montar el componente
  useEffect(() => {
    fetch("http://localhost:3001/herramientas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setTools(data); // Lista inicial de herramientas
        setOriginalTools(data); // Copia para búsquedas
      })
      .catch((err) => {
        console.error("Error al cargar herramientas:", err);
        setError("Hubo un error al cargar las herramientas.");
      });
  }, []); // Se ejecuta al montar el componente

  // Filtra las herramientas en función del término de búsqueda
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setTools(originalTools); // Restaura la lista original
      setError(null);
      return;
    }

    const filteredTools = originalTools.filter((tool) =>
      tool.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTools(filteredTools);
    setError(filteredTools.length === 0 ? "No se encontraron herramientas" : null);
  };

  // ======== RENDERIZADO ======== //
  return (
    <div className="encargados-container"> {/* Contenedor principal */}
      {/* Encabezado */}
      <header className="header">
        <img src={logo} alt="Logo Mechanical" className="logo" />
        <h2 className="title">Área de Encargados</h2>
      </header>

      {/* Botones de acción */}
      <div className="button-group">
        <button onClick={handleNavigateToIncidence}>Incidencias</button>
        <button onClick={handleNavigateToPetitions}>Peticiones</button>
        <button onClick={handleNavigateToAddMaterial}>Alta de material</button>
        <button onClick={handleNavigatetoUpdateMaterial}>Actualizar material</button>
        <button onClick={handleNavigatetoHideMaterial}>Eliminar material</button>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar stock"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>🔍</button>
      </div>

      {/* Muestra un mensaje de error si existe */}
      {error && <p className="error-message">{error}</p>}

      {/* Grid de herramientas */}
      <div className="tools-grid">
        {tools.length === 0 ? (
          <p>No se encontraron herramientas</p>
        ) : (
          tools.map((tool) => (
            <div key={tool._id} className="tool-card">
              <div className="tool-image">
                <img
                  src={tool.foto || "/default-image.jpg"}
                  alt={tool.nombre}
                  className="tool-img"
                />
              </div>
              <div className="tool-details">
                <p><strong>Nombre:</strong> {tool.nombre}</p>
                <p><strong>Tipo:</strong> {tool.tipo}</p>
                <p><strong>Marca:</strong> {tool.marca}</p>
                <p><strong>Descripción:</strong> {tool.descripcion}</p>
                <p><strong>Cantidad:</strong> {tool.cantidad}</p>
              </div>
            </div>
          ))
        )}
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

// Exportamos el componente para usarlo en otras partes de la aplicación
export default DashboardEncargado;
