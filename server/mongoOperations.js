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
