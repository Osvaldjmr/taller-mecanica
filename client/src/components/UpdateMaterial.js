import React, { useState, useEffect } from "react";

const UpdateMaterial = () => {
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

    // Cargar materiales disponibles
    useEffect(() => {
        fetch("http://localhost:3001/herramientas")
            .then((response) => response.json())
            .then((data) => setMateriales(data))
            .catch((err) => console.error("Error al cargar materiales:", err));
    }, []);

    // Maneja el cambio en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Maneja la selección del material
    const handleSelectMaterial = (id) => {
        const material = materiales.find((mat) => mat._id === id);
        setSelectedMaterial(material);
        setFormData(material); // Carga los datos actuales en el formulario
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/herramientas/${selectedMaterial._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al actualizar el material");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Material actualizado:", data);
                setSelectedMaterial(null);
            })
            .catch((err) => console.error("Error:", err));
    };

    return (
        <div>
            <h2>Actualizar Material</h2>
            <select onChange={(e) => handleSelectMaterial(e.target.value)}>
                <option value="">Selecciona un material</option>
                {materiales.map((material) => (
                    <option key={material._id} value={material._id}>
                        {material.nombre}
                    </option>
                ))}
            </select>
            {selectedMaterial && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Tipo:
                        <input
                            type="text"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Marca:
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cantidad:
                        <input
                            type="number"
                            name="cantidad"
                            value={formData.cantidad}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Descripción:
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
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
                    <button type="submit">Actualizar</button>
                </form>
            )}
        </div>
    );
};

export default UpdateMaterial;