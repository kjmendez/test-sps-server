var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var conexion = require('../database');
var jwt = require('jsonwebtoken');


router.post('/login', function(req, res, next) {
    const { correo, password } = req.body;

    var query = `SELECT * FROM users WHERE email = "${correo}";`;
    conexion.query(query, async function (error, results, fields) {
        if(error) {
            console.log(error);
            res.status(500).send({
                error: error,
                message: 'Error al realizar la peticion'
            });
        } else {
            if(results.length == 0) {
                res.status(403).send({
                    message: 'Usuario no encontrado!'
                });
            } else {
                const usuario = results[0];
                //const verifica = await bcrypt.compare(password, usuario.password);
                const verifica = password == usuario.password ? true : false;
                if(!verifica) {
                    res.status(403).send({
                        message: 'Usuario o contraseña incorrectos'
                    });
                } else {
                    const token = jwt.sign({usuario: usuario}, 'secretkey', {expiresIn: '1h'});
                    res.status(200).send({
                        usuario: usuario,
                        token: token
                    });
                }
            }

        }
    })

});






module.exports = router;