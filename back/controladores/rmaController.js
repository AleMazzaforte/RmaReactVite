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

const listarMarcas = { 
  getListarMarcas: async (req, res) => { 
    try { 
        const connection = await conn.getConnection(); 
        const [results] = await connection.query('SELECT * FROM marcas'); 
        connection.release(); res.json(results); 
    } catch (error) { 
        console.error('Error al obtener las marcas:', error); 
        res.status(500).send('Error al obtener las marcas'); 
    } 
  }
}

const cargarRma = {
  postAgregarRma: async (req, res) => {
    // Desestructuración de los campos del cuerpo de la solicitud
    let { modelo, cantidad, marca, solicita, opLote, vencimiento, seEntrega, seRecibe, observaciones, nIngreso, nEgreso, idCliente } = req.body;

    // Si los campos opcionales están vacíos, asignarlos como null
    opLote = opLote || null;
    vencimiento = vencimiento || null;
    seEntrega = seEntrega || null;
    seRecibe = seRecibe || null;
    observaciones = observaciones || null;
    nIngreso = nIngreso || null;
    nEgreso = nEgreso || null;

    let connection;
    try {
        connection = await conn.getConnection();
        // Inserción en la base de datos con valores null para los campos opcionales vacíos
        await connection.query(
            'INSERT INTO r_m_a (modelo, cantidad, marca, solicita, opLote, vencimiento, seEntrega, seRecibe, observaciones, nIngreso, nEgreso, idCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [modelo, cantidad, marca, solicita, opLote, vencimiento, seEntrega, seRecibe, observaciones, nIngreso, nEgreso, idCliente]
        );
        res.status(200).json({ message: 'RMA agregado correctamente' });
    } catch (error) {
        console.error('Error al agregar RMA:', error);
        res.status(500).json({ message: 'Error al agregar RMA' });
    } finally {
        if (connection) {
            connection.release();
        }
    }
  }
};

export { 
  clienteController, 
  productosGeneralController,
  listarMarcas,
  cargarRma
};

