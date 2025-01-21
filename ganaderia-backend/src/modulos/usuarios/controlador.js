const TABLA = 'usuarios'

const auth = require('../auth');
module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if(!db){

        db = require('../../DB/mysql');

    }

    function todos() {
        return db.todos(TABLA);
    }

    function uno(id) {
        return db.uno(TABLA, id);
    }

    function eliminar(body) {
        return db.eliminar(TABLA, body);
    }

    async function agregar(body) {
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            estado: body.estado,
        }
        const respuesta = await db.agregar(TABLA, usuario);
        
        var insertId = 0;

        if(body.id == 0){
            insertId = respuesta.insertId;
        }else{
            insertId = body.id;
        }
        var rep2 = '';
        if(body.usuario || body.password){
          rep2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password,
        })

        }

        return rep2;
    }

    return {

        todos,
        uno,
        eliminar,
        agregar

    }


}