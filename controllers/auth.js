const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/genera-jwt');





const login = async( req, res = response) =>{

    const { correo, password } = req.body;

    try {

        //verificar correo existe
        const existe = await Usuario.findOne({ correo });
        if( !existe ){
            return res.status(400).json({
                msg: `El correo ${ correo } no esta registrado`
            })
        }

        //verificar usuario activo

        if( !existe.estado ){
            return res.status(400).json({
                msg: `El Usuario no esta activo`
            })
        }

        //verificar contrasena
        const validarPassword = bcryptjs.compareSync( password, existe.password );
        if( !validarPassword ){
            return res.status(400).json({
                msg: `El Password para el correo ${ correo } no es correcto`
            })
        }

        //generar JWT
        const token = await generaJWT( existe.id );


        //entro correctamente
        res.json({
            msg: 'Login ok',
            existe,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            msg: 'algo salio mal, hable con el admin'
        })
    }

    

}


module.exports = {
    login
}