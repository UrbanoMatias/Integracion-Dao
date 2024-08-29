// Importa la clase Dao desde el archivo "Dao.js".
// Dao es una clase que gestiona la conexión y operaciones con la base de datos MongoDB.
import Dao from "../model/Dao.js";

// Importa la clase UserService desde el archivo "userService.js".
import UserService from "./userService.js";

// Importa la configuración desde el archivo "config.js".
import config from "../config/config.js";

// Crea una nueva instancia Dao utilizando la configuración de conexión a la base de datos.
// Esto establece la conexión con la base de datos MongoDB usando los parámetros proporcionados en "config.mongo".
const dao = new Dao(config.mongo);

// Crea una nueva instancia de UserService, pasando el DAO como parámetro.
// Esto permite que UserService utilice el DAO para realizar operaciones de acceso a datos relacionadas con usuarios.
// La instancia de UserService estará lista para manejar todas las operaciones espesificas que sean propiamente de users.
export const userService = new UserService(dao);

// Ejemplo adicional:
// Si en el futuro se crean más servicios, como un servicio para gestionar productos,
// se puede instanciar el nuevo servicio de manera similar, utilizando el mismo DAO.
// Por ejemplo:
    import ProductService from "./productService.js";
    export const productService = new ProductService(dao);
// Esto facilita la creación de servicios adicionales sin necesidad de modificar el DAO,
// manteniendo una estructura modular y organizada.
