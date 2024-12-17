// Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa la función de autenticación
import { auth } from "../firebase"; // Importa la configuración de Firebase
import "../styles/Login.css"; // Importa los estilos específicos

function Login({ onLogin }) {
    const [username, setUsername] = useState(""); // Estado para el nombre de usuario
    const [password, setPassword] = useState(""); // Estado para la contraseña
    const [error, setError] = useState(""); // Estado para mostrar errores

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setError(""); // Reinicia el estado de error

        const fakeEmail = `${username}@fake.com`; // Convierte el nombre de usuario en un email falso

        // Inicia sesión con Firebase Authentication
        signInWithEmailAndPassword(auth, fakeEmail, password)
            .then(() => onLogin()) // Si la autenticación es exitosa, cambia el estado de App
            .catch(() => setError("Credenciales incorrectas. Inténtalo de nuevo."));
    };

    return (
        <div className="login-container">
            <h1>Stock de herramientas</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre de usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
}

export default Login;
