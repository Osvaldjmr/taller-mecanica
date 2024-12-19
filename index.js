const express = require("express");
const cors = require("cors");
const { ObjectId } = require('mongodb');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerOptions"); // Asegúrate de tener el archivo swaggerOptions.js



const {
  crearBaseDeDatos,
  crearColeccion,
  insertarDocumento,
  verTodos,
  querySimple,
} = require("./mongoOperations"); // Importamos las operaciones de MongoDB

const app = express();


// Middleware
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.urlencoded({ extended: true })); // Parseo de datos enviados desde formularios
app.use(express.json()); // Parseo de JSON enviado desde el frontend
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //B: Swagger Docs

// Ruta principal (comprobación del servidor)
app.get("/", (req, res) => {
  res.send("Servidor conectado correctamente.");
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta principal 
 *     description: Comprobación del servidor
 *     responses:
 *       200:
 *         description: Servidor encontrado con éxito
 *       500:
 *         description: Error del servidor
 */

//
// ======== INCIDENCIAS ========
//

app.get("/incidencias", async (req, res) => {
  try {
    const incidencias = await verTodos("incidencias"); // Consulta todas las incidencias
    res.json(incidencias); // Retorna las incidencias en formato JSON
  } catch (err) {
    console.error("Error al obtener incidencias:", err);
    res.status(500).send("Error al obtener incidencias.");
  }
});

/**
 * @swagger
 * /incidencias:
 *   get:
 *     summary: Recibe todas las incidencias de la DB
 *     description: Recibe todas las incidencias de la DB.
 *     responses:
 *       200:
 *         description: Incidencias mostradas con éxito
 *       404:
 *         description: Incidencias no encontradas
 *       500:
 *         description: Error del servidor
 */


// Endpoint para obtener una incidencia específica por ID
app.get("/incidencias/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const objectId = new ObjectId(id); // Convertimos el ID a ObjectId de MongoDB
    const incidencia = await querySimple("incidencias", { _id: objectId }); // Buscamos por ID
    if (!incidencia.length) {
      return res.status(404).send("Incidencia no encontrada."); // Si no existe
    }
    res.json(incidencia[0]); // Retornamos la incidencia encontrada
  } catch (err) {
    console.error("Error al buscar la incidencia:", err);
    res.status(500).send("Error al buscar la incidencia.");
  }
});

/**
 * @swagger
 * /incidencias/:id:
 *   get:
 *     summary: Recibe la incidencia que coincida con un id concreto
 *     description: Recibe la incidencia que coincida con un id concreto.
 *     responses:
 *       200:
 *         description: Incidencia mostradas con éxito
 *       404:
 *         description: Incidencia no encontrada
 *       500:
 *         description: Error del servidor
 */

// Endpoint para insertar una nueva incidencia
app.post("/incidencias/new", async (req, res) => {
  const { personal, fecha, herramienta, descripcion, status } = req.body;
  try {
    const nuevaIncidencia = { personal, fecha, herramienta, descripcion, status: status || "Abierta" }; // Campos básicos
    const result = await insertarDocumento("incidencias", nuevaIncidencia);
    res.status(201).json({ message: "Incidencia creada con éxito", data: result });
  } catch (err) {
    console.error("Error al insertar incidencia:", err);
    res.status(500).send("Error al insertar incidencia.");
  }
});

/**
 * @swagger
 * /incidencias/new:
 *   post:
 *     summary: Inserta una nueva incidencia
 *     description: Inserta una nueva incidencia en la DB
 *     responses:
 *       200:
 *         description: Incidencia insertada con éxito
 *       500:
 *         description: Error del servidor
 */

//
// ======== HERRAMIENTAS ========
//



// Endpoint para obtener todas las herramientas o buscar herramientas por nombre
app.get("/herramientas", async (req, res) => {
  try {
    const { search } = req.query; // Parámetro de búsqueda opcional
    const query = search ? { nombre: new RegExp(search, "i") } : {}; // Filtramos por nombre si `search` existe
    const herramientas = await verTodos("herramientas", query); // Obtenemos herramientas
    res.json(herramientas);
  } catch (err) {
    console.error("Error al obtener herramientas:", err);
    res.status(500).send("Error al obtener herramientas.");
  }
});
/**
 * @swagger
 * /herramientas:
 *   get:
 *     summary: Recibe todas las herramientas de la DB
 *     description: Recibe todas las herramientas de la DB.
 *     responses:
 *       200:
 *         description: Herramientas mostradas con éxito
 *       500:
 *         description: Error del servidor
 */

// Endpoint para insertar una nueva herramienta
app.post("/herramientas/new", async (req, res) => {
  const { nombre, tipo, marca, cantidad, descripcion, foto } = req.body;
  try {
    const nuevaIncidencia = { nombre, tipo, marca, cantidad, descripcion, foto }; // Campos básicos
    const result = await insertarDocumento("herramientas", nuevaIncidencia);
    res.status(201).json({ message: "Herramienta insertada con éxito", data: result });
  } catch (err) {
    console.error("Error al insertar herramienta:", err);
    res.status(500).send("Error al insertar herramienta.");
  }
});

/**
 * @swagger
 * /herramientas/new:
 *   post:
 *     summary: Inserta una nueva herramienta
 *     description: Inserta una nueva herramienta.
 *     responses:
 *       200:
 *         description: Herramienta insertada con éxito
 *       500:
 *         description: Error del servidor
 */

// Endpoint para mostrar todas las herramientas de la DB
app.post("/herramientas", async (req, res) => {
  try {
    const nuevaHerramienta = req.body; // Asumimos que los datos vienen en el body
    const result = await insertarDocumento("herramientas", nuevaHerramienta);
    res.status(201).json({ message: "Herramienta agregada con éxito", data: result });
  } catch (err) {
    console.error("Error al agregar herramienta:", err);
    res.status(500).send("Error al agregar herramienta.");
  }
});

/**
 * @swagger
 * /herramientas:
 *   get:
 *     summary: Muestra todas las herramientas de la DB
 *     description: Muestra todas las herramientas de la DB.
 *     responses:
 *       200:
 *         description: Herramientas mostradas con éxito
 *       500:
 *         description: Error del servidor
 */

//
// ======== PETICIONES ========
//

app.get("/peticiones", async (req, res) => {
  try {
    const peticiones = await verTodos("peticiones"); // Obtenemos todas las peticiones
    res.json(peticiones);
  } catch (err) {
    console.error("Error al obtener peticiones:", err);
    res.status(500).send("Error al obtener peticiones.");
  }
});

/**
 * @swagger
 * /peticiones:
 *   get:
 *     summary: Muestra todas las peticiones de la DB
 *     description: Muestra todas las peticiones de la DB.
 *     responses:
 *       200:
 *         description: Peticiones mostradas con éxito
 *       500:
 *         description: Error del servidor
 */

// Endpoint para agregar una nueva petición
app.post("/peticiones/new", async (req, res) => {
  const { personal, fecha, herramienta, status } = req.body;
  try {
    const nuevaIncidencia = { personal, fecha, herramienta, status: status || "Abierta" }; // Campos básicos
    const result = await insertarDocumento("peticiones", nuevaIncidencia);
    res.status(201).json({ message: "Petición creada con éxito", data: result });
  } catch (err) {
    console.error("Error al insertar petición:", err);
    res.status(500).send("Error al insertar petición.");
  }
});

/**
 * @swagger
 * /peticiones/new:
 *   post:
 *     summary: Inserta una nueva petición
 *     description: Inserta una nueva petición.
 *     responses:
 *       200:
 *         description: Petición insertada con éxito
 *       500:
 *         description: Error del servidor
 */

//
// ======== CONFIGURACIÓN DEL SERVIDOR ========
//
// Puerto del servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});









