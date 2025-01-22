const express = require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuesta');

const controlador = require('./index');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);

router.post('/', seguridad(), agregar);

router.put('/', seguridad(), eliminar);



async function todos(req, res, next) {
    try {
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}


async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id)
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }

}

async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body)
        respuesta.success(req, res, ' item eliminado', 200);
    } catch (err) {
        next(err);
    }

}
async function agregar(req, res, next) {
    try {
       
        const resultado = await controlador.agregar(req.body);
        const mensaje = (req.body.id == 0)
            ? 'Item agregado con éxito'
            : 'Item actualizado con éxito';
        const statusCode = (req.body.id == 0) ? 201 : 200;
        respuesta.success(req, res, mensaje, statusCode);
    } catch (err) {

        next(err);
    }
}



module.exports = router;