import React from "react";
import "./Dashboard.css"; // Importa los estilos específicos del dashboard

// Componente Dashboard
function Dashboard() {
    return (
        <div className="dashboard-container">
            {/* Encabezado con logo y título */}
            <header>
                <img src="logo.png" alt="Logo" className="logo" /> {/* Logo */}
                <h2>Área de encargados</h2> {/* Descripción */}
            </header>

            {/* Botones de navegación */}
            <div className="navigation-buttons">
                <button>Incidencias</button>
                <button>Necesidad de material</button>
                <button>Alta de material</button>
                <button>Actualizar material</button>
                <button>Eliminar material</button>
            </div>

            {/* Barra de búsqueda */}
            <div className="search-bar">
                <input type="text" placeholder="Buscar stock" /> {/* Input de búsqueda */}
                <button>🔍</button> {/* Botón de búsqueda */}
            </div>

            {/* Grid con tarjetas de herramientas */}
            <div className="tools-grid">
                {/* Renderiza 4 tarjetas con información de herramientas */}
                {Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <div key={index} className="tool-card">
                            <div className="tool-img">aquí, img</div> {/* Imagen */}
                            <p>aquí, nombre herramienta</p>
                            <p>aquí, tipo herramienta</p>
                            <p>aquí, marca</p>
                            <p>aquí, descripción</p>
                            <p>aquí, cantidad</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Dashboard; // Exporta el componente Dashboard
