/**
 * @file UpdateMaterial.js
 * @author
 * Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 * @description Componente para actualizar los datos de un material almacenado en la base de datos. Permite seleccionar un material existente y modificar sus propiedades.
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";

const UpdateMaterial = () => {
    // ======== ESTADOS ======== //
    const [materiales, setMateriales] = useState([]); // Lista de materiales disponibles
    const [selectedMaterial, setSelectedMaterial] = useState(null); // Material seleccionado para editar
    const [formData, setFormData] = useState({
        nombre: "",
        tipo: "",
        marca: "",
        cantidad: "",
        descripcion: "",
        foto: "",
    });

    // ======== EFECTOS ======== //
    useEffect(() => {
        // Fetch para cargar la lista de materiales disponibles
        fetch("http://localhost:3001/herramientas")
            .then((response) => response.json())
            .then((data) => setMateriales(data)) // Guarda los materiales en el estado
            .catch((err) => console.error("Error al cargar materiales:", err));
    }, []);

    // ======== MANEJADORES ======== //

    /**
     * Maneja los cambios en los inputs del formulario.
     * @param {Event} e - Evento del formulario.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Maneja la selección de un material del desplegable.
     * @param {string} id - ID del material seleccionado.
     */
    const handleSelectMaterial = (id) => {
        const material = materiales.find((mat) => mat._id === id); // Busca el material por ID
        setSelectedMaterial(material); // Define el material seleccionado
        setFormData(material); // Rellena el formulario con los datos del material
    };

    /**
     * Maneja el envío del formulario.
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        fetch(`http://localhost:3001/herramientas/${selectedMaterial._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Envía los datos actualizados al backend
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al actualizar el material");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Material actualizado:", data);
                setSelectedMaterial(null); // Limpia el material seleccionado
            })
            .catch((err) => console.error("Error:", err));
    };

    // ======== RENDERIZADO ======== //
    return (
        <div className="update-material-container">
            <h2>Actualizar Material</h2>
            {/* Desplegable para seleccionar un material */}
            <select
                onChange={(e) => handleSelectMaterial(e.target.value)}
                className="material-select"
            >
                <option value="">Selecciona un material</option>
                {materiales.map((material) => (
                    <option key={material._id} value={material._id}>
                        {material.nombre}
                    </option>
                ))}
            </select>

            {/* Formulario para editar un material */}
            {selectedMaterial && (
                <form className="update-material-form" onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Tipo:
                        <input
                            type="text"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Marca:
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Cantidad:
                        <input
                            type="number"
                            name="cantidad"
                            value={formData.cantidad}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Descripción:
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Foto (URL):
                        <input
                            type="text"
                            name="foto"
                            value={formData.foto}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" className="update-button">
                        Actualizar
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateMaterial; // Exporta el componente
