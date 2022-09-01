const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/admin', (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.tipo == 'emprendedor' ){
            res.redirect('/usuario');
        }
        else{
            res.redirect('/usuarios-admin');
        }
        return next();
    }
        res.redirect('/');
});

//* -------------------------------------- *//

// Apartado de USUARIOS

router.get('/usuarios-admin', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    conn.query('SELECT * FROM solicitud_deportiva', (err, solicitud) => {
        if (err) {
            res.json(err);
        }
        res.render('admin-user', {
            data: solicitud
        });
    });
});

router.get('/eliminar/:id_solicitud', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_solicitud} = req.params;
        conn.query('DELETE FROM solicitud_deportiva WHERE id_solicitud = ?', [id_solicitud], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/usuarios-admin');
    });
});

router.get('/aceptar-usuario/:id_solicitud', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_solicitud } = req.params;
        conn.query("UPDATE solicitud_deportiva SET estado_solicitud  = 1 WHERE id_solicitud = ?", [id_solicitud], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/usuarios-admin');
    });
});

// Fin apartado de USUARIOS

// Apartado de ATRACTIVOS REGIONALES

router.get('/talleres-admin', (req,res,next) => {
    
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    conn.query('SELECT * FROM actividades', (err, talleres) => {
        if (err) {
            res.json(err);
        }
        res.render('atractivos-reg', {
            data: talleres
        });
    });
});


router.post('/agregar-atractivo', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    let data = Object.assign({},req.body);
    let user = req.user;
    console.log(data);
    
    conn.query('INSERT INTO actividades set ?', {   
        nombre_actividad: data.titulo,
        rut_responsable: data.rut,
        fecha_dia: 1,
        fecha_mes: 1,
        fecha_anio: 1999,
        descripcion: "",
        area: data.area,
        direccion: data.direccion,
        cupos: data.cupos,
        fecha_termino_dia: 1,
        fecha_termino_mes: 1,
        fecha_termino_anio: 1999,
        modalidad: data.modalidad,
        requisitos: data.requisitos,
        img: req.file.filename
    }, (err, resp) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/talleres-admin');
    });
});

router.get('/eliminar-atractivo-reg/:id_atractivo', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_atractivo } = req.params;
        conn.query('DELETE FROM atractivo_admin WHERE id_atractivo = ?', [id_atractivo], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/talleres-admin');
    });
});

router.get('/modificar-atractivo-reg/:id_atractivo', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_atractivo } = req.params;
        conn.query('SELECT * FROM atractivo_admin WHERE id_atractivo = ?', [id_atractivo], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.render('mod-atractivos-reg', {
            data: rows[0]
        });
    });
});

router.post('/modificar-atractivo-reg/:id_atractivo', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_atractivo } = req.params;
        const newAtractivo = Object.assign({},req.body)
        conn.query('UPDATE atractivo_admin set ? WHERE id_atractivo = ?', [newAtractivo, id_atractivo], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/atractivos-regionales');
    });
});

// Fin apartado de ATRACTIVOS REGIONALES

/* -------------------------------------- */


module.exports = router;