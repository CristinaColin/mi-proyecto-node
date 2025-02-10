const express = require('express');
const router = express.Router();

const timeZones = {
    'us': 'America/New_York',
    'lon': 'Europe/London',
    'pekin': 'Asia/Shanghai',
    'mexico': 'America/Mexico_City',
    'tokio': 'Asia/Tokyo'
};

router.get('/', (req, res) => {
    const date = new Date();
    res.send(`Hora del servidor: ${date.toISOString()}`);
});

router.get('/:pais', (req, res) => {
    const pais = req.params.pais.toLowerCase();
    
    if (!timeZones[pais]) {
        return res.status(404).send('Zona horaria no encontrada.');
    }

    let date = new Date().toLocaleString("es-MX", { timeZone: timeZones[pais] });
    res.send(`Hora en ${pais.toUpperCase()}: ${date}`);
});

module.exports = router;
