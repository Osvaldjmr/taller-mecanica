/**
 * @file HideMaterial.js
 * @author 
 * Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 * @description Componente para gestionar la visibilidad de materiales, permitiendo al usuario alternar entre "mostrar" y "ocultar".
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react"; // Manejo de estados y efectos en React
import "../styles/HideMaterial.css"; // Estilos específicos del componente

const HideMaterial = () => {
    // ======== ESTADOS ======== //
    const [materials, setMaterials] = useState([]); // Lista de materiales
    const [error, setError] = useState(null); // Manejador de errores

    // ======== FUNCIONES ======== //

    // Fetch inicial para cargar materiales desde la API
    useEffect(() => {
        fetch("http://localhost:3001/herramientas") // Endpoint para obtener los materiales
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar los materiales"); // Error en caso de respuesta no OK
                }
                return response.json(); // Convertimos la respuesta a JSON
            })
            .then((data) => {
                setMaterials(data); // Guardamos los materiales en el estado
            })
            .catch((err) => {
                console.error("Error al cargar materiales:", err);
                setError("No se pudieron cargar los materiales."); // Mostramos el mensaje de error
            });
    }, []); // Dependencia vacía: solo se ejecuta al montar el componente

    // Función para alternar la visibilidad de un material
    const handleToggleVisibility = async (id, currentVisibility) => {
        try {
            const response = await fetch(`http://localhost:3001/herramientas/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ visible: !currentVisibility }), // Cambia el campo `visible` en el backend
            });

            if (!response.ok) {
                throw new Error("Error al cambiar la visibilidad del material"); // Error en caso de respuesta no OK
            }

            // Actualizamos el estado local con la nueva visibilidad
            setMaterials((prevMaterials) =>
                prevMaterials.map((material) =>
                    material._id === id ? { ...material, visible: !currentVisibility } : material
                )
            );
        } catch (err) {
            console.error("Error al cambiar visibilidad del material:", err);
            setError("No se pudo cambiar la visibilidad del material."); // Mostramos el mensaje de error
        }
    };

    // ======== RENDERIZADO ======== //

    return (
        <div className="hide-material-container">
            <h2>Gestión de Visibilidad de Materiales</h2>
            {/* Muestra el mensaje de error si existe */}
            {error && <p className="error-message">{error}</p>}
            <ul className="material-list">
                {/* Renderiza la lista de materiales */}
                {materials.map((material) => (
                    <li key={material._id} className="material-item">
                        <p><strong>Nombre:</strong> {material.nombre}</p>
                        <p><strong>Tipo:</strong> {material.tipo}</p>
                        <p><strong>Marca:</strong> {material.marca}</p>
                        <p><strong>Visible:</strong> {material.visible ? "Sí" : "No"}</p>
                        {/* Botón para alternar la visibilidad */}
                        <button
                            className={`toggle-button ${material.visible ? "hide" : "show"}`}
                            onClick={() => handleToggleVisibility(material._id, material.visible)}
                        >
                            {material.visible ? "Ocultar" : "Mostrar"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default HideMaterial;
