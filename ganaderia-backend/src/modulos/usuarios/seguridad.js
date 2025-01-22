const auth = require('../../auth');

module.exports = function checkAuth(){

    function middleware(req, res, next){
     
        auth.chequearToken.confirmarToken(req);
        next();
    }

    return middleware;
}