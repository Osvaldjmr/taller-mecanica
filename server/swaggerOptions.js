/**
 * @file swaggerOptions.js
 * @description Configuración básica para la documentación Swagger.
 * @version 1.0.0
 * @author
 * Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 */

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0", // Versión del estándar OpenAPI
        info: {
            title: "Gestión de Incidencias y Materiales", // Título de la API
            version: "1.0.0", // Versión de la API
            description: "API para gestionar incidencias, herramientas y peticiones en un taller mecánico.", // Descripción
            contact: {
                name: "Soporte Técnico",
                email: "soporte@ejemplo.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3001", // URL base del servidor
                description: "Servidor de desarrollo",
            },
        ],
    },
    apis: ["./index.js"], // Archivos donde están las anotaciones de Swagger
};

module.exports = swaggerOptions;
