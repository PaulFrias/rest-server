const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');



const usuariosGet = async(req, res = response) => {

    //const {edad, nombre, apikey = 'no apikey'} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const condicion = { estado: true};
    
    //const usuarios = await Usuario.find(condicion)
    //    .skip( Number(desde) )
    //    .limit( Number(limite) );

    //const total = await Usuario.countDocuments(condicion);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(condicion),
        Usuario.find(condicion)
            .skip( Number(desde) )
            .limit( Number(limite) )
    ])

    res.json( {
        total,
        usuarios
    });
};

const usuariosPost  = async (req, res = response) => {

    
    const { nombre, correo, password, rol} = req.body; 
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe
    //const existeEmail = await Usuario.findOne({ correo });
    //if( existeEmail ){
    //    return res.status(400).json({
    //        msg: 'Ese correo ya esta registrado'
    //    });
    //}


    //encryptar la contrasena
    const salt = bcryptjs.genSaltSync();//viene por defecto en 10 pero se puede encryptar con un numero mayor
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en db
    await usuario.save();


    res.json( usuario );
};

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();//viene por defecto en 10 pero se puede encryptar con un numero mayor
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario )
};

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //borrado fisico
    //const usuario = await Usuario.findByIdAndDelete( id );

    //actualziar estado del usuario
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );

    //const usuarioAutenticado = req.usuarioAutenticado; usuario que elimino

    res.json( { usuario} );
};

const usuariosPatch = (req, res = response) => {
    res.json( usuario );
};

   

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch

}