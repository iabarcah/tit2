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

/* -------------------------------------- */

// Apartado de SERVICIOS

    // SERVICIOS REGIONALES

    router.get('/servicios-regionales', (req,res,next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
        conn.query('SELECT * FROM servicio where servicio_admin = 1', (err, servicios) => {
            conn.query('SELECT * FROM categoria', (err, categorias) => {
                conn.query('SELECT * FROM subcategoria', (err, subcategorias) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('servicios-reg', {
                        data: servicios,
                        datacat: categorias,
                        dataSubcategoria: subcategorias
                    });
                });
            });
        });
    });

    router.post('/agregar-servicio', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
        let data = Object.assign({},req.body);
        let user = req.user.correo;
   
        if(data.nombre_subcat == 'null') data.nombre_subcat = null;
        

        conn.query('INSERT INTO servicio set ? ', {
            titulo: data.titulo,
            descripcion: data.descripcion,
            geo_local: data.geo_local,
            nombre_cat: data.nombre_cat,
            nombre_subcat: data.nombre_subcat,
            correo: user,
            contacto_correo: data.contacto_correo,
            telefono: data.telefono,
            img: req.file.filename,
            facebook: data.facebook,
            twitter: data.twitter,
            instagram: data.instagram,
            web: data.web,
            servicio_admin: true,
            solicitud: 1
        }, (err, customer) => {
            res.redirect('/servicios-regionales');
        });
    });

    router.get('/eliminar-servicio-reg/:id_servicio', (req, res, next) => {
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
            res.redirect('/servicios-regionales');
        });
    });
    
    router.get('/modificar-servicio-reg/:id_servicio', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
            const { id_servicio } = req.params;
            conn.query('SELECT * FROM servicio WHERE id_servicio = ?', [id_servicio], (err, rows) => {
                conn.query('SELECT * FROM categoria', (err, categorias) => {
                    conn.query('SELECT * FROM subcategoria', (err, subcategorias) => {
                        res.render('mod-servicios-reg', {
                            data: rows[0],
                            datacat: categorias,
                            datasubcat: subcategorias
                        });
                    });
                });
            });
        });
    
    router.post('/modificar-servicio-reg/:id_servicio', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
            const { id_servicio } = req.params;
            const newServicio = Object.assign({},req.body)
            if(newServicio.nombre_subcat === "null") newServicio.nombre_subcat = null;
            
            conn.query('UPDATE servicio set ? WHERE id_servicio = ?', [newServicio, id_servicio], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/servicios-regionales');
        });
    });

    // Fin SERVICIOS REGIONALES

    ///////////////////////////

    // SERVICIOS DE USUARIOS


    router.get('/servicios-usuarios', (req,res,next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
        conn.query('SELECT * FROM servicio WHERE servicio_admin = 0', (err, servicios) => {
            if (err) {
                res.json(err);
            }
            res.render('servicios-user', {
                data: servicios
            });
        });
    });

    router.get('/eliminar-servicio-user/:id_servicio', (req, res, next) => {
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
            res.redirect('/servicios-usuarios');
        });
    });

    router.get('/aceptar-servicio/:id_servicio', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
            const { id_servicio } = req.params;
            conn.query("UPDATE servicio SET solicitud = 1 WHERE id_servicio = ?", [id_servicio], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/servicios-usuarios');
        });
    });
    

    //  Fin SERVICIOS DE USUSARIOS

// Fin apartado de SERVIVCIOS

/* -------------------------------------- */

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
    let user = req.user.correo;
    conn.query('INSERT INTO atractivo_admin set ?', {
        titulo: data.titulo,
        correo: user,
        descripcion: data.descripcion,
        geo_local: data.geo_local,
        telefono: data.telefono,
        img: req.file.filename
    }, (err, resp) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/atractivos-regionales');
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
        res.redirect('/atractivos-regionales');
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

// CATEGORIAS - ADMIN

router.get('/administrar-categorias', (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}, (req, res) => {
    conn.query('SELECT * FROM categoria', (err, resp1) => {
        conn.query('SELECT * FROM subcategoria', (err, resp2) => {
            if (err) {
                res.json(err);
            } else {
                res.render('admin-categorias', {
                    datacat: resp1,
                    datasubcat: resp2
                });
            }
        });
    });
});



router.post('/agregar-categoria', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    let data = Object.assign({},req.body);
    conn.query('INSERT INTO categoria set ?', {
        nombre_cat: data.nombre_cat,
    }, (err, resp) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});


router.get('/eliminar-categoria/:nombre_cat', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { nombre_cat } = req.params;
        conn.query('DELETE FROM categoria WHERE nombre_cat = ?', [nombre_cat], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});

router.post('/modificar-categoria', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const newCus = req.body;
        conn.query('UPDATE categoria set nombre_cat = ? WHERE nombre_cat = ?', [newCus.new_nombre_cat,newCus.nombre_cat], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});

// Sub - categorias

router.post('/agregar-subcategoria', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    let data = Object.assign({},req.body);
    conn.query('INSERT INTO subcategoria set ?', {
        nombre_subcat: data.nombre_subcat,
        nombre_cat: data.nombre_cat
    }, (err, resp) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});

router.get('/eliminar-subcategoria/:parametros', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { parametros } = req.params;
        var arregloParametros = parametros.split('+');
        
        conn.query('DELETE FROM subcategoria WHERE nombre_subcat = ? and nombre_cat = ?', [arregloParametros[1],arregloParametros[0]], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});

router.post('/modificar-subcategoria', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const newCus = req.body;
        conn.query('UPDATE subcategoria set nombre_subcat = ? WHERE nombre_subcat = ? AND nombre_cat = ?', [newCus.new_nombre_subcat,newCus.nombre_subcat, newCus.nombre_cat], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});

// Fin apartado de Categorías - ADMIN


/* -------------------------------------- */

module.exports = router;