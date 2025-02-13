const express = require('express');
const app = express();
const router = express.Router();

const horarios = require('./horarios');
const path = require('path');
const multer = require('multer');

const fs = require("fs");
const csv = require("csv");

const hostname = '0.0.0.0';
const port = 3000;

const storage = multer.diskStorage({
  destination: 'storage/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filtro para solo permitir archivos CSV
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'text/csv' && path.extname(file.originalname) !== '.csv') {
    return cb(new Error('Solo se permiten archivos CSV.'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });
const handler = (req, res) => {
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

    res.json({ message: 'Upload success', file: req.file.filename });
  });
}
app.set('view engine', 'ejs'); // Configura EJS como motor de vistas
app.set('views', __dirname + '/views'); // Ruta de las vistas
app.use('/', horarios); // Ruta del archivo de horarios

app.post('/upload',upload.single('file', handler(req,res)));

app.get('/form', (req, res) => {
  res.render('pages/form'); // Renderiza la vista "form.ejs"
});

app.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
