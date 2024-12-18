//Autores Borja, Ana Maria, Natalia, Osvaldo 
// Fecha 18/12/2024
// Agregados endpoints líneas 29~57
// Versión de la app 1.0.0


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

// B: Endpoint para mostrar todas las herramientas de la DB
app.get('/herramientas', async (req, res) => {
  let todos = await verTodos("herramientas");
  res.json(todos);
});

// B: Endpoint para mostrar todas las incidencias de la DB

app.get('/incidencias', async (req, res) => {
  let todos = await verTodos("incidencias");
  res.json(todos);
});

// B: Endpoint para mostrar todas las peticiones de la DB

app.get('/peticiones', async (req, res) => {
  let todos = await verTodos("peticiones");
  res.json(todos);
});

// B: WIP
app.get('/herramientas/buscar', (req, res) => {
  res.sendFile(__dirname + '/search.html');
});
// B: WIP
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

app.listen(3000); //B: Editado para que escuche al puerto 3000
