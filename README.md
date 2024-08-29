# Guía de Lectura del Proyecto

Este documento proporciona una guía para entender la implementación de un DAO (Data Access Object) en nuestro proyecto. La finalidad es ofrecer una arquitectura bien organizada y escalable, evitando la confusión y malas prácticas que pueden surgir de un código desordenado. A continuación, te guiaré sobre cómo explorar y comprender la estructura del proyecto.

## Introducción

La implementación de un DAO y una adecuada arquitectura de diseño permite gestionar y entender mejor los cambios realizados por otros miembros del equipo. Además, facilita la escalabilidad y mantiene el proyecto organizado. Cada función y método está ubicado en el archivo correspondiente para simplificar el mantenimiento y la expansión.

# Guía de Exploración

## Inicio en app.js

Comienza por el archivo app.js para entender la configuración inicial del proyecto y cómo se inicia la aplicación.

## Configuración en la Carpeta config

Revisa los archivos en la carpeta config para comprender cómo se gestionan las variables de entorno. Esto es crucial para la configuración de la conexión a la base de datos y otras configuraciones del entorno.

## Modelos en la Carpeta model

Examina los archivos User.js y Products.js en la carpeta model. Aquí se definen los modelos y esquemas que representan las estructuras de datos de la base de datos.
Luego, revisa Dao.js para ver cómo se integran estos modelos en el DAO. Aquí encontrarás cómo los esquemas se usan para interactuar con la base de datos de manera dinámica.

## Servicios en la Carpeta services

Comienza con genericQueries.js, que contiene consultas genéricas que el DAO puede manejar. Este archivo define las consultas básicas que se pueden realizar en cualquier modelo.
Luego, revisa userService.js para ver cómo se extienden las consultas genéricas para casos específicos del modelo de usuario. Este archivo muestra cómo se pueden crear consultas más especializadas.
Examina productService.js para un ejemplo adicional de cómo implementar servicios para otros modelos.

## Integración en index.js

En index.js, se ensamblan todos los servicios y el DAO, y se exportan para su uso en los controladores. Este archivo sirve como el punto central de integración entre los servicios y el DAO.

## Controladores en la Carpeta controllers

Los archivos en esta carpeta contienen la lógica de negocio, es decir, cómo se procesan las solicitudes del cliente y se interactúa con el DAO. Aquí se define cómo se manejan las operaciones CRUD desde la perspectiva del servidor.

## Rutas en la Carpeta routes

Finalmente, en la carpeta routes encontrarás los archivos que definen las rutas y los métodos correspondientes en los controladores. Estos archivos establecen los endpoints de la API y las acciones asociadas.

# Resumen

Este enfoque modular permite mantener la claridad, escalabilidad y facilidad de comprensión del código. Al seguir esta estructura, podrás comprender cómo interactúan los diferentes componentes del sistema y cómo se puede ampliar o modificar el proyecto de manera eficiente.
