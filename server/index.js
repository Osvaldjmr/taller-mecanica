const express = require("express");
const cors = require("cors");
const { ObjectId } = require('mongodb');

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

// Ruta principal (comprobación del servidor)
app.get("/", (req, res) => {
  res.send("Servidor conectado correctamente.");
});

//
// ======== INCIDENCIAS ========
//

// B Esto permite mostrar todas las incidencias de la DB // codigo de borja
/* app.get('/incidencias', async (req, res) => {
  let todos = await verTodos("incidencias");
  res.json(todos);
}); */



app.get("/incidencias", async (req, res) => {
  try {
    const incidencias = await verTodos("incidencias"); // Consulta todas las incidencias
    res.json(incidencias); // Retorna las incidencias en formato JSON
  } catch (err) {
    console.error("Error al obtener incidencias:", err);
    res.status(500).send("Error al obtener incidencias.");
  }
});

// B: Esto permite buscar la incidencia que coincida con el ID que pongo en la url//codigo de borja
/* app.get('/incidencias/:id', async (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);

  const todos = await querySimple("incidencias", { _id: objectId });
  res.json(todos);
}); */


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

// Endpoint para insertar una nueva incidencia
app.post("/incidencias", async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const nuevaIncidencia = { title, description, status: status || "Abierta" }; // Campos básicos
    const result = await insertarDocumento("incidencias", nuevaIncidencia);
    res.status(201).json({ message: "Incidencia creada con éxito", data: result });
  } catch (err) {
    console.error("Error al insertar incidencia:", err);
    res.status(500).send("Error al insertar incidencia.");
  }
});

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

// Endpoint para insertar nuevas herramientas//codigo de borja
/* app.post("/herramientas", async (req, res) => {
  const newTool = req.body;
  try {
    const result = await insertarDocumento("herramientas", newTool);
    res.status(201).json({ message: "Herramienta agregada con éxito", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al agregar la herramienta");
  }
}); */



// Endpoint para agregar una nueva herramienta
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

//
// ======== PETICIONES ========
//

// B Esto permite mostrar todas las peticiones de la DB//codigo antiguo
/* app.get('/peticiones', async (req, res) => {
  let todos = await verTodos("peticiones");
  res.json(todos);
}); */

app.get("/peticiones", async (req, res) => {
  try {
    const peticiones = await verTodos("peticiones"); // Obtenemos todas las peticiones
    res.json(peticiones);
  } catch (err) {
    console.error("Error al obtener peticiones:", err);
    res.status(500).send("Error al obtener peticiones.");
  }
});

// Endpoint para agregar una nueva petición
app.post("/peticiones", async (req, res) => {
  const { nombre, cantidad, motivo } = req.body;
  try {
    const nuevaPeticion = { nombre, cantidad, motivo, estado: "Pendiente" }; // Campos básicos
    const result = await insertarDocumento("peticiones", nuevaPeticion);
    res.status(201).json({ message: "Petición creada con éxito", data: result });
  } catch (err) {
    console.error("Error al agregar petición:", err);
    res.status(500).send("Error al agregar petición.");
  }
});

//
// ======== CONFIGURACIÓN DEL SERVIDOR ========
//
// Puerto del servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});









