//Autores Borja, Ana Maria, Natali, Osvaldo 
// Fecha 17/12/2024
//Deescripcion Implementación del login para mecanico/encargado
// Versión de la app 1.0.0


import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Importar Firebase Auth
import "./Login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Manejar el login
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Reiniciar errores

        // Firebase Authentication: login con correo y contraseña
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                onLogin(); // Actualiza el estado para mostrar el Dashboard
            })
            .catch((err) => {
                setError("Error de autenticación. Verifica tus credenciales.");
            });
    };

    return (
        <div className="login-container">
            <h1>Stock de herramientas</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
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
