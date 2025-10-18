# anuncios_UAB
# Guía para ejecutar el proyecto anuncios_UAB

<!-- 
  Paso 1: Clonar el repositorio desde GitHub 
  Comentario: Esto descarga el código fuente para trabajar localmente
-->
git clone https://github.com/enri2003/anuncios_UAB.git

<!-- 
  Paso 2: Entrar a la carpeta del proyecto
  Comentario: Cambiar directorio para trabajar dentro del proyecto
-->
cd anuncios_UAB

<!-- 
  Paso 3: Cambiar a la rama donde está el código base actual
  Comentario: La rama 'anuncio' contiene el desarrollo más reciente
-->
git checkout anuncio

<!-- 
  Paso 4: Instalar las dependencias necesarias para que el proyecto funcione
  Comentario: Descarga e instala todos los paquetes listados en package.json 
-->
npm install

<!-- 
  Paso 5: Crear un archivo .env con las variables de entorno necesarias
  Comentario: Configura conexiones y claves importantes para el proyecto
  Ejemplo de contenido:
  PORT=3000
  MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombreDB
  JWT_SECRET=tu_clave_secreta
-->

<!-- 
  Paso 6: Ejecutar el servidor en modo desarrollo
  Comentario: Levanta el backend en modo que recarga al detectar cambios
-->
npm run dev

<!-- 
  Paso 7: Verificar que el servidor está corriendo correctamente
  Comentario: Abrir en navegador o Postman la URL http://localhost:3000
-->

<!-- 
  Nota:
  - Requiere Node.js instalado.
  - MongoDB debe estar disponible y la URI correctamente configurada.
  - Mantener privado el archivo .env para no subir claves sensibles.
  - Para producción, compilar antes con `npm run build`.
-->
