// Login.js
// Importaciones necesarias
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Función para autenticarse con Firebase
import { auth } from "../firebase"; // Configuración de Firebase
import "../styles/LoginUsers.css";

function Login({ onLogin }) {
    // Estado para almacenar el nombre de usuario ingresado
    const [username, setUsername] = useState("");
    // Estado para almacenar la contraseña ingresada
    const [password, setPassword] = useState("");
    // Estado para manejar mensajes de error
    const [error, setError] = useState("");

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene que la página se recargue
        setError(""); // Limpia cualquier error previo

        const fakeEmail = `${username}@fake.com`; // Convierte el nombre de usuario en un email falso

        // Llama a Firebase Authentication para iniciar sesión
        signInWithEmailAndPassword(auth, fakeEmail, password)
            .then(() => onLogin()) // Llama a onLogin si la autenticación es exitosa
            .catch(() => setError("Credenciales incorrectas. Inténtalo de nuevo."));
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {/* Campo de nombre de usuario */}
                <label>Nombre de usuario</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Actualiza el estado al escribir
                    required
                />
                {/* Campo de contraseña */}
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al escribir
                    required
                />
                {/* Muestra errores si existen */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {/* Botón de envío */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login; // Exporta el componente de Login
