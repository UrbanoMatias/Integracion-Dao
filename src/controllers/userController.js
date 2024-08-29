// Importa el servicio de usuarios desde el módulo de services.
import { userService } from "../services/index.js";  

// La función "getUsers" maneja las solicitudes para obtener todos los usuarios.
// Utiliza el servicio de usuarios ("userService") para recuperar todos los registros de usuarios desde la base de datos.
// Luego, envía esos resultados al cliente como respuesta.
const getUsers = async (req, res) => {
    // Llama al método "getAll" del servicio de usuarios para obtener todos los usuarios.
    let results = await userService.getAll();  
    // Envía los resultados obtenidos al cliente.
    res.send(results);  
};

// La función "insertUser" maneja las solicitudes para agregar un nuevo usuario.
// Si alguno de estos campos está incompleto, responde con un error 400 (Bad Request).
// Si todos los campos están presentes, llama al servicio de usuarios para insertar el nuevo usuario en la base de datos,
// y luego envía el resultado al cliente.
const insertUser = async (req, res) => {
    // Extrae los campos "first_name", "last_name", "email" y "password" del cuerpo de la solicitud.
    let { first_name, last_name, email, password } = req.body;  
    // Verifica que todos los campos estén presentes.
    if (!first_name || !last_name || !email ||!password) return res.status(400).send({ error: "Incomplete fields" });  
    // Inserta el nuevo usuario en la base de datos.
    let result = await userService.insert({ first_name, last_name, email, password });  
    // Envía el resultado de la inserción al cliente.
    res.send(result);  
};

// Exporta las funciones "getUsers" y "insertUser" para que puedan ser utilizadas en otros módulos.
// Estas funciones se utilizan como controladores para manejar las solicitudes HTTP relacionadas con los usuarios,
// como obtener la lista de usuarios o agregar un nuevo usuario.
export default {
    getUsers,
    insertUser
};
