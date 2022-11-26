## <small>EV2</small> Desarrollo de Interfaces

# ANGULAR

Proyecto que realiza las operaciones básicas contra la entidad Productos; creación, lectura, actualización, borrado (CRUD).

Contiene varias ramas para ir avanzando en conceptos relacionados con el desarrollo Angular.

## v1-core-shared:

**Diseño modular basado en características.**

La idea es dividir la aplicación en **módulos de características** que representen diferentes funcionalidades de negocio.
A continuación un diagrama que ilustra la separación de los módulos de características.

![core-shared](https://dev-academy.com/angular-architecture-best-practices/large_imports.webp)

> Pietrucha, B. (2019). _Angular architecture and best practices_. Recuperado de [dev-academy](https://dev-academy.com/angular-architecture-best-practices/)

## v2-frontend-backend

**Se agrega el apartado de backend mediante _express.js_.**

Sustituimos _InMemoryWebApi_ por un Mock api realizado con _Express - Marco de aplicación web Node.js_, los valores no son persistentes ya que no hay conexion a base de datos.

## v3_deployment

Despliegue distribuida de la aplicación.
El backend en Heroku y la base de datos en MongoDB Atlas.
El frontend en Firebase.

## v4_serverless

**Despliegue serverless**

La aplicación se despliega en Netlify convirtiendo el backend en Functions.
La aplicación final está disponible en https://ng-mystore.netlify.app/
