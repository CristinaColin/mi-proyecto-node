const express = require('express');
const app = express();
const router = express.Router();

const horarios = require('./horarios');
const path = require('path');
const multer = require('multer');

const fs = require("fs");
const { readFile } = require('fs/promises'); // :Promise<Buffer>;

const csv = require("csv");
const { log } = require('console');

const hostname = '0.0.0.0';
const port = 3000;

const storage = multer.diskStorage({
  destination: 'storage/',
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now();
    // const ext = path.extname(file.originalname);
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'text/csv' && path.extname(file.originalname) !== '.csv') {
    return cb(new Error('Solo se permiten archivos CSV.'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

const handler = (req, res, next) => {
  console.log(req)
  upload.single('file')(req, res, (err) => {
    console.log("🚀 ~ upload.single ~ req:", err)
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Error al subir el archivo.' });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    console.log("🚀 ~ upload.single ~ req:", req)
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó un archivo válido.' });
    }
    next();
  });
}

app.set('view engine', 'ejs'); // Configura EJS como motor de vistas
app.set('views', __dirname + '/views'); // Ruta de las vistas
app.use('/', horarios); // Ruta del archivo de horarios

app.post('/upload', handler, (req,res) => {
  res.json({ message: 'Upload success', file: req.file.filename });
});


app.get('/form', (req, res) => {
  res.render('pages/form'); // Renderiza la vista "form.ejs"
});


app.get('/view/:filename',
  async (req, res) => {
    // console.log(req);
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'storage', filename);
    console.log(filePath);

    try {
      const data = await readFile(filePath, 'utf-8');  // devuelve una promesa
      // console.log(data);
      
      res.type('text/plain');
      res.send(`${data}`); 
    } catch (err) {
      res.status(404).json({ error: 'Archivo no encontrado' });
    }
  }
);

app.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
