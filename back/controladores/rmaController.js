import dotenv from 'dotenv';
import { conn } from '../bd/bd.js';
import events from 'events';
events.EventEmitter.defaultMaxListeners = 15;

dotenv.config();

const clienteController = {
    getListarClientesRma: async (req, res) => {
      try { 
        const [clientes] = await conn.query('SELECT id, nombre FROM clientes');
        res.json(clientes);  // Retorna los clientes en formato JSON
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar los clientes' });
      }
    }
};

const productosGeneralController = {
    getListarProductos: async (req, res) => {
      const query = 'SELECT id, sku, descripcion, marca, rubro FROM productos';
      let connection;

      try {
          // Obtiene una conexión del pool
          connection = await conn.getConnection();
          const [results] = await connection.query(query);
          res.json(results);
      } catch (error) {
          console.error('Error al listar productos:', error);
          res.status(500).send('Error al listar productos');
      } finally {
          if (connection) {
              connection.release();
          }
      }
    }
};

export { clienteController, productosGeneralController };

