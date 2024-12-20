/**
 * @file index.js
 * @description Configuración del servidor backend utilizando Express para manejar incidencias, herramientas y peticiones.
 * @version 1.0.0
 * @author
 * Natalia, Anamaria, Borja, Osvaldo
 * @date 19/12/2024
 */

// ===== IMPORTACIÓN DE DEPENDENCIAS ===== //
const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swaggerOptions");

const {
    insertarDocumento,
    verTodos,
    actualizarDocumento,
} = require("./mongoOperations");

// ===== CONFIGURACIÓN DEL SERVIDOR ===== //
const app = express();
const PORT = 3001;

// Configuración de Swagger
const specs = swaggerJsDoc(swaggerOptions);

// ===== MIDDLEWARE ===== //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ===== RUTAS ===== //

/**
 * Verifica que el servidor esté activo.
 */
/* **
 * @swagger
 * /:
 *   get:
 *     summary: Verifica la conexión con el servidor.
 *     description: Ruta principal para comprobar que el servidor está activo.
 *     responses:
 *       200:
 *         description: Servidor conectado correctamente.
 */

app.get("/", (req, res) => {
    res.send("Servidor conectado correctamente.");
});

// ===== RUTAS DE INCIDENCIAS ===== //
/**
 * Obtiene todas las incidencias.
 */
/**
 * @swagger
 * /incidencias:
 *   get:
 *     summary: Obtiene todas las incidencias.
 *     description: Recupera todas las incidencias almacenadas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de incidencias.
 *       500:
 *         description: Error al obtener incidencias.
 */


app.get("/incidencias", async (req, res) => {
    try {
        const incidencias = await verTodos("incidencias");
        res.json(incidencias);
    } catch (err) {
        console.error("Error al obtener incidencias:", err);
        res.status(500).send("Error al obtener incidencias.");
    }
});

/**
 * Inserta una nueva incidencia.
 */

/**
 * @swagger
 * /incidencias/new:
 *   post:
 *     summary: Inserta una nueva incidencia.
 *     description: Agrega una nueva incidencia a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personal:
 *                 type: string
 *               fecha:
 *                 type: string
 *               herramienta:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Incidencia creada con éxito.
 *       500:
 *         description: Error al insertar incidencia.
 */


app.post("/incidencias/new", async (req, res) => {
    try {
        await insertarDocumento("incidencias", req.body);
        res.status(201).json({ message: "Incidencia creada con éxito." });
    } catch (err) {
        console.error("Error al insertar incidencia:", err);
        res.status(500).send("Error al insertar incidencia.");
    }
});

/**
 * Actualiza el estado de una incidencia.
 */
app.patch("/incidencias/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido." });
    }

    const objectId = new ObjectId(id);
    const { estado } = req.body;

    try {
        const result = await actualizarDocumento("incidencias", { _id: objectId }, { estado });

        if (!result.modifiedCount) {
            return res.status(404).json({ message: "Incidencia no encontrada o no modificada." });
        }

        res.json({ message: "Incidencia actualizada con éxito." });
    } catch (err) {
        console.error("Error al actualizar incidencia:", err);
        res.status(500).send("Error al actualizar incidencia.");
    }
});

// ===== RUTAS DE HERRAMIENTAS ===== //
/**
 * Inserta una nueva herramienta.
 */
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

app.post("/herramientas/new", async (req, res) => {
    try {
        await insertarDocumento("herramientas", req.body);
        res.status(201).json({ message: "Herramienta insertada con éxito." });
    } catch (err) {
        console.error("Error al insertar herramienta:", err);
        res.status(500).send("Error al insertar herramienta.");
    }
});

/**
 * Obtiene todas las herramientas.
 */
/**
 * @swagger
 * /herramientas:
 *   get:
 *     summary: Obtiene todas las herramientas.
 *     description: Recupera todas las herramientas almacenadas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de herramientas.
 *       500:
 *         description: Error al obtener herramientas.
 */


app.get("/herramientas", async (req, res) => {
    try {
        const herramientas = await verTodos("herramientas");
        res.json(herramientas);
    } catch (err) {
        console.error("Error al obtener herramientas:", err);
        res.status(500).send("Error al obtener herramientas.");
    }
});

/**
 * Actualiza una herramienta.
 */

/**
 * @swagger
 * /herramientas/{id}:
 *   patch:
 *     summary: Actualiza los datos de una herramienta.
 *     description: Modifica los campos de una herramienta existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la herramienta.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               marca:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               foto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Herramienta actualizada con éxito.
 *       400:
 *         description: ID no válido.
 *       404:
 *         description: Herramienta no encontrada o no modificada.
 *       500:
 *         description: Error al actualizar herramienta.
 */


app.patch("/herramientas/:id", async (req, res) => {
    const { id } = req.params;
    const { _id, ...updatedFields } = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido." });
    }

    try {
        const result = await actualizarDocumento("herramientas", { _id: new ObjectId(id) }, updatedFields);
        if (!result.modifiedCount) {
            return res.status(404).json({ message: "Herramienta no encontrada o no modificada." });
        }
        res.json({ message: "Herramienta actualizada con éxito." });
    } catch (err) {
        console.error("Error al actualizar herramienta:", err);
        res.status(500).send("Error al actualizar herramienta.");
    }
});


// ===== RUTAS DE PETICIONES ===== //
/**
 * Obtiene todas las peticiones.
 */
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
app.get("/peticiones", async (req, res) => {
    try {
        const peticiones = await verTodos("peticiones");
        res.json(peticiones);
    } catch (err) {
        console.error("Error al obtener peticiones:", err);
        res.status(500).send("Error al obtener peticiones.");
    }
});

/**
 * Inserta una nueva petición.
 */
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
app.post("/peticiones/new", async (req, res) => {
    try {
        const nuevaPeticion = {
            ...req.body,
            estado: req.body.estado || "Abierta",
        };

        await insertarDocumento("peticiones", nuevaPeticion);
        res.status(201).json({ message: "Petición creada con éxito." });
    } catch (err) {
        console.error("Error al insertar petición:", err);
        res.status(500).send("Error al insertar petición.");
    }
});

/**
 * Actualiza el estado de una petición.
 */
app.patch("/peticiones/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido." });
    }

    const objectId = new ObjectId(id);
    const { estado } = req.body;

    try {
        const result = await actualizarDocumento("peticiones", { _id: objectId }, { estado });

        if (!result.modifiedCount) {
            return res.status(404).json({ message: "Petición no encontrada o no modificada." });
        }

        res.json({ message: "Petición actualizada con éxito." });
    } catch (err) {
        console.error("Error al actualizar petición:", err);
        res.status(500).send("Error al actualizar petición.");
    }
});


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

// ===== INICIO DEL SERVIDOR ===== //
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
