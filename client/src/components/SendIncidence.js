import React, { useState, useEffect } from "react";

const SendIncidence = () => {
    //Estados para manejar los inputs del formulario
    const [personal, setPersonal] = useState("");
    const [fecha, setFecha] = useState("");
    const [herramienta, setHerramienta] = useState("");
    const [descripcion, setDescripcion] = useState("")
    const [herramientasDisponibles, setHerramientasDisponibles] = useState([]);



    //Crear un objeto con los datos del formulario
    const newIncidence = {
        personal,
        fecha,
        herramienta,
        descripcion,
    };



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
                setHerramientasDisponibles(data); // Asume que `data` es un array de objetos con los nombres de las herramientas
            })
            .catch((error) => {
                console.error("Error al cargar las herramientas: ", error);
            });
    }, []);

    //Maneja el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();


        // Usamos el objeto newPetition que ya tenemos definido
        fetch("http://localhost:3001/incidencias/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newIncidence)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al enviar la petición"); // Enviar todos los datos del formulario
                }
                return response.json()
            })
            .then((data) => {
                console.log("Incidencia enviada: ", data);
                setPersonal("");
                setFecha("");
                setHerramienta("");
                setDescripcion("")       //Limpiar el formulario

            })
            .catch((error) => {
                console.error("Error al enviar la incidencia: ", error);
            });
    }


    //Enviar la peticion al backend


    return (
        <div>
            <form className="incidence-form" onSubmit={handleSubmit}>
                <label>
                    Personal:
                    <input
                        type="text"
                        value={personal}
                        onChange={(e) => setPersonal(e.target.value)}
                        required />
                </label>
                <label>
                    Fecha:
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required />
                </label>
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
                <label>
                    Descripción:
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required />
                </label>


                <button type="submit">Enviar Incidencia</button>
            </form>
        </div>
    );
}
export default SendIncidence;