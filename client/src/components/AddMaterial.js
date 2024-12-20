/**
 * @file AddMaterial.js
 * @author Natalia, Anamaria, Borja
 * @date 19/12/2024
 * @description Componente para agregar nuevos materiales al sistema mediante un formulario.
 * @version 1.0.0
 */

import React, { useState } from "react";
import "../styles/AddMaterial.css"; // Importamos los estilos CSS para el componente

const AddMaterial = () => {
    // ======== ESTADOS ======== //
    const [nombre, setNombre] = useState(""); // Estado para el nombre del material
    const [tipo, setTipo] = useState(""); // Estado para el tipo del material
    const [marca, setMarca] = useState(""); // Estado para la marca del material
    const [cantidad, setCantidad] = useState(0); // Estado para la cantidad
    const [descripcion, setDescripcion] = useState(""); // Estado para la descripción
    const [foto, setFoto] = useState(""); // Estado para la URL de la foto
    const [error, setError] = useState(null); // Estado para manejar errores
    const [success, setSuccess] = useState(false); // Estado para manejar éxito

    // Objeto que contiene los datos del nuevo material
    const newMaterial = {
        nombre,
        tipo,
        marca,
        cantidad: parseInt(cantidad, 10), // Convertimos cantidad a número
        descripcion,
        foto,
    };

    // ======== MANEJADORES ======== //

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Llamada al backend para crear un nuevo material
        fetch("http://localhost:3001/herramientas/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMaterial), // Enviamos los datos como JSON
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar el material");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Material agregado con éxito:", data);
                setSuccess(true); // Marca el éxito
                setError(null); // Limpia errores previos
                // Limpia los campos del formulario
                setNombre("");
                setTipo("");
                setMarca("");
                setCantidad(0);
                setDescripcion("");
                setFoto("");
            })
            .catch((error) => {
                console.error("Error al agregar material:", error);
                setError("No se pudo agregar el material. Inténtelo nuevamente.");
                setSuccess(false); // Indica que hubo un error
            });
    };

    // ======== RENDERIZADO ======== //
    return (
        <div className="add-material-container">
            <h2>Formulario de Alta de Material</h2>
            <form className="add-material-form" onSubmit={handleSubmit}>
                {/* Mensajes de error y éxito */}
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Material agregado con éxito</p>}

                {/* Campos del formulario */}
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Tipo:
                    <input
                        type="text"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Marca:
                    <input
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Cantidad:
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Descripción:
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Foto (URL):
                    <input
                        type="url"
                        value={foto}
                        onChange={(e) => setFoto(e.target.value)}
                    />
                </label>

                {/* Botón para enviar el formulario */}
                <button type="submit" className="submit-button">
                    Agregar Material
                </button>
            </form>
        </div>
    );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default AddMaterial;
