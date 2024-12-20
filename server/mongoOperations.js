const { MongoClient } = require('mongodb');

// Configuración de la base de datos
const mydb = "stock"; // Nombre de la base de datos
const url = "mongodb://127.0.0.1:27017/"; // URL de conexión

/**
 * Conecta al cliente de MongoDB.
 * @returns {Promise<MongoClient>}
 */
async function connectToMongo() {
    const client = new MongoClient(url);
    await client.connect();
    return client;
}

// ======= OPERACIONES CON LA BASE DE DATOS ======= //

/**
 * Crea o conecta una base de datos.
 */
async function crearBaseDeDatos() {
    const client = await connectToMongo();
    const db = client.db(mydb);
    console.log(`Base de datos '${mydb}' creada o conectada.`);
    await client.close();
}

/**
 * Crea una nueva colección en la base de datos.
 * @param {string} coleccion - Nombre de la colección.
 */
async function crearColeccion(coleccion) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    await db.createCollection(coleccion);
    console.log(`Colección '${coleccion}' creada.`);
    await client.close();
}

// ======= OPERACIONES CON DOCUMENTOS ======= //

/**
 * Inserta un documento en una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @param {Object} documento - Documento a insertar.
 */
async function insertarDocumento(coleccion, documento) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.insertOne(documento);
    console.log(`Documento insertado con ID: ${resultado.insertedId}`);
    await client.close();
}

/**
 * Consulta el primer documento de una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @returns {Promise<Object>} - Primer documento encontrado.
 */
async function obtenerPrimerElemento(coleccion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.findOne({});
        return result;
    } finally {
        await client.close();
    }
}

/**
 * Consulta todos los documentos de una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @returns {Promise<Array>} - Lista de documentos.
 */
async function verTodos(coleccion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find({}).toArray();
        return result;
    } finally {
        await client.close();
    }
}

/**
 * Realiza una consulta específica en una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @param {Object} query - Consulta a realizar.
 * @returns {Promise<Array>} - Resultados de la consulta.
 */
async function querySimple(coleccion, query) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find(query).toArray();
        return result;
    } finally {
        await client.close();
    }
}

/**
 * Ordena los documentos de una colección por un campo.
 * @param {string} coleccion - Nombre de la colección.
 * @param {string} campo - Campo por el cual ordenar.
 * @param {number} orden - 1 para ascendente, -1 para descendente.
 * @returns {Promise<Array>} - Documentos ordenados.
 */
async function sortPorCampo(coleccion, campo, orden = 1) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find().sort({ [campo]: orden }).toArray();
        return result;
    } finally {
        await client.close();
    }
}

/**
 * Elimina un documento de una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @param {Object} filtro - Filtro para identificar el documento a eliminar.
 */
async function borrarDocumento(coleccion, filtro) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.deleteOne(filtro);
    console.log(`${resultado.deletedCount} documento(s) borrado(s).`);
    await client.close();
}

/**
 * Actualiza un documento en una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @param {Object} filtro - Filtro para identificar el documento.
 * @param {Object} actualizacion - Datos a actualizar.
 */
async function actualizarDocumento(coleccion, filtro, actualizacion) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);

    try {
        const resultado = await collection.updateOne(filtro, { $set: actualizacion });
        console.log("Resultado de updateOne:", resultado); // Log de depuración
        return resultado; // Retorna el resultado completo
    } catch (error) {
        console.error("Error en actualizarDocumento:", error);
        throw error; // Lanza el error al endpoint
    } finally {
        await client.close();
    }
}




// Exporta todas las funciones
module.exports = {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
    obtenerPrimerElemento,
    verTodos,
    querySimple,
    sortPorCampo,
    borrarDocumento,
    actualizarDocumento,
};
