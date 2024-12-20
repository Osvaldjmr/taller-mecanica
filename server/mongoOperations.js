const { MongoClient } = require('mongodb');

// Configuración de la base de datos
const mydb = "stock"; // Nombre de la base de datos
const url = "mongodb://127.0.0.1:27017/"; // URL de conexión

/**
 * Conecta al cliente de MongoDB.
 * @returns {Promise<MongoClient>} Cliente de MongoDB conectado.
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
    try {
        const db = client.db(mydb);
        await db.createCollection(coleccion);
        console.log(`Colección '${coleccion}' creada.`);
    } catch (error) {
        console.error(`Error al crear la colección '${coleccion}':`, error);
    } finally {
        await client.close();
    }
}

// ======= OPERACIONES CON DOCUMENTOS ======= //

/**
 * Inserta un documento en una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @param {Object} documento - Documento a insertar.
 */
async function insertarDocumento(coleccion, documento) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const resultado = await collection.insertOne(documento);
        console.log(`Documento insertado con ID: ${resultado.insertedId}`);
    } catch (error) {
        console.error("Error al insertar documento:", error);
    } finally {
        await client.close();
    }
}

/**
 * Consulta todos los documentos de una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @returns {Promise<Array>} Lista de documentos.
 */
async function verTodos(coleccion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        return await collection.find({}).toArray();
    } catch (error) {
        console.error(`Error al obtener documentos de '${coleccion}':`, error);
        throw error;
    } finally {
        await client.close();
    }
}

/**
 * Actualiza un documento en una colección.
 * @param {string} coleccion - Nombre de la colección.
 * @param {Object} filtro - Filtro para identificar el documento.
 * @param {Object} actualizacion - Datos a actualizar.
 */
async function actualizarDocumento(coleccion, filtro, actualizacion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const resultado = await collection.updateOne(filtro, { $set: actualizacion });
        console.log(`${resultado.modifiedCount} documento(s) actualizado(s).`);
        return resultado;
    } catch (error) {
        console.error("Error al actualizar documento:", error);
        throw error;
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
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const resultado = await collection.deleteOne(filtro);
        console.log(`${resultado.deletedCount} documento(s) borrado(s).`);
    } catch (error) {
        console.error("Error al borrar documento:", error);
    } finally {
        await client.close();
    }
}

// Exporta todas las funciones
module.exports = {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
    verTodos,
    borrarDocumento,
    actualizarDocumento,
};
