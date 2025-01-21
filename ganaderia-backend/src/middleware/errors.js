function error(mensaje, code) {
    let e = new Error(mensaje);
    
    if (code) {
        e.statussCode = code;
    }
    return e;
}

module.exports = error;