/**
 * @file DashboardMecanico.js
 * @author Natalia
 * @date 19/12/2024
 * @description Componente principal para la interfaz del mecánico. Permite realizar peticiones de material, notificar incidencias y visualizar herramientas disponibles.
 * @version 1.0.0
 */

import React, { useEffect, useState } from "react"; // Manejo de estados y efectos en React
import { useNavigate } from "react-router-dom"; // Navegación entre rutas
import { signOut } from "firebase/auth"; // Cierre de sesión con Firebase
import { auth } from "../firebase"; // Configuración de Firebase
import "../styles/DashboardMecanico.css"; // Estilos específicos del dashboard
import logo from "../logo.jpg"; // Logo del sistema

// Componente principal para el Dashboard de Mecánicos
function DashboardMecanico() {
    // ======== ESTADOS ======== //
    const [busqueda, setBusqueda] = useState(""); // Almacena el término de búsqueda
    const [herramientas, setHerramientas] = useState([]); // Lista completa de herramientas
    const [herramientasFiltradas, setHerramientasFiltradas] = useState([]); // Lista de herramientas filtradas
    const [error, setError] = useState(null); // Estado para manejar errores


    const navigate = useNavigate(); // Hook para manejar la navegación

    // ======== FUNCIONES DE NAVEGACIÓN ======== //

    // Navega a la página de notificación de incidencias
    const handleNavigateToIncidences = () => {
        navigate("/incidencias");
    };

    // Navega a la página de petición de material
    const handleNavigateToPetitions = () => {
        navigate("/peticiones");
    };

    // ======== EFECTO PARA CARGAR HERRAMIENTAS ======== //
    useEffect(() => {
        // Fetch inicial para cargar herramientas desde el backend
        fetch("http://localhost:3001/herramientas") // Endpoint para obtener herramientas
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener las herramientas");
                }
                return response.json(); // Convierte la respuesta en JSON
            })
            .then((data) => {
                // Filtra herramientas visibles
                const visibles = data.filter((herramienta) => herramienta.visible !== false);
                setHerramientas(visibles); // Almacena las herramientas visibles
                setHerramientasFiltradas(visibles); // Inicializa la lista filtrada
            })
            .catch((err) => {
                console.error("Error al cargar las herramientas:", err);
                setError("Hubo un error al cargar las herramientas."); // Muestra mensaje de error
            });
    }, []); // Se ejecuta al montar el componente

    // ======== MANEJADORES ======== //

    // Maneja el cambio en el input de búsqueda
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value); // Actualiza el término de búsqueda
        const filtradas = herramientas.filter((herramienta) =>
            herramienta.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setHerramientasFiltradas(filtradas); // Actualiza la lista filtrada
    };

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

    // ======== RENDERIZADO ======== //
    return (
        <div className="dashboard-container"> {/* Contenedor principal */}

            {/* Encabezado */}
            <header className="dashboard-header">
                <div className="logo-container">
                    <img src={logo} alt="Logo Mechanical" className="logo" />
                    <h1 className="title">Área de Mecánicos</h1>
                </div>
            </header>

            {/* Barra de opciones */}
            <div className="options-container">
                <button className="option-button" onClick={handleNavigateToIncidences}>Notificar Incidencias</button>
                <button className="option-button" onClick={handleNavigateToPetitions}>Petición de material</button>

                <div className="search-bar"> {/* Barra de búsqueda */}
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

// Exportamos el componente para usarlo en otras partes de la aplicación
export default DashboardMecanico;
