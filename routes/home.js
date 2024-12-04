var express = require('express');
var router = express.Router();
var conexion = require('../database');


router.get('/listaUsuarios', function(req, res, next) {    
    var query = 'SELECT * FROM users;';

    conexion.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la peticion'
            });
        } else {
            console.log(results);
            res.status(200).send({
                data: results[0].totales,
                message: 'Lista de usuarios'
            });
        }
    });
});


module.exports = router;