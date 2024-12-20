/**
 * @file FetchPetitions.js
 * @author
 * Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 * @description Componente para listar peticiones, permitiendo aprobar o denegar su estado. Consume una API para obtener las peticiones almacenadas.
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react'; // Manejo de estados y efectos en React
import '../styles/FetchPetitions.css'; // Estilos específicos del componente

const FetchPetitions = () => {
    // ======== ESTADOS ======== //
    const [petitions, setPetitions] = useState([]); // Lista de peticiones
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [error, setError] = useState(null); // Manejador de errores

    // ======== FUNCIONES ======== //

    // Función para obtener las peticiones desde la API
    useEffect(() => {
        const fetchPetitions = async () => {
            try {
                const response = await fetch('http://localhost:3001/peticiones'); // Endpoint para obtener las peticiones
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las peticiones'); // Error en caso de respuesta no OK
                }
                const data = await response.json();
                setPetitions(data); // Guardamos las peticiones en el estado
            } catch (error) {
                setError(error.message); // Guardamos el mensaje de error
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchPetitions(); // Llamamos a la función cuando el componente se monte
    }, []); // Dependencia vacía: solo se ejecuta al montar el componente

    // Función para actualizar el estado de una petición (Aprobada o Denegada)
    const handleUpdatePetition = async (id, newState) => {
        try {
            const response = await fetch(`http://localhost:3001/peticiones/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estado: newState }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar la petición");
            }

            // Actualizamos el estado local con los cambios
            setPetitions((prevPetitions) =>
                prevPetitions.map((petition) =>
                    petition._id === id ? { ...petition, estado: newState } : petition
                )
            );
        } catch (error) {
            console.error("Error al actualizar la petición:", error);
        }
    };

    // ======== RENDERIZADO ======== //

    // Mostrar mensaje de carga
    if (loading) return <p className="loading">Cargando peticiones...</p>;

    // Mostrar mensaje de error
    if (error) return <p className="error">Error: {error}</p>;

    // Renderizar las peticiones
    return (
        <div className="petitions-container">
            <h3>Lista de Peticiones</h3>
            <ul className="petitions-list">
                {petitions.map((petition) => (
                    <li key={petition._id} className="petition-item">
                        <p><strong>Personal:</strong> {petition.personal}</p>
                        <p><strong>Fecha:</strong> {petition.fecha}</p>
                        <p><strong>Herramienta:</strong> {petition.herramienta}</p>
                        <p><strong>Estado:</strong> {petition.estado}</p>
                        {petition.estado === "Abierta" && (
                            <div className="action-buttons">
                                <button
                                    className="approve-button"
                                    onClick={() => handleUpdatePetition(petition._id, "Aprobada")}
                                >
                                    Aprobar
                                </button>
                                <button
                                    className="deny-button"
                                    onClick={() => handleUpdatePetition(petition._id, "Denegada")}
                                >
                                    Denegar
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default FetchPetitions;
