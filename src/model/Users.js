// La clase User define la estructura y las reglas del modelo de datos.
// Incluye el esquema de la base de datos que describe cómo se deben almacenar los datos de usuario.
// Como podran ver aca no se hace importa mongoose y este mismo se importa en el dao esto se hace ya que 
// crear la clase User y la clase Dao por separado ayuda a mantener el código limpio y organizado.
// La clase User define el esquema y las reglas de datos,
// mientras que el Dao maneja la interacción con la base de datos.
// Esta separación permite un mejor mantenimiento, escalabilidad y flexibilidad en el desarrollo de la aplicación.

export default class User {
  constructor(data) {
    this.data = data;
  }
  static get model() {
    return "Users";
  }
  static get schema() {
    return {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      }
    };
  };
};