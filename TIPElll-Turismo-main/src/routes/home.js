const express = require('express');
const router = express.Router();
const conn = require('../database');

// home

router.get('/', (req, res) => {
    conn.query('SELECT * FROM actividades', (err, actividades) => {
        if (err) {
            res.json(err);
        }
        conn.query('SELECT * FROM persona', (err, persona) => {
            if (err) {
                res.json(err);
            }
            //console.log(persona);
            res.render('home.ejs', {
                usuario: req.user,
                dataActividades: actividades,
                dataPersonas: persona

            });
        });
    });
});



// Taller individual - home
router.get('/servicio/:codigo_actividad', (req, res) => {
    const { codigo_actividad } = req.params;
    conn.query('SELECT * FROM actividades WHERE codigo_actividad = ?', [codigo_actividad], (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('individual-emp.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

module.exports = router;