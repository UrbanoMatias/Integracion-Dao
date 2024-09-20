import mongoose from "mongoose";
import User from "./Users.js"; // Importa el modelo de usuario desde el archivo "Users.js".
import Book from "./Books.js";
import Course from "./Course.js";
import Asignature from "./Asignature.js";
// El DAO centraliza todas las operaciones necesarias para acceder a la información.
// Ventajas: facilita el mantenimiento al unificar todos los modelos en un solo lugar,
// evitando la necesidad de gestionar múltiples DAOs independientes para cada modelo.
// Además, simplifica la posibilidad de cambiar la capa de persistencia en el futuro.
// Contar con un DAO general es el primer paso hacia una estructura unificada, donde
// todos los submodelos comparten una única instancia, lo que facilita la transición
// a un nuevo DAO si es necesario.

export default class Dao {
  // Primero, creamos el constructor que manejará la conexión a la base de datos.
  constructor(mongoConfig) {
    // Crea una conexión a la base de datos utilizando la URL proporcionada en mongoConfig.
    // Si ocurre un error en la conexión,
    // se lanza un error y se detiene la ejecución para evitar problemas posteriores.
    this.mongoose = mongoose.connect(mongoConfig.url).catch((error) => {
      console.error("Error al conectar con la base de datos:", error);
      process.exit(); // Finaliza el proceso si la conexión falla.
    });
    // Declaramos los timestamps manualmente
    const timestamps = {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    };
    // Creamos una variable para instanciar los schemas, asociando el schema correspondiente con los timestamps.
    // Para crear un nuevo schema, se podría hacer así: "const productSchema = mongoose.Schema(Product.schema, timestamps);"
    const userSchema = mongoose.Schema(User.schema, timestamps);
    const bookSchema = mongoose.Schema(Book.schema, timestamps);
    const courseSchema = mongoose.Schema(Course.schema, timestamps);
    const asignatureSchema = mongoose.Schema(Asignature.schema, timestamps);
    // Después de declarar todos los schemas de Mongoose, creamos una variable "models",
    // que será un objeto donde se generarán los modelos de Mongoose. Esto permite que el
    // DAO trabaje con todas las instancias sin necesidad de crear un DAO separado para cada modelo.
    // Para agregar un nuevo modelo usando de ejemplo products seria: [Product.model]: mongoose.model(product.model, productSchema)
    this.models = {
      [User.model]: mongoose.model(User.model, userSchema),
      [Book.model]: mongoose.model(Book.model, bookSchema),
      [Asignature.model]: mongoose.model(Asignature.model, asignatureSchema),
      [Course.model]: mongoose.model(Course.model, courseSchema),
    };
  }

  // Método para encontrar un único documento que coincida con los criterios especificados.
  // La función recibe dos parámetros:
  // - "options": los criterios de búsqueda, como email, nombre, etc.
  // - "entity": el modelo que se utilizará para buscar en la base de datos.
  findOne = async (options, entity) => {
    // Si la entidad no existe en los modelos, se lanza un error.
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    // Utilizamos un bloque try/catch para manejar posibles errores durante la inserción.
    try {
      // Busca un único documento que coincida con los criterios especificados en "options".
      let result = await this.models[entity].findOne(options);
      // Devuelve el resultado como un objeto plano si se encuentra, o null si no se encuentra.
      // Esto se debe a que mongo en si devuelve un objeto que no es manipulable por javascript
      return result ? result.toObject() : null;
    } catch (error) {
      // En caso de error durante la búsqueda, se muestra el error en la consola y se devuelve null.
      console.error("Error finding document:", error);
      return null;
    }
  };

  // Método para obtener todos los documentos que coincidan con los criterios especificados.
  // La función recibe dos parámetros:
  // - "options": los criterios de búsqueda.
  // - "entity": el modelo que se utilizará para obtener los documentos.
  getAll = async (options, entity) => {
    // Si la entidad no existe en los modelos, se lanza un error.
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    // Utilizamos un bloque try/catch para manejar posibles errores durante la inserción.
    try {
      // Obtiene todos los documentos que coincidan con los criterios especificados en "options".
      let results = await this.models[entity].find(options);
      // Devuelve una lista de resultados como objetos planos.
      return results.map((result) => result.toObject());
    } catch (error) {
      // En caso de error durante la obtención de documentos, se muestra el error en la consola y se devuelve una lista vacía.
      console.error("Error finding document:", error);
      return [];
    }
  };

  // Método para agregar un nuevo documento a la base de datos.
  // Esta función permite crear y almacenar un nuevo registro para una entidad específica.
  // Recibe dos parámetros:
  // - "document": un objeto JSON que contiene los datos que se desean guardar en la base de datos.
  //   Este objeto incluye los campos y valores específicos necesarios para la entidad, como nombre, contraseña, email, etc.
  // - "entity": el nombre del modelo en el que se insertará el nuevo documento.
  save = async (document, entity) => {
    // Si la entidad no existe en los modelos, se lanza un error.
    if (!this.models[entity]) throw new Error("Entity not found in models");
    // Utilizamos un bloque try/catch para manejar posibles errores durante la inserción.
    try {
      // Creamos una instancia del modelo correspondiente usando el documento proporcionado.
      // Esto genera una nueva instancia del modelo (como newProduct, newCart, newUser)
      // a partir del documento JSON enviado.
      let instance = new this.models[entity](document);

      // Guardamos la instancia en la base de datos.
      let result = await instance.save();

      // Si la inserción fue exitosa, devolvemos el resultado como un objeto plano.
      // Si hubo un problema, devolvemos null.
      return result ? result.toObject() : null;
    } catch (error) {
      // En caso de error, se muestra el error en la consola y se devuelve null.
      console.error("Error finding document:", error);
      return null;
    }
  };

  // Método para guardar múltiples documentos en la base de datos.
  // La función recibe dos parámetros:
  // - "documents": un arreglo de objetos que representan los documentos a insertar en la base de datos.
  // - "entity": el nombre del modelo que se utilizará para realizar la inserción.
  //
  // Este método realiza los siguientes pasos:
  // 1. Verifica que el modelo especificado en "entity" exista en los esquemas del DAO.
  // 2. Usa `insertMany` para insertar todos los documentos proporcionados en la base de datos.
  // 3. Devuelve un arreglo de los documentos insertados, convertidos a objetos planos. Si ocurrió un error durante el proceso,
  //    se captura la excepción y se imprime en la consola, y la función devuelve `null` para indicar que no se pudieron guardar los documentos.
  saveMany = async (documents, entity) => {
    if (!this.models[entity]) throw new Error("Entity not found in models");
    try {
      let result = await this.models[entity].insertMany(documents);
      return result ? result.map((doc) => doc.toObject()) : null;
    } catch (error) {
      console.error("Error saving documents:", error);
      return null;
    }
  };

  // Método para actualizar un documento existente en la base de datos.
  // La función recibe dos parámetros:
  // - "document": el documento que contiene los datos a actualizar. Debe incluir el _id del documento a actualizar.
  // - "entity": el modelo que se utilizará para realizar la actualización.
  // Primero, eliminamos el _id del documento antes de actualizar.
  // Si la entidad no existe en los modelos, se lanza un error.
  // Se actualiza el documento en la base de datos y se devuelve el resultado como un objeto plano.
  update = async (document, entity) => {
    // Si la entidad no existe en los modelos, se lanza un error.
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    let id = document._id;
    delete document._id;
    // Utilizamos un bloque try/catch para manejar posibles errores durante la inserción.
    try {
      // Actualiza el documento con el _id especificado y los datos proporcionados en "document".
      let result = await this.models[entity].findByIdAndUpdate(
        id,
        { $set: document },
        { new: true }
      );
      // Devuelve el resultado actualizado como un objeto plano.
      return result ? result.toObject() : null;
    } catch (error) {
      // En caso de error durante la actualización, se muestra el error en la consola y se devuelve null.
      console.error("Error finding document:", error);
      return null;
    }
  };

  // Método para eliminar un documento de la base de datos.
  // La función recibe dos parámetros:
  // - "filter": un objeto que define las condiciones de búsqueda para encontrar el documento a eliminar.
  // - "entity": el nombre del modelo que se utilizará para realizar la eliminación.
  //
  // Este método realiza los siguientes pasos:
  // 1. Verifica que el modelo especificado en "entity" exista en los esquemas del DAO.
  // 2. Usa `deleteOne` con el filtro proporcionado para encontrar y eliminar el documento correspondiente.
  // 3. Devuelve `true` si se eliminó al menos un documento, de lo contrario, devuelve `false`.
  // En caso de error durante el proceso de eliminación, se captura la excepción y se imprime en la consola,
  // y la función devuelve `false` para indicar que no se realizó la eliminación.
  delete = async (filter, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    try {
      // Utiliza deleteOne con un filtro basado en el campo deseado
      let result = await this.models[entity].deleteOne(filter);
      return result.deletedCount > 0 ? true : false; // Devuelve true si se eliminó algo
    } catch (error) {
      console.error("Error finding document:", error);
      return false; // Devuelve false en caso de error
    }
  };

  // Método para eliminar múltiples documentos de la base de datos.
  // La función recibe dos parámetros:
  // - "filter": un objeto que define las condiciones de búsqueda para encontrar los documentos a eliminar.
  // - "entity": el nombre del modelo que se utilizará para realizar la eliminación.
  //
  // Este método realiza los siguientes pasos:
  // 1. Verifica que el modelo especificado en "entity" exista en los esquemas del DAO.
  // 2. Usa `deleteMany` con el filtro proporcionado para encontrar y eliminar todos los documentos que coincidan con las condiciones.
  // 3. Devuelve el número de documentos eliminados. Si ocurrió un error durante el proceso, se captura la excepción y se imprime en la consola,
  //    y la función devuelve `null` para indicar que no se pudo realizar la eliminación.
  deleteMany = async (filter, entity) => {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not in dao schemas`);
    try {
      // Elimina todos los documentos que coincidan con el filtro especificado
      let result = await this.models[entity].deleteMany(filter);
      return result ? result.deletedCount : null;
    } catch (error) {
      console.error("Error finding document:", error);
      return null;
    }
  };
}
