let mysql = require('mysql');


let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tit1'
});

conn.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('CONEXIÓN EXITOSA');
    }

});

module.exports = conn;
