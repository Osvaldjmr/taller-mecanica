// Importamos las dependencias necesarias
import React, { useState, useEffect } from "react"; // React, useState y useEffect para manejar estados y efectos
import { signOut } from "firebase/auth"; // Función para cerrar sesión de Firebase
import { auth } from "../firebase"; // Importo la configuración de Firebase
import "../styles/DashboardEncargado.css"; // Importo el archivo de estilos CSS para este componente

// Declaro el componente principal DashboardEncargado
function DashboardEncargado() {
  // Estado local para manejar el término de búsqueda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState("");
  // Estado local para manejar las herramientas encontradas en la búsqueda
  const [tools, setTools] = useState([]);
  // Estado local para manejar posibles errores durante la búsqueda
  const [error, setError] = useState(null);

  // Función para cerrar sesión usando Firebase Authentication
  const handleLogout = () => {
    // Llamada a la función signOut de Firebase
    signOut(auth)
      .then(() => {
        // Mensaje de éxito en la consola
        console.log("Sesión cerrada exitosamente");
      })
      .catch((error) => {
        // Mensaje de error en la consola si algo falla
        console.error("Error al cerrar sesión:", error.message);
      });
  };

  // Efecto para cargar todas las herramientas al montar el componente
  useEffect(() => {
    fetch("http://localhost:3001/herramientas") // Cambiado desde tools
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setTools(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al cargar herramientas:", err);
        setError("Hubo un error al cargar las herramientas");
      });
  }, []); // Dependencia vacía


  // Función para realizar la búsqueda de herramientas
  const handleSearch = () => {
    // Verificamos que el término de búsqueda no esté vacío
    if (!searchTerm.trim()) {
      setError("Por favor, ingresa un término para buscar");
      return;
    }

    // Filtrar herramientas basadas en el término de búsqueda
    const filteredTools = tools.filter((tool) =>
      tool.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredTools.length > 0) {
      setTools(filteredTools);
      setError(null);
    } else {
      setTools([]);
      setError("No se encontraron herramientas que coincidan con tu búsqueda");
    }
  };

  return (
    <div className="encargados-container"> {/* Contenedor principal */}
      {/* Encabezado del área de encargados */}
      <header className="header">
        <img src="/logo.png" alt="Logo Mechanical" className="logo" /> {/* Logo */}
        <h2 className="title">Área de Encargados</h2> {/* Título */}
      </header>

      {/* Grupo de botones para realizar acciones */}
      <div className="button-group">
        <button>Incidencias</button> {/* Botón para incidencias */}
        <button>Peticiones de material</button> {/* Botón para peticiones */}
        <button>Alta de material</button> {/* Botón para alta */}
        <button>Actualizar material</button> {/* Botón para actualizar */}
        <button>Eliminar material</button> {/* Botón para eliminar */}
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar stock" // Placeholder para el campo de texto
          className="search-input" // Clase para estilos
          value={searchTerm} // Estado ligado al campo de texto
          onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el estado al escribir
        />
        <button className="search-button" onClick={handleSearch}> {/* Botón para iniciar la búsqueda */}
          🔍
        </button>
      </div>

      {/* Mostrar errores si los hay */}
      {error && <p className="error-message">{error}</p>}

      {/* Grid de tarjetas para mostrar herramientas */}
      <div className="tools-grid">
        {tools.length === 0 ? (
          // Si no hay herramientas, mostramos un mensaje
          <p>No se encontraron herramientas</p>
        ) : (
          // Si hay herramientas, las iteramos y mostramos
          tools.map((tool) => (
            <div key={tool._id} className="tool-card"> {/* Tarjeta de herramienta */}
              <div className="tool-image"> {/* Imagen de la herramienta */}
                <img src={tool.foto || "/default-image.jpg"} alt={tool.nombre} />
              </div>
              <div className="tool-details"> {/* Detalles de la herramienta */}
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
