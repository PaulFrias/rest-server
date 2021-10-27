const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next) =>{

    const token = req.header( 'x-token' );

    if( !token ){
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const usuarioAutenticado = await Usuario.findById( uid );

        //verificar si el uid tiene estado true
        if( !usuarioAutenticado ){
            res.status(401).json({
                msg :'token no valido - usuario no existe' 
            })
        }

        if( !usuarioAutenticado.estado ){
            res.status(401).json({
                msg :'token no valido - estado false' 
            })
        }

        req.usuarioAutenticado = usuarioAutenticado;

        //req.uid = uid;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json( {
            msg :'token no valido' 
        })
    }
      

}

module.exports = {
    validarJWT
}