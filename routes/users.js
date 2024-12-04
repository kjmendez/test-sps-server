var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
var conexion = require('../database');

/* GET list users*/
router.get('/', function(req, res, next) {
    var query = 'SELECT * FROM users;';
    conexion.query(query, function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).send({
          error: err,
          message: 'Error al realizar la petición'
        });
      }
      else{
        res.status(200).send({
          data: rows,
          message: 'Lista de usuarios'
        })
      }
    });
  });

  /* add users*/
router.post('/store', function(req, res, next) {
    const {  correo, nombres, type, password } = req.body;
    var query = `INSERT INTO users (email, nombre, type, password) VALUES  ('${correo}', '${nombres}', '${type}', '${password}');`;
    conexion.query(query, function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).send({
          error: err,
          message: 'Error al realizar la inserción'
        });
      }else{
        res.status(200).send({
          data: rows.insertId,
          message: 'Usuario registrado correctamente'
        });
      }
    });
  });


/* update users*/
router.put('/update/:email', function(req, res, next) {
    const { correo, nombres, type, password } = req.body;
    var query = `UPDATE users SET email  = "${correo}", nombre="${nombres}", type="${type}",  password="${password}" WHERE email =  '${req.params.email}';`;
    conexion.query(query, function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).send({
          error: err,
          message: 'Error al realizar la actualización'
        });
      }else{
        res.status(200).send({
          data: rows,
          message: 'Usuario actualizado correctamente'
        });
      }
    });
  });
  
  /* Delete user*/
  router.delete('/delete/:email', function(req, res, next) {
    var query = `DELETE FROM users WHERE email ='${req.params.email}';`;
    console.log(query);
    conexion.query(query, function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).send({
          error: err,
          message: 'Error al realizar la eliminación'
        });
      }else{
        res.status(200).send({
          data: req.params.id,
          message: 'Producto eliminado correctamente'
        });
      }
    });
  }); 


  module.exports = router;