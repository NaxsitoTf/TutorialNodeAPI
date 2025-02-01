const express = require('express'); 
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');


const vacas = require('./modulos/vacas/rutas.js');
const usuarios = require('./modulos/usuarios/rutas.js');
const auth = require('./modulos/auth/rutas.js');

const error = require('./red/errors');
 
const app = express();

//Middleware
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// configuracion 
app.set('port', config.app.port);

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

// rutas 
app.use('/api/vacas', vacas);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);



app.use(error);

module.exports = app;