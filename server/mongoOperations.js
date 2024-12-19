const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "stock";

const crearBaseDeDatos = async () => {
    try {
        await client.connect();
        console.log("Conexión exitosa a MongoDB");
    } finally {
        await client.close();
    }
};

const crearColeccion = async (nombreColeccion) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        await db.createCollection(nombreColeccion);
        console.log(`Colección ${nombreColeccion} creada.`);
    } finally {
        await client.close();
    }
};

const insertarDocumento = async (coleccion, documento) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(coleccion);
        const resultado = await collection.insertOne(documento);
        console.log("Documento insertado:", resultado.insertedId);
    } finally {
        await client.close();
    }
};

const verTodos = async (coleccion) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(coleccion);
        const documentos = await collection.find().toArray();
        return documentos;
    } finally {
        await client.close();
    }
};

module.exports = {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
    verTodos,
};

/* 
///////////////////////////////////////////////////////////////////////////////////////


const { MongoClient } = require('mongodb');

const mydb = "stock";

const url = "mongodb://127.0.0.1:27017/";

async function connectToMongo() {
    const client = new MongoClient(url);
    await client.connect();
    return client;
}

//Creacion de una BD 
async function crearBaseDeDatos() {
    const client = await connectToMongo();
    const db = client.db(mydb);
    console.log(`Base de datos '${mydb}' creada o conectada.`);
    await client.close();
}

//Creacion de una coleccion dentro de una BD
async function crearColeccion(coleccion) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    await db.createCollection(coleccion);
    console.log(`Colección '${coleccion}' creada.`);
    await client.close();
}

//Insertar dentro de una coleccion de una BD
async function insertarDocumento(coleccion, documento) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.insertOne(documento);
    console.log(`Documento insertado con ID: ${resultado.insertedId}`);
    await client.close();
}

// Obtener datos del primer elemento dentro de una colección
async function obtenerPrimerElemento(coleccion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.findOne({});
        console.log(result.nombre);
        return result;
    } finally {
        await client.close();
    }
}

// Ver todos los elementos
async function verTodos(coleccion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find({}).toArray();
        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}

// Query simple
async function querySimple(coleccion, query) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find(query).toArray();
        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}

// Sort por un criterio (campo)
async function sortPorCampo(coleccion, campo, orden = 1) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find().sort({ [campo]: orden }).toArray();
        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}


//Borrar  
async function borrarDocumento(coleccion, filtro) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.deleteOne(filtro);
    console.log(`${resultado.deletedCount} documento(s) borrado(s).`);
    await client.close();
}


//Actualizar
async function actualizarDocumento(coleccion, filtro, actualizacion) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.updateOne(filtro, { $set: actualizacion });
    console.log(`${resultado.modifiedCount} documento(s) actualizado(s).`);
    await client.close();
}


module.exports = {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
    obtenerPrimerElemento,
    verTodos,
    querySimple,
    sortPorCampo,
    borrarDocumento,
    actualizarDocumento
}; */