import express from "express";  
// Importa el controlador de usuarios que contiene las funciones para manejar las solicitudes.
import userController from "../controllers/userController.js";  

const router = express.Router();

// Con los controladores ya creados y organizados por separado, solo es necesario llamarlos en las rutas correspondientes.
router.get("/users", userController.getUsers);

// De la misma manera, se pueden agregar otras rutas vinculadas a sus controladores respectivos.
router.post("/newUser", userController.insertUser);

router.get("/user/:id", userController.getUserById);

export default router;


