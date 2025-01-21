const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: 3305,
}

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log('[db error]', err);
            setTimeout(conMysql, 200)
        } else {
            console.log('DB conectada');
        }

    });

    conexion.on('error', err => {
        console.log('[db err]', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }

    });
}

conMysql();

function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);


        })
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);

        })
    });
}

function agregar(tabla, data) {
    return (data && data.id == 0) ? insertar(tabla, data) : actualizar(tabla, data);
}

function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? `, data, (error, result) => {
            return error ? reject(error) : resolve(result);

        })
    });
}

function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        const campos = Object.keys(data)
            .filter(key => key !== 'id') // Excluir el campo `id`
            .map(key => `${key} = ?`) // Generar las asignaciones `columna = ?`
            .join(', ');

        const valores = Object.values(data).filter((_, index) => Object.keys(data)[index] !== 'id');

        conexion.query(
            `UPDATE ${tabla} SET ${campos} WHERE id = ?`,
            [...valores, data.id], // Pasar los valores de las columnas y el `id`
            (error, result) => {
                return error ? reject(error) : resolve(result);
            }
        );
    });
}


function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result);

        })
    });
}

module.exports = {
    todos,
    uno,
    eliminar,
    agregar,
}
