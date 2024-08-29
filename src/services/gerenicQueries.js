// La clase GenericQueries es una capa que se encuentra entre los servicios (ejemplo, userService) y el DAO.
// Su trabajo es ayudar a que los servicios se comuniquen con el DAO sin tener que interactuar directamente con él.
// Esto facilita el cambio de la forma en que accedemos a los datos sin afectar el resto del código.

// Funcionamiento:
// 1. El constructor de la clase recibe dos parámetros:
//    - "dao": La instancia del DAO que se utilizará para realizar operaciones de acceso a datos.
//    - "model": El nombre del modelo que el DAO manejará (por ejemplo, "User"). Permitiendo que el Repository sepa qué modelo
//      está siendo utilizado para las operaciones de datos.
//
// 2. La clase Repository tiene dos métodos principales:
//    - `get`: Este método toma los parámetros que usamos para buscar datos y llama al DAO para obtener los resultados.
//      Por ejemplo, si queremos encontrar todos los usuarios con un cierto nombre, `get` hace la búsqueda usando el DAO.
//    - `save`: Este método toma los datos que queremos guardar (como un nuevo usuario) y llama al DAO para insertar esos datos
//      en la base de datos.

// La clase GenericQueries ayuda a separar el código que maneja la base de datos del resto de la aplicación,
// haciendo que sea más fácil cambiar la forma en que accedemos a los datos sin afectar el resto del código.
// Tambien, agregando consultas genericas.

export default class GenericQueries {
    // El constructor recibe la instancia del DAO y el nombre del modelo.
    constructor(dao, model) {
        this.dao = dao;      // Asigna el DAO proporcionado a la propiedad "dao".
        this.model = model;  // Asigna el nombre del modelo proporcionado a la propiedad "model".
    };

    //------------------------GET---------------------------

    // Método para obtener un documento específico de la base de datos basado en los parámetros proporcionados.
    // Recibe un parámetro:
    // - `options`: Un objeto que contiene los criterios de búsqueda para localizar el documento deseado.
    //   Por ejemplo, podría ser `{ email: "user@example.com" }` para buscar un usuario por email.
    // 
    // El método hace lo siguiente:
    // 1. Llama al método `findOne` del DAO, pasando los criterios de búsqueda (`options`) y el modelo (`this.model`).
    // 2. El DAO se encarga de buscar el documento en la base de datos que coincida con los criterios y devolver el resultado.
    getBy = async (options) => {
        return this.dao.findOne(options, this.model);
    };

    // Método para obtener todos los documentos de la base de datos que coinciden con los parámetros proporcionados.
    // Recibe un parámetro:
    // - `options`: Un objeto que contiene los criterios de búsqueda para localizar los documentos deseados.
    //   Por ejemplo, podría ser `{ age: { $gte: 18 } }` para obtener todos los usuarios mayores de 18 años.
    // 
    // El método hace lo siguiente:
    // 1. Llama al método `getAll` del DAO, pasando los criterios de búsqueda (`options`) y el modelo (`this.model`).
    // 2. El DAO se encarga de buscar todos los documentos en la base de datos que coincidan con los criterios y devolver el resultado.
    getAll = async (options) => {
        return this.dao.getAll(options, this.model);
    };
    
    //------------------------INSERT---------------------------

    // Método para guardar un nuevo documento en la base de datos.
    // Recibe un parámetro:
    // - `data`: Un objeto que contiene los datos del nuevo documento que queremos guardar.
    // 
    // El método hace lo siguiente:
    // 1. Llama al método `insert` del DAO, pasando los datos (`data`) y el modelo (`this.model`)
    //    para especificar en qué colección o tabla se realizará la inserción.
    // 2. El DAO se encarga de guardar el nuevo documento en la base de datos y devolver el resultado.
    insert = async (data) => {
        // Llama al método `save` del DAO con los datos del nuevo documento y el modelo.
        return this.dao.save(data, this.model);
    };

    //------------------------UPDATE---------------------------

    // Método para actualizar un documento existente en la base de datos.
    // Recibe dos parámetros:
    // - `id`: El identificador único del documento que queremos actualizar.
    // - `document`: Un objeto con los nuevos datos que queremos guardar en el documento.
    // 
    // El método hace lo siguiente:
    // 1. Asigna el `id` al campo `_id` del documento. Esto asegura que el documento
    //    que vamos a actualizar tenga el identificador correcto.
    // 2. Llama al método `update` del DAO, pasando el documento actualizado y el modelo
    //    en el que se realiza la actualización. El DAO se encarga de realizar la operación
    //    de actualización en la base de datos.
    update = async (id, document) => {
        // Asigna el ID al documento para que el DAO sepa qué documento actualizar.
        document._id = id;
        // Llama al método `update` del DAO, pasando el documento actualizado y el modelo.
        return this.dao.update(document, this.model);
    };

    //------------------------DELETE---------------------------

    // Método para eliminar un documento en la base de datos.
    // Recibe un parámetro:
    // - `id`: El identificador único del documento que queremos eliminar.
    // 
    // El método hace lo siguiente:
    // 1. Llama al método `delete` del DAO, pasando el ID del documento y el modelo.
    //    El DAO se encarga de realizar la operación de eliminación en la base de datos.
    delete = async (id) => {
        // Llama al método `delete` del DAO, pasando el ID del documento y el modelo.
        return this.dao.delete(id, this.model);
    };
}
