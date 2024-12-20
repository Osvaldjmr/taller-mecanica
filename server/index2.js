// const express = require("express");
// const cors = require("cors");
// const { ObjectId } = require('mongodb');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const swaggerOptions = require('./swaggerOptions');
// let db;

// const app = express();


// const specs = swaggerJsDoc(swaggerOptions);

// // Middleware
// app.use(cors()); // Permitir solicitudes desde el frontend
// app.use(express.urlencoded({ extended: true })); // Parseo de datos enviados desde formularios
// app.use(express.json()); // Parseo de JSON enviado desde el frontend
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); //B: Swagger Docs

// const {
//   crearBaseDeDatos,
//   crearColeccion,
//   insertarDocumento,
//   verTodos,
//   querySimple,
// } = require("./mongoOperations"); // Importamos las operaciones de MongoDB

// // Ruta principal (comprobación del servidor)
// app.get("/", (req, res) => {
//   res.send("Servidor conectado correctamente.");
// });

// /**
//  * @swagger
//  * /:
//  *   get:
//  *     summary: Ruta principal 
//  *     description: Comprobación del servidor
//  *     responses:
//  *       200:
//  *         description: Servidor encontrado con éxito
//  *       500:
//  *         description: Error del servidor
//  */


// //
// // ======== INCIDENCIAS ========
// //

// app.get("/incidencias", async (req, res) => {
//   try {
//     const incidencias = await verTodos("incidencias"); // Consulta todas las incidencias
//     res.json(incidencias); // Retorna las incidencias en formato JSON
//   } catch (err) {
//     console.error("Error al obtener incidencias:", err);
//     res.status(500).send("Error al obtener incidencias.");
//   }
// });

// /**
//  * @swagger
//  * /incidencias:
//  *   get:
//  *     summary: Recibe todas las incidencias de la DB
//  *     description: Recibe todas las incidencias de la DB.
//  *     responses:
//  *       200:
//  *         description: Incidencias mostradas con éxito
//  *       404:
//  *         description: Incidencias no encontradas
//  *       500:
//  *         description: Error del servidor
//  */


// // Endpoint para obtener una incidencia específica por ID
// /* app.get("/incidencias/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const objectId = new ObjectId(id); // Convertimos el ID a ObjectId de MongoDB
//     const incidencia = await querySimple("incidencias", { _id: objectId }); // Buscamos por ID
//     if (!incidencia.length) {
//       return res.status(404).send("Incidencia no encontrada."); // Si no existe
//     }
//     res.json(incidencia[0]); // Retornamos la incidencia encontrada
//   } catch (err) {
//     console.error("Error al buscar la incidencia:", err);
//     res.status(500).send("Error al buscar la incidencia.");
//   }
// });
//  */
// /**
//  * @swagger
//  * /incidencias/:id:
//  *   get:
//  *     summary: Recibe la incidencia que coincida con un id concreto
//  *     description: Recibe la incidencia que coincida con un id concreto.
//  *     responses:
//  *       200:
//  *         description: Incidencia mostradas con éxito
//  *       404:
//  *         description: Incidencia no encontrada
//  *       500:
//  *         description: Error del servidor
//  */

// // Endpoint para insertar una nueva incidencia
// app.post("/incidencias/new", async (req, res) => {
//   const { personal, fecha, herramienta, descripcion, estado } = req.body;
//   try {
//     const nuevaIncidencia = { personal, fecha, herramienta, descripcion, estado: estado || "Abierta" }; // Campos básicos
//     const result = await insertarDocumento("incidencias", nuevaIncidencia);
//     res.status(201).json({ message: "Incidencia creada con éxito", data: result });
//   } catch (err) {
//     console.error("Error al insertar incidencia:", err);
//     res.status(500).send("Error al insertar incidencia.");
//   }
// });



// app.patch("/incidencias/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const objectId = new ObjectId(id); // Convierte a ObjectId
//         const result = await db.collection("incidencias").updateOne(
//             { _id: objectId },
//             { $set: { estado: req.body.estado } }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ message: "Incidencia no encontrada" });
//         }

//         res.json({ message: "Incidencia actualizada con éxito" });
//     } catch (error) {
//         console.error("Error al actualizar incidencia:", error);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// });



// /**
//  * @swagger
//  * /incidencias/new:
//  *   post:
//  *     summary: Inserta una nueva incidencia
//  *     description: Inserta una nueva incidencia en la DB
//  *     responses:
//  *       200:
//  *         description: Incidencia insertada con éxito
//  *       500:
//  *         description: Error del servidor
//  */

// //
// // ======== HERRAMIENTAS ========
// //



// // Endpoint para obtener todas las herramientas o buscar herramientas por nombre
// app.get("/herramientas", async (req, res) => {
//   try {
//     const { search } = req.query; // Parámetro de búsqueda opcional
//     const query = search ? { nombre: new RegExp(search, "i") } : {}; // Filtramos por nombre si `search` existe
//     const herramientas = await verTodos("herramientas", query); // Obtenemos herramientas
//     res.json(herramientas);
//   } catch (err) {
//     console.error("Error al obtener herramientas:", err);
//     res.status(500).send("Error al obtener herramientas.");
//   }
// });
// /**
//  * @swagger
//  * /herramientas:
//  *   get:
//  *     summary: Recibe todas las herramientas de la DB
//  *     description: Recibe todas las herramientas de la DB.
//  *     responses:
//  *       200:
//  *         description: Herramientas mostradas con éxito
//  *       500:
//  *         description: Error del servidor
//  */

// // Endpoint para insertar una nueva herramienta
// app.post("/herramientas/new", async (req, res) => {
//   const { nombre, tipo, marca, cantidad, descripcion, foto } = req.body;
//   try {
//     const nuevaIncidencia = { nombre, tipo, marca, cantidad, descripcion, foto }; // Campos básicos
//     const result = await insertarDocumento("herramientas", nuevaIncidencia);
//     res.status(201).json({ message: "Herramienta insertada con éxito", data: result });
//   } catch (err) {
//     console.error("Error al insertar herramienta:", err);
//     res.status(500).send("Error al insertar herramienta.");
//   }
// });

// /**
//  * @swagger
//  * /herramientas/new:
//  *   post:
//  *     summary: Inserta una nueva herramienta
//  *     description: Inserta una nueva herramienta.
//  *     responses:
//  *       200:
//  *         description: Herramienta insertada con éxito
//  *       500:
//  *         description: Error del servidor
//  */

// // Endpoint para mostrar todas las herramientas de la DB
// app.post("/herramientas", async (req, res) => {
//   try {
//     const nuevaHerramienta = req.body; // Asumimos que los datos vienen en el body
//     const result = await insertarDocumento("herramientas", nuevaHerramienta);
//     res.status(201).json({ message: "Herramienta agregada con éxito", data: result });
//   } catch (err) {
//     console.error("Error al agregar herramienta:", err);
//     res.status(500).send("Error al agregar herramienta.");
//   }
// });

// /**
//  * @swagger
//  * /herramientas:
//  *   get:
//  *     summary: Muestra todas las herramientas de la DB
//  *     description: Muestra todas las herramientas de la DB.
//  *     responses:
//  *       200:
//  *         description: Herramientas mostradas con éxito
//  *       500:
//  *         description: Error del servidor
//  */

// //
// // ======== PETICIONES ========
// //

// app.get("/peticiones", async (req, res) => {
//   try {
//     const peticiones = await verTodos("peticiones"); // Obtenemos todas las peticiones
//     res.json(peticiones);
//   } catch (err) {
//     console.error("Error al obtener peticiones:", err);
//     res.status(500).send("Error al obtener peticiones.");
//   }
// });

// /**
//  * @swagger
//  * /peticiones:
//  *   get:
//  *     summary: Muestra todas las peticiones de la DB
//  *     description: Muestra todas las peticiones de la DB.
//  *     responses:
//  *       200:
//  *         description: Peticiones mostradas con éxito
//  *       500:
//  *         description: Error del servidor
//  */

// // Endpoint para agregar una nueva petición
// app.post("/peticiones/new", async (req, res) => {
//   const { personal, fecha, herramienta, status } = req.body;
//   try {
//     const nuevaIncidencia = { personal, fecha, herramienta, status: status || "Abierta" }; // Campos básicos
//     const result = await insertarDocumento("peticiones", nuevaIncidencia);
//     res.status(201).json({ message: "Petición creada con éxito", data: result });
//   } catch (err) {
//     console.error("Error al insertar petición:", err);
//     res.status(500).send("Error al insertar petición.");
//   }
// });

// /**
//  * @swagger
//  * /peticiones/new:
//  *   post:
//  *     summary: Inserta una nueva petición
//  *     description: Inserta una nueva petición.
//  *     responses:
//  *       200:
//  *         description: Petición insertada con éxito
//  *       500:
//  *         description: Error del servidor
//  */

// //
// // ======== CONFIGURACIÓN DEL SERVIDOR ========
// //
// // Puerto del servidor
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });


// // ===== IMPORTACIÓN DE DEPENDENCIAS ===== //
// // Express para manejar las rutas y las solicitudes HTTP
// const express = require("express");
// // CORS para permitir solicitudes desde cualquier origen
// const cors = require("cors");
// // ObjectId para manejar los identificadores de MongoDB
// const { ObjectId } = require("mongodb");
// // Operaciones personalizadas de MongoDB
// const {
//   crearBaseDeDatos,
//   crearColeccion,
//   insertarDocumento,
//   verTodos,
//   querySimple,
//   actualizarDocumento,
// } = require("./mongoOperations");

// // ===== CONFIGURACIÓN DEL SERVIDOR ===== //
// const app = express();
// const PORT = 3001; // Puerto en el que correrá el servidor

// // ===== MIDDLEWARE ===== //
// // CORS: Permite que el frontend interactúe con el backend sin restricciones de origen
// app.use(cors());
// // Express JSON: Permite manejar datos en formato JSON
// app.use(express.json());
// // Express URL Encoded: Permite manejar datos enviados desde formularios
// app.use(express.urlencoded({ extended: true }));

// // ===== RUTAS ===== //

// // ===== Ruta principal ===== //
// // Comprobación del servidor
// app.get("/", (req, res) => {
//   res.send("Servidor conectado correctamente.");
// });

// /**
//  * Ruta: GET /incidencias
//  * Descripción: Obtiene todas las incidencias almacenadas en la base de datos
//  * Respuesta:
//  *   - 200: Lista de incidencias
//  *   - 500: Error al obtener incidencias
//  */
// app.get("/incidencias", async (req, res) => {
//   try {
//     // Llama a la función personalizada para obtener todas las incidencias
//     const incidencias = await verTodos("incidencias");
//     res.json(incidencias); // Devuelve las incidencias en formato JSON
//   } catch (err) {
//     console.error("Error al obtener incidencias:", err);
//     res.status(500).send("Error al obtener incidencias.");
//   }
// });

// /**
//  * Ruta: POST /incidencias/new
//  * Descripción: Inserta una nueva incidencia en la base de datos
//  * Body: { personal, fecha, herramienta, descripcion, estado }
//  * Respuesta:
//  *   - 201: Incidencia creada con éxito
//  *   - 500: Error al insertar incidencia
//  */
// app.post("/incidencias/new", async (req, res) => {
//   try {
//     // Inserta un nuevo documento en la colección 'incidencias'
//     await insertarDocumento("incidencias", req.body);
//     res.status(201).json({ message: "Incidencia creada con éxito." });
//   } catch (err) {
//     console.error("Error al insertar incidencia:", err);
//     res.status(500).send("Error al insertar incidencia.");
//   }
// });

// /**
//  * Ruta: PATCH /incidencias/:id
//  * Descripción: Actualiza el estado de una incidencia por su ID
//  * Params: id (ID de la incidencia)
//  * Body: { estado }
//  * Respuesta:
//  *   - 200: Incidencia actualizada con éxito
//  *   - 400: ID no válido
//  *   - 404: Incidencia no encontrada o no modificada
//  *   - 500: Error al actualizar incidencia
//  */
// app.patch("/incidencias/:id", async (req, res) => {
//   const { id } = req.params; // Obtiene el ID de los parámetros de la URL

//   // Verifica si el ID es válido
//   if (!ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "ID no válido." });
//   }

//   const objectId = new ObjectId(id); // Convierte el ID en un ObjectId
//   const { estado } = req.body; // Obtiene el nuevo estado del cuerpo de la solicitud

//   try {
//     // Actualiza el estado de la incidencia en la base de datos
//     const result = await actualizarDocumento(
//       "incidencias",
//       { _id: objectId },
//       { estado }
//     );

//     // Si no se modificó ningún documento, retorna un 404
//     if (!result.modifiedCount) {
//       return res.status(404).json({ message: "Incidencia no encontrada o no modificada." });
//     }

//     res.json({ message: "Incidencia actualizada con éxito." }); // Respuesta exitosa
//   } catch (err) {
//     console.error("Error al actualizar incidencia:", err);
//     res.status(500).send("Error al actualizar incidencia.");
//   }
// });

// // ===== INICIO DEL SERVIDOR ===== //
// // Inicia el servidor en el puerto definido
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });
