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

app.get('/herramientas', async (req, res) => {
  let todos = await verTodos("herramientas");
  res.json(todos);
});

app.get('/incidencias', async (req, res) => {
  let todos = await verTodos("incidencias");
  res.json(todos);
});

app.get('/peticiones', async (req, res) => {
  let todos = await verTodos("peticiones");
  res.json(todos);
});

app.get('/herramientas/buscar', (req, res) => {
  res.sendFile(__dirname + '/search.html');
});

app.get('/herramientas?nombre=:nombre', async (req, res) => {
  let todos = await querySimple("herramientas", {nombre: req.params.nombre});
  res.json(todos);
});


app.post('/', async (req, res) => {
  await crearBaseDeDatos();
  await crearColeccion("herramientas");
  await insertarDocumento('herramientas', { nombre: req.body.nombre, tipo: req.body.tipo, marca:req.body.marca, cantidad: req.body.cantidad, descripcion: req.body.descripcion});

  res.send("Insertados en la tabla Usuarios los siguientes datos: " +JSON.stringify(req.body));
});

app.listen(3000);
