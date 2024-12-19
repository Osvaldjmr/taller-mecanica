const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentación",
      version: "1.0.0",
      description: "Documentación de la API con Swagger",
      contact: {
        name: "Borja",
      },
    },
    servers: [
      {
        url: "http://localhost:3001", // Cambia la URL si tu servidor está en otro puerto
      },
    ],
  },
  apis: ["./index.js"], // Archivos donde se encuentran los comentarios para Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;