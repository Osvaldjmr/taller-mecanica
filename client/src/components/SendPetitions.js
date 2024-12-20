/**
 * @file SendPetitions.js
 * @author
 * Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 * @description Componente que permite a los mecánicos solicitar herramientas disponibles. Las solicitudes incluyen datos como el personal encargado, la fecha de la solicitud y la herramienta requerida.
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";

const SendPetitions = () => {
    // ======== ESTADOS ======== //
    const [personal, setPersonal] = useState(""); // Nombre del personal que realiza la solicitud
    const [fecha, setFecha] = useState(""); // Fecha de la solicitud
    const [herramienta, setHerramienta] = useState(""); // Herramienta solicitada
    const [herramientasDisponibles, setHerramientasDisponibles] = useState([]); // Lista de herramientas disponibles
    const [error, setError] = useState(null); // Estado para manejar errores

    // Objeto que contiene los datos de la nueva petición
    const newPetition = {
        personal,
        fecha,
        herramienta,
    };

    // ======== EFECTOS ======== //
    useEffect(() => {
        // Fetch para obtener la lista de herramientas disponibles
        fetch("http://localhost:3001/herramientas/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar las herramientas");
                }
                return response.json();
            })
            .then((data) => {
                setHerramientasDisponibles(data); // Guarda las herramientas disponibles en el estado
            })
            .catch((error) => {
                console.error("Error al cargar las herramientas:", error);
            });
    }, []); // Solo se ejecuta al montar el componente

    // ======== MANEJADORES ======== //

    /**
     * Maneja el envío del formulario de petición.
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        fetch("http://localhost:3001/peticiones/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPetition), // Enviar los datos al backend
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al enviar la petición");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Petición enviada:", data);
                // Limpia los campos del formulario
                setPersonal("");
                setFecha("");
                setHerramienta("");
                setError(null); // Limpia los errores si los hay
            })
            .catch((error) => {
                console.error("Error al enviar la petición:", error);
                setError("No se pudo enviar la petición. Inténtelo nuevamente.");
            });
    };

    // ======== RENDERIZADO ======== //
    return (
        <div className="petition-container">
            <h2>Formulario de Petición de Herramientas</h2>
            <form className="peticion-form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>} {/* Mostrar errores */}

                {/* Campo para el personal */}
                <label>
                    Personal:
                    <input
                        type="text"
                        value={personal}
                        onChange={(e) => setPersonal(e.target.value)}
                        required
                        className="form-input"
                    />
                </label>

                {/* Campo para la fecha */}
                <label>
                    Fecha:
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        className="form-input"
                    />
                </label>

                {/* Campo para seleccionar la herramienta */}
                <label>
                    Herramienta:
                    <select
                        value={herramienta}
                        onChange={(e) => setHerramienta(e.target.value)}
                        required
                        className="form-input"
                    >
                        <option value="">Seleccione una herramienta</option>
                        {herramientasDisponibles.map((herr, index) => (
                            <option key={index} value={herr.nombre}>
                                {herr.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Botón para enviar la solicitud */}
                <button type="submit" className="submit-button">
                    Enviar Petición
                </button>
            </form>
        </div>
    );
};

export default SendPetitions; // Exporta el componente
