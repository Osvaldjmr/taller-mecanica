/**
 * @file FetchIncidence.js
 * @author Natalia
 * @date 19/12/2024
 * @description Componente para listar incidencias, permitiendo aprobar o denegar su estado. Consume una API para obtener las incidencias almacenadas.
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react'; // Manejo de estados y efectos en React
import '../styles/FetchIncidents.css'; // Estilos específicos del componente

const FetchIncidence = () => {
    // ======== ESTADOS ======== //
    const [incidences, setIncidences] = useState([]); // Lista de incidencias
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [error, setError] = useState(null); // Manejador de errores

    // ======== FUNCIONES ======== //

    // Función para obtener las incidencias desde la API
    useEffect(() => {
        const fetchIncidence = async () => {
            try {
                const response = await fetch('http://localhost:3001/incidencias'); // Endpoint para incidencias
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las incidencias'); // Error en caso de fallo en la respuesta
                }
                const data = await response.json();
                setIncidences(data); // Guardamos las incidencias en el estado
            } catch (error) {
                setError(error.message); // Guardamos el mensaje de error
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchIncidence(); // Llamamos a la función cuando el componente se monte
    }, []); // Dependencia vacía: solo se ejecuta al montar el componente

    // Función para actualizar el estado de una incidencia (Aprobada o Denegada)
    const handleUpdateIncidence = async (id, newState) => {
        console.log(`Actualizando incidencia ${id} a estado: ${newState}`);
        try {
            const response = await fetch(`http://localhost:3001/incidencias/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estado: newState }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar la incidencia");
            }

            // Actualizamos el estado local con los cambios
            setIncidences((prevIncidences) =>
                prevIncidences.map((incidence) =>
                    incidence._id === id ? { ...incidence, estado: newState } : incidence
                )
            );
        } catch (error) {
            console.error("Error al actualizar la incidencia: ", error);
        }
    };

    // ======== RENDERIZADO ======== //

    // Mostrar mensaje de carga
    if (loading) return <p className="loading">Cargando incidencias...</p>;

    // Mostrar mensaje de error
    if (error) return <p className="error">Error: {error}</p>;

    // Renderizar las incidencias
    return (
        <div className="incidents-container">
            <h3>Lista de Incidencias</h3>
            <ul className="incidents-list">
                {incidences.map((incidence) => (
                    <li key={incidence._id} className="incident-item">
                        <p><strong>Personal:</strong> {incidence.personal}</p>
                        <p><strong>Fecha:</strong> {incidence.fecha}</p>
                        <p><strong>Herramienta:</strong> {incidence.herramienta}</p>
                        <p><strong>Descripción:</strong> {incidence.descripcion}</p>
                        <p><strong>Estado:</strong> {incidence.estado}</p>
                        <div className="action-buttons">
                            {incidence.estado === "Aprobada" || incidence.estado === "Denegada" ? (
                                // Muestra solo el estado si ya ha sido aprobado o denegado
                                <p className={`status-${incidence.estado.toLowerCase()}`}>
                                    Estado: {incidence.estado}
                                </p>
                            ) : (
                                // Botones para aprobar o denegar si la incidencia está pendiente
                                <>
                                    <button
                                        className="approve-button"
                                        onClick={() => handleUpdateIncidence(incidence._id, "Aprobada")}
                                    >
                                        Aprobar
                                    </button>
                                    <button
                                        className="deny-button"
                                        onClick={() => handleUpdateIncidence(incidence._id, "Denegada")}
                                    >
                                        Denegar
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default FetchIncidence;
