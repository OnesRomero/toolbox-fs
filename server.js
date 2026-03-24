// server.js
const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

// Confiar en los encabezados de proxy (si estás detrás de uno, como Nginx)
app.set('trust proxy', true);

// 1. Configurar un gestor de sesiones.
// Es necesario para que keycloak-connect almacene el estado de la autenticación.
const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'e9nC1eTyGhhzq3XOIddHPKG+JmARytgghzlE0wXdYIQ=', // Cambia esto por un secreto más seguro en producción
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// 2. Instanciar el adaptador de Keycloak.
// Por defecto, buscará un archivo 'keycloak.json' en la raíz de tu proyecto.
// La configuración dentro de ese archivo (public vs confidential) es leída aquí.
const keycloak = new Keycloak({ store: memoryStore });

// 3. Instalar el middleware de Keycloak.
// Este middleware interceptará las peticiones para verificar la autenticación.
app.use(keycloak.middleware({
    logout: '/logout', // URL para cerrar sesión
    admin: '/'      // URL base para callbacks administrativos
}));

// 4. Proteger tus archivos estáticos o rutas.
// keycloak.protect() es el middleware que exige que el usuario esté autenticado.
// Todas las peticiones a la raíz '/' y su contenido requerirán inicio de sesión.
app.use('/', keycloak.protect(), express.static('public'));

// Este segundo middleware para 'public' es redundante y puede ser eliminado.
// Lo mantengo comentado por si tenías una razón específica para tenerlo.
// app.use(express.static('public', {}));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});