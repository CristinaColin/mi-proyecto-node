const express = require('express');
const app = express();
const horarios = require('./horarios');
// var hora = Date.now();
// var date = new Date;

// app.get('/', (req, res) => {
//     // res.send(date.getHours());
//     // let time = req.time
//     // res.send(`Hora del servidor: ${date.toISOString()}`);
//     let options = {timeZone: 'America/New_York'};

//     res.send(`Hora en new york: ${date.toLocaleString('en-US', options)}`);
//     // console.log(date.toISOString());
// });

app.use('/', horarios);


const hostname = '0.0.0.0';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
  });

// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hola mundoooo editado por segunda vez!');
// });

// server.listen(port, hostname, () => {
//   console.log(`Servidor corriendo en http://${hostname}:${port}/`);
// });
