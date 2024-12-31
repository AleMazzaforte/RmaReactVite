require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const rutas = require('./rutas/rutas.js');
const cors = require('cors');

const port = process.env.PORT;
const app = express();



app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Usar las rutas importadas
app.use('/', rutas);

 app.get('/', (req, res) => {
     res.send('Servidor corriendo');
 })

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto:  ${port}`);
})
