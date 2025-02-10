const express = require('express');
const app = express();
const horarios = require('./horarios');

app.set('view engine', 'ejs'); // Configura EJS como motor de vistas
app.set('views', __dirname + '/views'); // Ruta de las vistas
app.use('/', horarios);

const hostname = '0.0.0.0';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
