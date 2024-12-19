import React, { useState } from "react";



    const FetchPetitions = () => {
    //Estados para manejar los inputs del formulario
    const [personal, setPersonal] = useState("");
    const [fecha, setFecha] = useState("");
    const [herramienta, setHerramienta] = useState("");
    const [estado, setEstado] = useState("");

    //Maneja el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/peticiones/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nombre: "osvaldo"}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al enviar la petición");
                }
                return response.json()
            })
            .then((data) => {
                console.log("Peticion enviada: ", data);
            setPersonal("");
              setFecha("");
                setHerramienta("");
                setEstado("");        //Limpiar el formulario
          
            })
            .catch((error) => {
                console.error("Error al enviar la petición: ", error);
            });
    }

    //Crear un objeto con los datos del formulario
    const newPetition = {
        personal,
        fecha,
        herramienta,
        estado,
    };

    //Enviar la peticion al backend
   

    return (
        <div>
            <form className="peticion-form" onSubmit={handleSubmit}>
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
                    <input
                        type="text"
                        value={herramienta}
                        onChange={(e) => setHerramienta(e.target.value)}
                        required />
                </label>
                <label>
                    Estado:
                    <input
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required />
                </label>
                <button type="submit">Enviar Petición</button>
            </form>
        </div>
    );
}
export default FetchPetitions;