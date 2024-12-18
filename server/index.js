const {
  crearBaseDeDatos,
  crearColeccion,
  insertarDocumento,
  verTodos,
} = require("./mongoOperations");
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors()); // Permitir solicitudes de otros orígenes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor conectado correctamente.");
});

// Endpoint para insertar datos de usuarios
app.post("/usuarios", async (req, res) => {
  try {
    await crearBaseDeDatos();
    await crearColeccion("Usuarios");
    await insertarDocumento("Usuarios", {
      nombre: req.body.first_name,
      apellido: req.body.last_name,
      email: req.body.email,
    });
    res.json({ message: "Usuario insertado con éxito", data: req.body });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al insertar usuario.");
  }
});

// Endpoint para obtener herramientas (todas o por búsqueda)
app.get("/herramientas", async (req, res) => {
  try {
    const { search } = req.query; // Captura el parámetro de búsqueda (opcional)
    const query = search ? { nombre: new RegExp(search, "i") } : {}; // Si `search` existe, aplica filtro
    const herramientas = await verTodos("herramientas", query); // Función para buscar en MongoDB
    res.json(herramientas);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener herramientas.");
  }
});

// Endpoint para insertar nuevas herramientas
app.post("/herramientas", async (req, res) => {
  const newTool = req.body;
  try {
    const result = await insertarDocumento("herramientas", newTool);
    res.status(201).json({ message: "Herramienta agregada con éxito", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al agregar la herramienta");
  }
});

// Puerto del servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
