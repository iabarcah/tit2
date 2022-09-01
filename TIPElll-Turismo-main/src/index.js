const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const PassportLocal = require('passport-local').Strategy;
const multer = require('multer');
const { v4: uuid_v4 } = require('uuid');

// Intializations
const app = express();
const conn = require('./database');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'static')));

//multer
const storage = multer.diskStorage({
     destination: path.join(__dirname, 'static/img'),
     filename: (req, file, cb) => {
          cb(null, uuid_v4() + path.extname(file.originalname).toLowerCase());
     }
});

app.use(multer({
     storage,
     limits: {fileSize: 10000000},
     dest: path.join(__dirname, 'static/img'),
     fileFilter: (req,file,cb) =>{
          const filetypes = /jpeg|jpg|png/;
          const mimetype = filetypes.test(file.mimetype);
          const extname = filetypes.test(path.extname(file.originalname));
          if (mimetype && extname){
               return cb(null,true);
          }
          cb("Error: Archivo invalido, solo se permite subir archivos en formato JPEG, JPG o PNG");
     }
}).single('img'));

//  Middlewares
app.use(express.json()); //Transfomar a formato JSON
app.use(bodyParser.urlencoded({
     extended: true
}));
app.use(flash());
app.use(cookieParser('el secreto'));
app.use(session({
     secret: 'el secreto',
     resave: true, //la sesión se guardar cada vez
     saveUninitialized: true    //Si inicializamos y no le guardamos nada igual va a guardar
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function (username, password, done) {
     //console.log(username)// callback with email and password from our form
     conn.query("SELECT * FROM `usuario` WHERE `nombre_usuario` = '" + username + "' and estado = 1", function (err, rows) {
          if (err) {

               return done(err);
          }
          if (!rows.length) {

               return done(null, false);
          }
          if (!(rows[0].contrasenia == password)) {

               return done(null, false);
          }
          //console.log(rows[0].password + " y " + password);
          //console.log(rows[0].rut + " y " + username)

          return done(null, { correo: rows[0].nombre_usuario, name: rows[0].rut, tipo: rows[0].tipo, estado: rows[0].estado });

     });
}));

//Serialización, parar la información para identificar usuario en passport
passport.serializeUser(function (user, done) {
     //     console.log(user)
     done(null, user.correo);
});

//Deserializacion
passport.deserializeUser(function (correo, done) {

     conn.query("SELECT * FROM `usuario` WHERE nombre_usuario = '" + correo + "'", function (err, rows) {
          //     console.log(rows[0])
          done(null, rows[0]);
     })
});

//  Rutas
app.use('/', require('./routes/home'));         // pág principal
app.use('/', require('./routes/user'));         // pág usuario
app.use('/', require('./routes/admin'));        // pág administrador
app.use('/', require('./routes/authentication')); // login - sign up

//  Iniciando el servidor
app.listen(app.get('port'), () => {
     console.log('Servidor en puerto ',app.get('port'))
});