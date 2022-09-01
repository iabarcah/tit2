const express = require('express');
const router = express.Router();
const conn = require('..');
const passport = require('passport');
const { changeUser } = require('..');

// Inicio sesión
router.post('/login', passport.authenticate('local',{
    failureRedirect: "/",
}), (req,res) => {
    if(req.user.tipo == 'paciente' && req.user.estado == 1){
        res.redirect('/');
    }else if(req.user.tipo == 'admin'){
        res.redirect('/admin');
    }else{
        res.redirect("/logout");
    }
});

// Cerrar sesión
router.get("/logout", function(req, res) {
    req.logout();
    
    res.redirect("/");
});

module.exports = router;