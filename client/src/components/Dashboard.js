// Dashboard.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Importa servicios de Firebase
import { doc, getDoc } from "firebase/firestore"; // Funciones de Firestore
import { signOut } from "firebase/auth"; // Función para cerrar sesión
import "../styles/Dashboard.css"; // Importa estilos específicos

function Dashboard() {
    const [role, setRole] = useState(""); // Estado para almacenar el rol del usuario

    // Obtiene el rol del usuario autenticado desde Firestore
    useEffect(() => {
        const fetchRole = async () => {
            const user = auth.currentUser; // Obtiene el usuario actual
            if (user) {
                const userRef = doc(db, "users", user.uid); // Referencia al documento del usuario
                const userSnap = await getDoc(userRef); // Obtiene los datos
                if (userSnap.exists()) {
                    setRole(userSnap.data().role); // Guarda el rol en el estado
                }
            }
        };
        fetchRole();
    }, []);

    // Maneja el cierre de sesión
    const handleLogout = () => {
        signOut(auth); // Cierra sesión en Firebase
        window.location.reload(); // Recarga la aplicación para volver al login
    };

    return (
        <div className="dashboard-container">
            <header>
                <h1>Área de {role}</h1>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </header>
            <p>Bienvenido al panel de herramientas.</p>
            {/* Aquí puedes agregar las tarjetas y botones */}
        </div>
    );
}

export default Dashboard;
