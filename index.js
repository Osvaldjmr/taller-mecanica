const { ObjectId } = require('mongodb');
const {
  crearBaseDeDatos,
  crearColeccion,
  insertarDocumento,
  obtenerPrimerElemento,
  verTodos,
  querySimple,
  sortPorCampo,
  borrarDocumento,
  actualizarDocumento,
} = require('./mongoOperations');
const express = require('express');
const app = express();

// Agregar middleware para analizar el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// B Esto permite mostrar todas las herramientas de la DB
app.get('/herramientas', async (req, res) => {
  let todos = await verTodos("herramientas");
  res.json(todos);
});

// B Esto permite mostrar todas las incidencias de la DB
app.get('/incidencias', async (req, res) => {
  let todos = await verTodos("incidencias");
  res.json(todos);
});

// B Esto permite mostrar todas las peticiones de la DB
app.get('/peticiones', async (req, res) => {
  let todos = await verTodos("peticiones");
  res.json(todos);
});

// B: Esto permite buscar la herramienta que coincida con el nombre que pongo en la url
app.get('/herramientas/:nombre', async (req, res) => {
  console.log(req.query);
  let todos = await querySimple("herramientas", {nombre: req.params.nombre});
  res.json(todos);
});

// B: Esto permite buscar la incidencia que coincida con el ID que pongo en la url
app.get('/incidencias/:id', async (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);

  const todos = await querySimple("incidencias", {_id: objectId});
  res.json(todos);
});

// B: Esto permite buscar la petición que coincida con el ID que pongo en la url
app.get('/peticiones/:id', async (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);

  const todos = await querySimple("peticiones", {_id: objectId});
  res.json(todos);
});


app.post('/', async (req, res) => {
  await crearBaseDeDatos();
  await crearColeccion("herramientas");
  await insertarDocumento('herramientas', { nombre: req.body.nombre, tipo: req.body.tipo, marca:req.body.marca, cantidad: req.body.cantidad, descripcion: req.body.descripcion});

  res.send("Insertados en la tabla Usuarios los siguientes datos: " +JSON.stringify(req.body));
});

app.listen(3000);
