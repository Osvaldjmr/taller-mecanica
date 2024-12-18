// DashboardMecanico.js
import React from "react";

import { signOut } from "firebase/auth"; // Función para cerrar sesión de Firebase
import { auth } from "../firebase"; // Importo la configuración de Firebase

function DashboardMecanico() {
    const handleLogout = () => {
        signOut(auth) // Llama a la función signOut de Firebase
            .then(() => {
                console.log("Sesión cerrada exitosamente"); // Muestra un mensaje en consola si todo sale bien
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error.message); // Muestra un error si algo falla
            });
    };

    return (
        <div>
            <h1>Área de Mecánicos</h1>
            {/* Opciones específicas para el rol de Mecánico */}
            <button>Reportar Incidencia</button>
            <button>Solicitar Herramienta</button>
            <p>Aquí puedes ver las herramientas disponibles y reportar problemas.</p>

            <div className="logout-container">
                <button onClick={handleLogout} className="logout-button">
                    Cerrar Sesión
                </button>
            </div>



        </div>



    );




}

export default DashboardMecanico; // Exporta el componente
