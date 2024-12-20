/**
 * @file SendIncidence.js
 * @author
 * Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 * @description Componente para gestionar el envío de incidencias desde los mecánicos al sistema. Las incidencias incluyen información como el personal encargado, la fecha, la herramienta afectada y una descripción del problema.
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react"; // Importaciones de React

const SendIncidence = () => {
    // ======== ESTADOS ======== //
    const [personal, setPersonal] = useState(""); // Nombre del personal
    const [fecha, setFecha] = useState(""); // Fecha de la incidencia
    const [herramienta, setHerramienta] = useState(""); // Herramienta afectada
    const [descripcion, setDescripcion] = useState(""); // Descripción del problema
    const [herramientasDisponibles, setHerramientasDisponibles] = useState([]); // Lista de herramientas disponibles

    // Objeto para la nueva incidencia
    const newIncidence = {
        personal,
        fecha,
        herramienta,
        descripcion,
    };

    // ======== EFECTOS ======== //
    useEffect(() => {
        // Fetch para obtener las herramientas disponibles
        fetch("http://localhost:3001/herramientas")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar las herramientas");
                }
                return response.json();
            })
            .then((data) => {
                setHerramientasDisponibles(data); // Guarda las herramientas disponibles
            })
            .catch((error) => {
                console.error("Error al cargar las herramientas:", error);
            });
    }, []); // Solo se ejecuta al montar el componente

    // ======== MANEJADORES ======== //

    /**
     * Maneja el envío del formulario de incidencia.
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        fetch("http://localhost:3001/incidencias/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newIncidence), // Enviar los datos al backend
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al enviar la incidencia");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Incidencia enviada:", data);
                // Limpia los campos del formulario
                setPersonal("");
                setFecha("");
                setHerramienta("");
                setDescripcion("");
            })
            .catch((error) => {
                console.error("Error al enviar la incidencia:", error);
            });
    };

    // ======== RENDERIZADO ======== //
    return (
        <div>
            <h2>Formulario de Envío de Incidencias</h2>
            <form className="incidence-form" onSubmit={handleSubmit}>
                {/* Campo para el personal */}
                <label>
                    Personal:
                    <input
                        type="text"
                        value={personal}
                        onChange={(e) => setPersonal(e.target.value)}
                        required
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
                    />
                </label>

                {/* Campo para seleccionar la herramienta */}
                <label>
                    Herramienta:
                    <select
                        value={herramienta}
                        onChange={(e) => setHerramienta(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una herramienta</option>
                        {herramientasDisponibles.map((herr, index) => (
                            <option key={index} value={herr.nombre}>
                                {herr.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Campo para la descripción */}
                <label>
                    Descripción:
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </label>

                {/* Botón para enviar el formulario */}
                <button type="submit">Enviar Incidencia</button>
            </form>
        </div>
    );
};

export default SendIncidence; // Exporta el componente
