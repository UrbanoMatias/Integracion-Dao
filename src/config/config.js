import dotenv from "dotenv";
dotenv.config();

// Es una buena práctica organizar las variables de entorno en un objeto modular.
// Esto facilita la lectura y mantenimiento del código, especialmente cuando la aplicación crece.
// Por ejemplo, si agregas más variables de entorno, lo harías así:
// export default {
//     port: {
//         port: process.env.PORT || 3000
//     },
//     jwt: {
//         SECRET: process.env.JWT_SECRET,
//         COOKIE: process.env.JWT_COOKIE
//     }
// };
// Luego, para usar estas variables en otras partes del código, importas el objeto config
// y accedes a las variables como config.jwt.SECRET.
export default {
    mongo: {
        // Usa la URL de la base de datos desde la variable de entorno MONGO_URL
        // Si no está definida, usa una URL por defecto para desarrollo
        url: process.env.MONGO_URL || "mongodb://localhost:27917/repaso"
    }
};

