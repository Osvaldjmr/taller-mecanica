import React, { useEffect, useState } from 'react';
import '../styles/FetchIncidents.css';

const FetchIncidence = () => {
    const [incidences, setIncidences] = useState([]); // Estado para almacenar las incidencias
    const [loading, setLoading] = useState(true); // Estado para indicar si estamos cargando los datos
    const [error, setError] = useState(null); // Estado para manejar errores

    // Función para obtener las incidencias de la API
    useEffect(() => {
        const fetchIncidence = async () => {
            try {
                const response = await fetch('http://localhost:3001/incidencias');  // Endpoint para incidencias
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las incidencias'); // Error en caso de respuesta no OK
                }
                const data = await response.json();
                console.log("Datos obtenidos del servidor:", data); // Depuración
                setIncidences(data); // Guardamos los datos en el estado
            } catch (error) {
                setError(error.message); // Guardamos el mensaje de error
            } finally {
                setLoading(false); // Indicamos que la carga ha finalizado
            }
        };

        fetchIncidence(); // Llamamos a la función cuando el componente se monte
    }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

    // Función para actualizar el estado de una incidencia
    const handleUpdateIncidence = async (id, newState) => {
        console.log(`URL generada: http://localhost:3001/incidencias/${id}`);
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

            const updatedIncidence = await response.json();


            // Actualiza la incidencia en el estado local
            setIncidences((prevIncidences) =>
                prevIncidences.map((incidence) =>
                    incidence._id === id ? {...incidence, estado: newState } :incidence
                )
            );
        } catch (error) {
            console.error("Error al actualizar la incidencia: ", error);
        }
    };


    if (loading) return <p className="loading">Cargando incidencias...</p>; // fue agregado className="loading"
    if (error) return <p className="error">Error: {error}</p>; // fue agregado className="error"

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
                        {/* Botones para aprobar o denegar */}
                        <div className="action-buttons">
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
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchIncidence;