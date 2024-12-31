import express from 'express';
import { clienteController, productosGeneralController } from '../controladores/rmaController.js';
import { postLogin } from '../controladores/loginController.js';

const router = express.Router();

router.post('/login', postLogin);
// Ruta para listar clientes
router.get('/buscarCliente', clienteController.getListarClientesRma);

// Ruta para listar productos
router.get('/buscarProductos', productosGeneralController.getListarProductos);

export default router;
