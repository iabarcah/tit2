const express = require('express');
const router = express.Router();
const conn = require('../database');
const multer = require('multer');
const path = require('path');

//Principal del user emprendedor
router.get('/mis-servicios', (req, res,next) => {
    //a
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}, (req, res) => {
    conn.query('SELECT * FROM servicio where correo = ?', [req.user.correo], (err, servicios) => {
        if (err) {
            res.json(err);
        }else{
        conn.query('SELECT * FROM categoria', (err, categorias) => {
            conn.query('SELECT * FROM subcategoria', (err, subcategorias) => {
                if (err) {
                    res.json(err);
                }
                res.render('user.ejs', {
                    usuario: req.user,
                    data: servicios,
                    datacat: categorias,
                    dataSubcategoria: subcategorias
                });
            });
        });
        }
    });
});

// Registro de usuario
router.post('/registro', (req,res,next) => {
    conn.query('INSERT INTO usuario set ?', [req.body], (err, resp) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/');
    });
});

// Agregar servicio emprendedor
router.post('/agregar-servicio-emprendedor',(req, res, next) => {
    
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{

    let data = Object.assign({},req.body);
    if(data.nombre_subcat == 'null') data.nombre_subcat = null;
        
    conn.query('INSERT INTO servicio set ? ', {
        titulo: data.titulo,
        descripcion: data.descripcion,
        geo_local: data.geo_local,
        nombre_cat: data.nombre_cat,
        nombre_subcat: data.nombre_subcat,
        correo: req.user.correo,
        contacto_correo: data.contacto_correo,
        telefono: data.contacto_tel,
        img: req.file.filename,
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
        web: data.web,
        servicio_admin: false,
        solicitud: false
    }, (err, customer) => {
        res.redirect('/mis-servicios');
    });
});

// Cancela solicitud el emprendedor
router.get('/cancelar-servicio-emp/:id_servicio', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_servicio } = req.params;
        conn.query('DELETE FROM servicio WHERE id_servicio = ?', [id_servicio], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/mis-servicios');
    });
});

// enviamos el servicio a la vista modificar servicio emp
router.get('/modificar-servicio-emp/:id_servicio', (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}, (req, res) => {
    const { id_servicio } = req.params;

    conn.query('SELECT * FROM servicio WHERE id_servicio = ?', [id_servicio], (err, rows) => {
        conn.query('SELECT * FROM categoria', (err, categorias) => {
            conn.query('SELECT * FROM subcategoria', (err, subcategorias) => {
                res.render('mod-servicios-emp', {
                    usuario: req.user,
                    data: rows[0],
                    datacat: categorias,
                    datasubcat: subcategorias
                });
            });
        });
    });
});

// UPDATE de la modificacion del servicio emprendedor
router.post('/modificar-servicio-emp/:id_servicio', (req, res, next) => {
    
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        
        const { id_servicio } = req.params;
        const solicitud = { solicitud: 0};
        const newServicio = Object.assign(req.body,solicitud);
        if(newServicio.nombre_subcat === "null") newServicio.nombre_subcat = null;
        conn.query('UPDATE servicio set ? WHERE id_servicio = ?', [newServicio, id_servicio], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/mis-servicios');
    });
});


// DELETE del servicio del emprendedor
router.get('/eliminar-servicio/:id_servicio', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_servicio } = req.params;
        conn.query('DELETE FROM servicio WHERE id_servicio = ?', [id_servicio], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/mis-servicios');
    });
});

module.exports = router;