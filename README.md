# anuncios_UAB
# Página web para la publicación y gestión de anuncios – UAB

Proyecto semestral de la asignatura **Tecnologías para Internet**.  
Aplicación web para la publicación y gestión de anuncios de la **Universidad Adventista de Bolivia (UAB)**, con anuncios generales para toda la universidad y anuncios específicos por carrera.

- **Integrantes del grupo:**
  - Elger Enrique Márquez Arze
  - Josue Brayen Rojas
  - Miguel Blasquez Iquiza
  - Marcos Blasquez Iquiza

Repositorio: `https://github.com/enri2003/anuncios_UAB.git`  
Rama de desarrollo utilizada: `enri2003`.

---

## 1. Descripción general del proyecto

El grupo desarrolló una aplicación web que permite:

- Publicar anuncios generales visibles para toda la universidad.  
- Publicar anuncios específicos asociados a una carrera.  
- Autenticar usuarios mediante un sistema de login con JWT.  
- Diferenciar entre:
  - **Administrador**: puede crear, editar y eliminar anuncios (CRUD completo).  
  - **Usuario normal**: solo puede visualizar anuncios.  

Además, se implementó un panel en la página principal donde se selecciona la carrera a través de tarjetas con iconos; al cambiar de tarjeta se filtran los anuncios que se muestran.

Arquitectura empleada:

- **Frontend**: HTML, CSS, JavaScript y Bootstrap (archivos estáticos).  
- **Backend**: API REST con Node.js, Express y TypeScript.  
- **Base de datos**: MongoDB mediante Mongoose.  
- **Autenticación**: JSON Web Tokens (JWT).

---

## 2. Tecnologías y librerías utilizadas

### Frontend

- HTML5  
- CSS3  
- JavaScript (vanilla)  
- Bootstrap 5.3 (CDN)  
- Bootstrap Icons (CDN)  
- Paquete `serve` para servir la carpeta `public`:

npx serve public -l 5500

text

### Backend

- Node.js  
- Express.js  
- TypeScript  
- Mongoose (ORM)  
- dotenv (variables de entorno)  
- bcrypt (cifrado de contraseñas)  
- jsonwebtoken (manejo de tokens JWT)  
- cors, morgan (middleware auxiliares)

### Base de datos

- MongoDB local, con una base de datos por ejemplo en:  
  `mongodb://localhost:27017/anuncios_uab`

Colecciones definidas:

- `users` – usuarios del sistema (administradores y usuarios normales).  
- `ads` – anuncios generales.  
- `careerads` – anuncios específicos por carrera.

---

## 3. Estructura del proyecto

anuncios_UAB/
├─ public/
│ ├─ index.html # Página principal: listado de anuncios y formulario (solo admin)
│ ├─ login.html # Pantalla de inicio de sesión
│ └─ register.html # Pantalla de registro para usuarios normales
├─ src/
│ ├─ config/
│ │ └─ database.ts # Conexión a MongoDB con Mongoose
│ ├─ controllers/
│ │ ├─ ad.controller.ts # Lógica de anuncios generales
│ │ ├─ careerAd.controller.ts # Lógica de anuncios por carrera
│ │ └─ auth.controller.ts # Registro y login de usuarios
│ ├─ middlewares/
│ │ └─ auth.middleware.ts # Verificación del token JWT y del rol
│ ├─ models/
│ │ ├─ user.model.ts # Modelo de usuario
│ │ ├─ ad.model.ts # Modelo de anuncios generales
│ │ └─ careerAd.model.ts # Modelo de anuncios por carrera
│ ├─ routes/
│ │ ├─ ad.routes.ts # Rutas de anuncios generales y por carrera
│ │ └─ auth.routes.ts # Rutas de autenticación
│ ├─ app.ts / index.ts # Configuración principal de Express
│ └─ ...
├─ package.json
├─ tsconfig.json
├─ .env.example # Ejemplo de variables de entorno
└─ README.md

text

La carpeta `node_modules` no forma parte del repositorio.

---

## 4. Variables de entorno (.env)

En la raíz del proyecto se utiliza un archivo `.env` con variables de entorno para la configuración del servidor y la base de datos.  
Ejemplo:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/anuncios_uab
JWT_SECRET=una_clave_secreta_muy_segura

text

El archivo `.env` no se incluye en el repositorio público y se entrega por separado cuando es necesario.

---

## 5. Instalación y ejecución del proyecto

Esta sección describe los pasos que debe seguir cualquier persona que clone el repositorio para ejecutar la aplicación.

### 5.1. Requisitos previos

- Node.js (versión 16 o superior).  
- MongoDB instalado y en ejecución en la máquina local.  
- Git.  
- Postman (opcional, para pruebas de la API).  

### 5.2. Pasos de instalación

1. **Clonado del repositorio**

git clone https://github.com/enri2003/anuncios_UAB.git
cd anuncios_UAB
git checkout enri2003

text

2. **Instalación de dependencias**

npm install

text

3. **Creación del archivo `.env`**

Crear un archivo `.env` en la raíz del proyecto con el contenido:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/anuncios_uab
JWT_SECRET=una_clave_secreta_muy_segura

text

4. **Compilación de TypeScript (si se utiliza build)**

npm run build

text

5. **Ejecución del backend**

npm run dev

text

El servidor API quedará disponible en:

http://localhost:3000

text

6. **Ejecución del frontend**

Desde la raíz del proyecto:

npx serve public -l 5500

text

El frontend quedará disponible en:

http://localhost:5500

text

- Página principal: `http://localhost:5500/index.html`  
- Login: `http://localhost:5500/login.html`  
- Registro de usuario: `http://localhost:5500/register.html`

---

## 6. Gestión de usuarios y roles

### 6.1. Tipos de usuarios

El sistema distingue dos tipos de usuarios:

- **Administrador**  
  - Tiene acceso completo al CRUD de anuncios.  
  - Puede crear, editar y eliminar anuncios generales y por carrera.  
  - Puede crear cuentas de otros administradores si se desea.

- **Usuario normal**  
  - Solo puede visualizar anuncios en la página principal.  
  - No puede crear, editar ni eliminar anuncios.

En la práctica del grupo, el primer administrador se crea a través de Postman (o directamente en la base de datos) y, a partir de ahí, se utiliza esa cuenta para la gestión principal del sistema.

### 6.2. Registro de usuarios

- Los **usuarios normales** se registran en la página `register.html` o mediante el endpoint de registro.  
- Las cuentas de **administrador** se crean de forma controlada por el responsable del sistema, utilizando la API (por ejemplo, desde Postman) o un script de inicialización.  
  Es decir, un usuario no puede auto-asignarse el rol de administrador desde la interfaz pública.

---

## 7. Uso de Postman: registro, login y CRUD

A continuación se presentan ejemplos concretos de uso de la API con Postman.

### 7.1. Registro de usuarios (crear administrador y usuario normal)

**Endpoint de registro**

- Método: `POST`  
- URL: `http://localhost:3000/api/auth/register`  
- Headers:
  - `Content-Type: application/json`

**Ejemplo para crear un administrador (realizado por el responsable del sistema):**

{
"name": "Admin UAB",
"email": "admin@uab.edu",
"password": "123456",
"role": "admin"
}

text

**Ejemplo para crear un usuario normal:**

{
"name": "Usuario UAB",
"email": "user@uab.edu",
"password": "123456",
"role": "user"
}

text

El campo `role` define el tipo de cuenta. En un uso normal del sistema, solo el responsable puede enviar registros con `role: "admin"`.

### 7.2. Inicio de sesión y token JWT

**Endpoint de login**

- Método: `POST`  
- URL: `http://localhost:3000/api/auth/login`  
- Headers:
  - `Content-Type: application/json`

**Ejemplo de cuerpo (para administrador):**

{
"email": "admin@uab.edu",
"password": "123456"
}

text

La respuesta contiene un campo `token` y los datos básicos del usuario (por ejemplo, nombre y rol).  
El token se emplea en todas las rutas protegidas mediante el encabezado:

Authorization: Bearer <TOKEN_JWT_AQUI>

text

### 7.3. Relación con el frontend

Después de crear las cuentas necesarias y probar el login en Postman:

1. Un usuario puede ir a `http://localhost:5500/login.html`.  
2. Si inicia sesión con una cuenta de **administrador**:
   - El frontend almacena el token y el rol en `localStorage`.  
   - En `index.html` se muestra el formulario para crear o editar anuncios.  
   - En cada anuncio aparecen los botones **Editar** y **Eliminar**, permitiendo realizar el CRUD desde la interfaz.  
3. Si inicia sesión con una cuenta de **usuario normal** o sin iniciar sesión:
   - Solo se muestra el listado de anuncios.  
   - El formulario de creación de anuncios y los botones de edición/eliminación permanecen ocultos.

De esta forma, el comportamiento de la página depende directamente del rol del usuario autenticado.

---

## 8. CRUD de anuncios en Postman

En las rutas protegidas se debe incluir siempre el encabezado:

Authorization: Bearer <TOKEN_JWT_AQUI>

text

donde el token corresponde a un usuario con rol `admin`.

### 8.1. Anuncios generales (`/api/ads`)

**Crear anuncio general**

- Método: `POST`  
- URL: `http://localhost:3000/api/ads`  
- Headers:
  - `Authorization: Bearer <token-admin>`
  - `Content-Type: application/json`

{
"titulo": "Reunión general de docentes",
"descripcion": "Reunión informativa para todo el personal docente.",
"categoria": "general",
"horaInicio": "08:00",
"horaFin": "10:00"
}

text

**Listar anuncios generales**

- Método: `GET`  
- URL: `http://localhost:3000/api/ads`

Este endpoint se utiliza en el frontend cuando está seleccionada la tarjeta **UAB General**.

**Actualizar anuncio general**

- Método: `PUT`  
- URL: `http://localhost:3000/api/ads/<id_del_anuncio>`  
- Headers:
  - `Authorization: Bearer <token-admin>`
  - `Content-Type: application/json`

{
"titulo": "Reunión general actualizada",
"descripcion": "Se actualiza el horario y algunos puntos de la agenda.",
"categoria": "general",
"horaInicio": "09:00",
"horaFin": "11:00"
}

text

**Eliminar anuncio general**

- Método: `DELETE`  
- URL: `http://localhost:3000/api/ads/<id_del_anuncio>`  
- Headers:
  - `Authorization: Bearer <token-admin>`

---

### 8.2. Anuncios por carrera (`/api/career-ads`)

**Crear anuncio para una carrera**

- Método: `POST`  
- URL (ejemplo para Psicología):  
  `http://localhost:3000/api/career-ads/Psicología`  
- Headers:
  - `Authorization: Bearer <token-admin>`
  - `Content-Type: application/json`

{
"titulo": "Taller de Psicología Clínica",
"descripcion": "Actividad para estudiantes de Psicología.",
"horaInicio": "14:00",
"horaFin": "16:00"
}

text

El nombre de la carrera se toma directamente del parámetro `:carrera`.

**Listar anuncios de una carrera**

- Método: `GET`  
- URL: `http://localhost:3000/api/career-ads/Psicología`

El frontend utiliza este endpoint al seleccionar la tarjeta de la carrera correspondiente.

**Actualizar anuncio de carrera**

- Método: `PUT`  
- URL: `http://localhost:3000/api/career-ads/<id_del_anuncio>`  
- Headers:
  - `Authorization: Bearer <token-admin>`
  - `Content-Type: application/json`

{
"titulo": "Taller de Psicología Clínica (actualizado)",
"descripcion": "Se ajusta el contenido y el horario del taller.",
"horaInicio": "15:00",
"horaFin": "17:00"
}

text

**Eliminar anuncio de carrera**

- Método: `DELETE`  
- URL: `http://localhost:3000/api/career-ads/<id_del_anuncio>`  
- Headers:
  - `Authorization: Bearer <token-admin>`

---

## 9. Funcionamiento del frontend

### 9.1. Tarjetas de carreras y filtros

En `index.html` se implementa una grilla de tarjetas que representan:

- UAB General  
- Ingeniería de Sistemas  
- Ingeniería Ambiental  
- Contaduría  
- Psicología  
- Actividad Física y Deportes  
- Nutrición  
- Bioquímica  
- Ingeniería en Redes  
- Administración y Negocios  
- Ingeniería Comercial  
- Psicopedagogía  
- Enfermería  
- Fisioterapia  
- Teología  

Cada tarjeta contiene un icono representativo y, al hacer clic, se marca como activa y actualiza la variable de carrera seleccionada en el script.  
El código JavaScript:

- Llama a `GET /api/ads` si la selección es UAB General.  
- Llama a `GET /api/career-ads/<nombre_carrera>` si la selección corresponde a una carrera específica.

### 9.2. Listado de anuncios y formulario

El contenedor de anuncios se rellena dinámicamente con los datos recibidos de la API.  
Cada tarjeta de anuncio muestra:

- Título.  
- Descripción.  
- Categoría o carrera.  
- Horario (inicio y fin).  
- Fecha de creación.

El formulario de creación/edición de anuncios se renderiza solo cuando el usuario ha iniciado sesión y su rol es `admin`:

- Al enviar el formulario:
  - Si la carrera seleccionada es general, se utiliza el endpoint `/api/ads`.  
  - Si la carrera seleccionada es específica, se utiliza `/api/career-ads/:carrera`.  
- Si el formulario está en modo edición, se envía un `PUT` con el `id` del anuncio.  
- El botón Eliminar de cada tarjeta envía un `DELETE` al endpoint adecuado.

### 9.3. Login y control de interfaz

En `login.html` se encuentra el formulario de autenticación:

- El formulario envía una solicitud a `POST /api/auth/login`.  
- Si las credenciales son correctas, el script:
  - Guarda `token`, `rol` y `nombre` en `localStorage`.  
  - Redirige a `index.html`.  

En `index.html` se revisa la información almacenada:

- Si existe un token y el rol es `admin`, se muestra:
  - El botón **Cerrar sesión**.  
  - La sección de creación de anuncios.  
  - Los botones de edición y eliminación en cada anuncio.  
- Si el usuario no tiene token o su rol es `user`, la sección de administración permanece oculta.

---

## 10. Resumen frente a los criterios de evaluación

1. **Documentación (README.md)**  
   - Se describe el objetivo del proyecto, las tecnologías, la estructura, la instalación, el uso de Postman y el comportamiento del sistema.

2. **Calidad del código y variables de entorno**  
   - Se emplea `.env` para la configuración sensible.  
   - El código se organiza en modelos, controladores, rutas y middlewares.

3. **Diseño de las páginas (Framework CSS)**  
   - La interfaz utiliza Bootstrap 5 y Bootstrap Icons, con un diseño limpio, responsivo y uniforme.

4. **Diseño del backend (Endpoints del API)**  
   - Se definen endpoints claros para autenticación y para el manejo de anuncios generales y por carrera.

5. **Uso de JWT (login)**  
   - Se implementa un flujo de login con JSON Web Tokens y middleware de validación.

6. **Manejo de la base de datos (ORMs)**  
   - La persistencia de datos se realiza con MongoDB y Mongoose, usando modelos `User`, `Ad` y `CareerAd`.

7. **Pruebas de seguridad**  
   - Se validan roles y permisos mediante JWT.  
   - Solo los administradores pueden modificar datos; los usuarios normales tienen acceso de solo lectura a los anuncios.

---

## 11. Créditos

Proyecto desarrollado por:

- **Elger Enrique Marquez Arze**  
- **Josue Brayen Rojas**  
- **Miguel Blasquez Iquiza**  
- **Marcos Blasquez Iquiza**

Universidad Adventista de Bolivia – Ingeniería de Sistemas – Asignatura: Tecnologías de Internet.
