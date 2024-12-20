/**
 * @file Login.js
 * @author
 * Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 * @description Componente para gestionar el inicio de sesión de los usuarios, utilizando Firebase Authentication para autenticar credenciales. Este componente maneja la autenticación basada en nombres de usuario simulados.
 * @version 1.0.0
 */

import React, { useState } from "react"; // Importación de React y su manejo de estados
import { signInWithEmailAndPassword } from "firebase/auth"; // Función para iniciar sesión con Firebase
import { auth } from "../firebase"; // Configuración de Firebase
import "../styles/LoginUsers.css"; // Estilos específicos para el formulario de login

const Login = ({ onLogin }) => {
    // ======== ESTADOS ======== //
    const [username, setUsername] = useState(""); // Estado para almacenar el nombre de usuario
    const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
    const [error, setError] = useState(""); // Estado para manejar errores de autenticación

    // ======== MANEJADORES ======== //

    /**
     * Maneja el envío del formulario de inicio de sesión.
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        setError(""); // Resetea el mensaje de error

        const email = `${username}@fake.com`; // Convierte el nombre de usuario en un email simulado

        // Intenta autenticar al usuario con Firebase Authentication
        signInWithEmailAndPassword(auth, email, password)
            .then(() => onLogin()) // Llama al callback de autenticación exitosa
            .catch((err) => setError(err.message || "Credenciales incorrectas.")); // Maneja errores
    };

    // ======== RENDERIZADO ======== //
    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
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
                {/* Muestra mensaje de error si existe */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {/* Botón para enviar el formulario */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login; // Exporta el componente de login
