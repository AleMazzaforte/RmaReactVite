import express from 'express';
import cliente from '../controladores/rmaController.js';
import { postLogin } from '../controladores/loginController.js';

const router = express.Router();

router.post('/login', postLogin);
// Ruta para listar clientes
router.get('/buscarCliente', cliente.getListarClientesRma);

export default router;
