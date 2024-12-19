// Importamos las dependencias necesarias
import React, { useEffect, useState } from "react";
/* import Incidencias from "./Incidencias";
import NecesidadDeMaterial from "./NecesidadDeMaterial";
import HerramientaCard from "./HerramientaCard"; */
import "../styles/DashboardMecanico.css";
import FetchIncidents from './FetchIncidents';
import FetchPetitions from "./FetchPetitions";


import { signOut } from "firebase/auth"; // Función para cerrar sesión de Firebase
import { auth } from "../firebase"; // Configuración de Firebase

// Componente principal DashboardMecanico
function DashboardMecanico() {
    // Estados para manejar los inputs y la lógica del componente
    const [incidencia, setIncidencia] = useState(""); // Input para incidencia
    const [necesidad, setNecesidad] = useState(""); // Input para necesidad
    const [busqueda, setBusqueda] = useState(""); // Input para buscar herramientas
    const [herramientas, setHerramientas] = useState([]); // Lista de herramientas obtenidas del backend (Nuevo código)
    const [herramientasFiltradas, setHerramientasFiltradas] = useState([]); // Lista filtrada de herramientas según la búsqueda (Nuevo código)
    const [error, setError] = useState(null); // Manejo de errores (inicialmente `null`)

    const [showIncidents, setShowIncidents] = useState(false);


    //Efecto para cargar las herramientas desde la base de datos al montar el componente
    //useEffect para cargar herramientas desde el servidor.
    useEffect(() => {
        // Realizamos una solicitud al backend para obtener herramientas
        fetch("http://localhost:3001/herramientas") // Cambiar la URL al endpoint real
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener las herramientas");
                }
                return response.json(); // Parseamos la respuesta como JSON
            })
            .then((data) => {
                setHerramientas(data); // Guardamos las herramientas obtenidas
                setHerramientasFiltradas(data); // Inicializamos la lista filtrada con todos los datos
            })
            .catch((err) => {
                console.error("Error al cargar las herramientas:", err);
                setError("Hubo un error al cargar las herramientas."); // Manejamos el error y mostramos un mensaje
            });
    }, []); // Solo se ejecuta al montar el componente

    // Manejamos los cambios en el input de búsqueda
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value); // Actualizamos el estado de búsqueda
        // Filtramos herramientas basadas en el texto ingresado
        const filtradas = herramientas.filter((herramienta) =>
            herramienta.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setHerramientasFiltradas(filtradas); // Actualizamos la lista de herramientas filtradas
    };

    // Código antiguo para buscar herramientas reemplazado:
    // const handleBuscarStockClick = mostrarHerramientas.filter(herramienta => herramienta.nombre.toLowerCase().includes(busqueda.toLowerCase()));

    // Maneja el cierre de sesión
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada exitosamente");
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error.message);
            });
    };

    return (
        <div className="dashboard-container">
            {/* Encabezado */}
            <header className="dashboard-header">
                <div className="logo-container">
                    <img src="logo.png" alt="Logo Mechanical" className="logo" />
                    <h1 className="title">Área de Mecánicos</h1>
                </div>
            </header>

            {/* Barra de opciones */}
            <div className="options-container">
                <button onClick={() => setShowIncidents(!showIncidents)}>Incidencias</button>
                {showIncidents && <FetchIncidents />}
                <button className="option-button">Petición de material</button>
                <FetchPetitions />  {/* Aqui he añadido el componente para petición de herramientas */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar stock"
                        value={busqueda}
                        onChange={handleBusquedaChange}
                        className="search-input"
                    />
                    <button className="search-button">🔍</button>
                </div>
            </div>

            {/* Grid de herramientas */}
            <main className="tools-grid">
                {herramientasFiltradas.length === 0 ? (
                    <p className="error-message">{error || "No se encontraron herramientas"}</p>
                ) : (
                    herramientasFiltradas.map((herramienta, index) => (
                        <div key={index} className={`tool-card ${herramienta.cantidad === 0 ? "low-stock" : ""}`}>
                            <img src={herramienta.foto || "/default-image.jpg"} alt={herramienta.nombre} className="tool-image" />

                            <p><strong>Nombre:</strong> {herramienta.nombre}</p>
                            <p><strong>Tipo:</strong> {herramienta.tipo}</p>
                            <p><strong>Marca:</strong> {herramienta.marca}</p>
                            <p><strong>Descripción:</strong> {herramienta.descripcion}</p>
                            <p><strong>Cantidad:</strong> <span className={herramienta.cantidad === 0 ? "low-quantity" : ""}>{herramienta.cantidad}</span></p>
                        </div>
                    ))
                )}
            </main>

            {/* Botón para cerrar sesión */}
            <div className="logout-container">
                <button onClick={handleLogout} className="logout-button">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default DashboardMecanico;
