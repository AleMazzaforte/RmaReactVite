const express = require('express');
const router = express.Router();
const cliente = require('../controladores/rmaController');
const { postLogin, authenticateToken } = require('../controladores/loginController');

router.post('/login', postLogin)
//Ruta para listar clientes 
router.get('/buscarCliente',  cliente.getListarClientesRma);

module.exports = router;