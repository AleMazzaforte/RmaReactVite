require('dotenv').config();
const {conn} = require('../bd/bd');


module.exports = {
   
    getListarClientesRma: async (req, res) => {
        try {
            const [clientes] = await conn.query('SELECT id, nombre FROM clientes');
            res.json(clientes);  // Retorna los clientes en formato JSON
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al listar los clientes' });
        }
    }
    
}