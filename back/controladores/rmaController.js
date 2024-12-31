import dotenv from 'dotenv';
import { conn } from '../bd/bd.js';
import events from 'events';
events.EventEmitter.defaultMaxListeners = 15;


dotenv.config();

export default {
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
  
