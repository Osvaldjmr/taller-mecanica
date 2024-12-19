// FetchIncidents.js
import React, { useEffect, useState } from 'react';
import '../styles/FetchIncidents.css';

const FetchIncidents = () => {
    const [incidents, setIncidents] = useState([]); // Estado para almacenar las incidencias
    const [loading, setLoading] = useState(true); // Estado para indicar si estamos cargando los datos
    const [error, setError] = useState(null); // Estado para manejar errores

    // Función para obtener las incidencias de la API
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await fetch('http://localhost:3001/incidencias');  // Endpoint para incidencias
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las incidencias'); // Error en caso de respuesta no OK
                }
                const data = await response.json();
                setIncidents(data); // Guardamos los datos en el estado
            } catch (error) {
                setError(error.message); // Guardamos el mensaje de error
            } finally {
                setLoading(false); // Indicamos que la carga ha finalizado
            }
        };

        fetchIncidents(); // Llamamos a la función cuando el componente se monte
    }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

    if (loading) return <p className="loading">Cargando incidencias...</p>; // fue agregado className="loading"
    if (error) return <p className="error">Error: {error}</p>; // fue agregado className="error"

    return (
        <div className="incidents-container">
            <h3>Lista de Incidencias</h3>
            <ul className="incidents-list">
                {incidents.map((incident) => (
                    <li key={incident._id} className="incident-item">
                        <p><strong>Personal:</strong> {incident.personal}</p>
                        <p><strong>Fecha:</strong> {incident.fecha}</p>
                        <p><strong>Herramienta:</strong> {incident.herramienta}</p>
                        <p><strong>Descripción:</strong> {incident.descripcion}</p>
                        <p><strong>Estado:</strong> {incident.estado}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchIncidents;