// Importa el modelo de User desde la carpeta de modelos.
import User from "../model/Users.js";
// Importa la clase GenericQueries desde la carpeta de repositorios.
import GenericQueries from "./gerenicQueries.js";

// La clase UserService extiende (hereda) de la clase GenericQueries.
// Esto significa que UserService puede usar todos los métodos de GenericQueries y añadir sus propios métodos.
export default class UserService extends GenericQueries {
  // El constructor de UserService recibe el DAO y lo pasa a la clase base GenericQueries
  // junto con el nombre del modelo de User.
  constructor(dao) {
    // Llama al constructor de GenericQueries con el DAO y el nombre del modelo de User.
    super(dao, User.model);
  }

  // A lo cual podemos dar sentido al metodo creado en el DAO "findOne = async (options, entity)"
  // El método "findOne" está diseñado para recibir dos parámetros: "options" y "entity".
  // Aquí, "options" representa los criterios de búsqueda, como un objeto con el email del usuario,
  // y "entity" es el nombre del modelo en el que queremos buscar, como "User.model".
  // Este metodo se utiliza en el caso de que querramos hacer una funcion que solo sea espesifica del servicio de usuario
  // de tal manera que esta capa no tiene nada que ver con la base de datos, si no que se encargara de tener los metodos
  // hacia el dao.
  getByEmail = (email) => {
    // Por ejemplo, cuando usamos el método "getByEmail", estamos llamando a "findOne" con "{ email: email }"
    // como "options", que especifica el criterio de búsqueda, y "User.model" como "entity", que indica el modelo
    // donde se realizará la búsqueda.
    return this.dao.findOne({ email: email }, User.model);
    // De esta manera, "findOne" se convierte en una función genérica que puede buscar en cualquier modelo usando
    // diferentes criterios, haciendo que el código sea más flexible y reutilizable.
  };

  // getCurse = (id) => {
  //     return this.dao.findOne({ id: id }, Curse.model);
  // }
}
