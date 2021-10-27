const { response } = require('express');

const validarRoleAdmin = ( req, res = response, next ) => {

    if(!req.usuarioAutenticado){
        return res.status(500).json(
            {
                msg: 'se requiere validar el role sin validar el token primero'
            }
        )
    }
    const { rol, nombre} = req.usuarioAutenticado;
    if ( rol !== 'ADMIN_ROLE'){
        return res.status(401).json(
            {
                msg: `el usuario ${ nombre } no es administrador - no tiene permisos`
            }
        )
    }
    next();
}

const tieneRoles = ( ...roles ) =>{

    return ( req, res = response, next ) =>{
        
        if(!req.usuarioAutenticado){
            return res.status(500).json(
                {
                    msg: 'se requiere TENER UN role  validO el token primero'
                }
            )
        }

        if( !roles.includes( req.usuarioAutenticado.rol )){
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles ${ roles}`
            })
        }

        next();
    }

}

module.exports = {
    validarRoleAdmin,
    tieneRoles}