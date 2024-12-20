// Importamos las dependencias necesarias
import React, { useState, useEffect } from "react"; // React, useState y useEffect para manejar estados y efectos
import { signOut } from "firebase/auth"; // Funci贸n para cerrar sesi贸n de Firebase
import { auth } from "../firebase"; // Importo la configuraci贸n de Firebase
import "../styles/DashboardEncargado.css"; // Importo el archivo de estilos CSS para este componente
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import logo from "../logo.jpg";


// Declaro el componente principal DashboardEncargado
function DashboardEncargado() {
  // Estado local para manejar el t茅rmino de b煤squeda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState("");
  // Estado local para manejar las herramientas encontradas en la b煤squeda
  const [tools, setTools] = useState([]);
  // este ser谩 un estado para almacenar el t茅rmino de b煤squeda ingresado por el usuario
  const [originalTools, setOriginalTools] = useState([])
  // Estado local para manejar posibles errores durante la b煤squeda
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate


  // Funci贸n para cerrar sesi贸n usando Firebase Authentication
  const handleLogout = () => {
    // Llamada a la funci贸n signOut de Firebase
    signOut(auth)
      .then(() => {
        // Mensaje de 茅xito en la consola
        console.log("Sesi贸n cerrada exitosamente");
      })
      .catch((error) => {
        // Mensaje de error en la consola si algo falla
        console.error("Error al cerrar sesi贸n:", error.message);
      });
  };


  // Funci贸n para navegar a incidencias
  const handleNavigateToIncidence = () => {
    navigate("/incidencias");
  };



  // Efecto para cargar todas las herramientas al montar el componente
  useEffect(() => {
    fetch("http://localhost:3001/herramientas") // Cambiado desde tools
      .then((response) => {
        // verificamos si la resp霉esta es v谩lida
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json(); // parseamos la respuestas como JSON
      })
      .then((data) => {
        // almacenamos los datos en el estado
        setTools(data);
        setOriginalTools(data); // Guardamos una copia original
        setError(null);
      })
      .catch((err) => {
        // si ocurre un error lo manejamos aqu铆
        console.error("Error al cargar herramientas:", err);
        setError("Hubo un error al cargar las herramientas");
      });
  }, []); // Dependencia vac铆a: solo se ejecuta al montar el componente


  // Funci贸n para realizar la b煤squeda de herramientas
  const handleSearch = () => {
    // Si el t茅rmino de b煤squeda est谩 vac铆o, mostramos un error y restauramos la lista
    if (!searchTerm.trim()) {
      setError("Por favor, ingresa un t茅rmino para buscar");
      setTools(originalTools); // Restauramos las herramientas originales
      return;
    }

    // Filtrar herramientas basadas en el t茅rmino de b煤squeda
    const filteredTools = tools.filter((tool) =>
      tool.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Si encontramos herramientas, actualizamos el estado; si no, mostramos un mensaje de error
    if (filteredTools.length > 0) {
      setTools(filteredTools); // Actualizamos con las herramientas filtradas
      setError(null); // No hay error
    } else {
      setTools([]); // Vac铆amos la lista de herramientas
      setError("No se encontraron herramientas que coincidan con tu b煤squeda");
    }
  };

  return (
    <div className="encargados-container"> {/* Contenedor principal */}
      {/* Encabezado del 谩rea de encargados */}
      <header className="header">
         {/* Logo del 谩rea de encargados */}
        <img src={logo} alt="Logo Mechanical" className="logo" /> {/* Logo */}
        <h2 className="title">脕rea de Encargados</h2> {/* T铆tulo */}
      </header>

      {/* Grupo de botones para realizar acciones */}
      <div className="button-group">
      <button onClick={handleNavigateToIncidence}>Incidencias</button>
        <button>Peticiones de material</button> {/* Bot贸n para peticiones */}
        <button>Alta de material</button> {/* Bot贸n para alta */}
        <button>Actualizar material</button> {/* Bot贸n para actualizar */}
        <button>Eliminar material</button> {/* Bot贸n para eliminar */}
      </div>

      {/* Barra de b煤squeda */}
      <div className="search-bar">
         {/* Campo de texto para ingresar el t茅rmino de b煤squeda */}
        <input
          type="text"
          placeholder="Buscar stock" // Placeholder para el campo de texto
          className="search-input" // Clase para estilos
          value={searchTerm} // Estado ligado al campo de texto
          onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el estado al escribir
        />
        <button className="search-button" onClick={handleSearch}> {/* Bot贸n para iniciar la b煤squeda */}
          馃攳
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
                <img 
                src={tool.foto || "/default-image.jpg"}
                alt={tool.nombre} 
                className="tool-img" // clase para la imagen
                />
              </div>
              <div className="tool-details"> {/* Detalles de la herramienta */}
                <p><strong>Nombre:</strong> {tool.nombre}</p>
                <p><strong>Tipo:</strong> {tool.tipo}</p>
                <p><strong>Marca:</strong> {tool.marca}</p>
                <p><strong>Descripci贸n:</strong> {tool.descripcion}</p>
                <p><strong>Cantidad:</strong> {tool.cantidad}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bot贸n para cerrar sesi贸n */}
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesi贸n
        </button>
      </div>
    </div>
  );
}

// Exportamos el componente para usarlo en otras partes de la aplicaci贸n
export default DashboardEncargado;