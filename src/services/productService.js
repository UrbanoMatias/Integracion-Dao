// Ejemplo de cómo crear un nuevo servicio para un modelo diferente, como Product:
// 1. Importa el modelo de Product desde la carpeta de modelos.
// 2. Importa la clase GerenericQueris desde la carpeta de services.
// 3. Crea una nueva clase ProductService que extienda de GerenericQueries, pasando el DAO y el modelo de Product al constructor.
// 4. Define métodos específicos en ProductService que utilicen la función "get" del GenericQueries para realizar búsquedas y otras operaciones.

// Importa el modelo de Product desde la carpeta de modelos.
import Products from "../model/Products.js";  
// Importa la clase GenericQueries desde la carpeta de repositorios.
import GenericQueries from "./gerenicQueries.js";  

export default class ProductService extends GenericQueries {
    constructor(dao) {
        // Llama al constructor de GenericQueries con el DAO y el nombre del modelo de Product.
        super(dao, Products.model);  
    }

    // Ejemplo de un método específico para ProductService
    getByProductName = (productName) => {
        // Utiliza la función "findOne" para buscar productos por su nombre.
        return this.dao.findOne({ name: productName }, Product.model);
    }
}