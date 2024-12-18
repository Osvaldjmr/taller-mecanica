// FetchIncidents.js
import React, { useEffect, useState } from 'react';

const FetchIncidents = () => {
  const [incidents, setIncidents] = useState([]); // Estado para almacenar las incidencias
  const [loading, setLoading] = useState(true); // Estado para indicar si estamos cargando los datos
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener las incidencias de la API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('http://localhost:3001/incidencias');
        if (!response.ok) {
          throw new Error('No se pudieron cargar las incidencias');
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

  if (loading) return <p>Cargando incidencias...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="incidents-list">
      <h3>Lista de Incidencias</h3>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>{incident.title}</strong>
            <p>{incident.description}</p>
            <p><em>{incident.status}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchIncidents;
