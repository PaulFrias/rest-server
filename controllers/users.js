const { response } = require('express')


const usuariosGet = (req, res = response) => {

    const {edad, nombre, apikey = 'no apikey'} = req.query;

    res.status(201).json({
        msg: 'peticion get desde controlador',
        nombre,
        edad,
        apikey    
    })
};

const usuariosPost  = (req, res = response) => {

    const {nombre, edad} = req.body; 


    res.json({
        msg: 'peticion post desde controlador',    
        nombre, edad
    })
};

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.status(400).json({
        msg: 'peticion put desde controlador',
        id    
    })
};

const usuariosDelete= (req, res = response) => {
    res.status(201).json({
        msg: 'peticion delete desde controlador'    
    })
};

const usuariosPatch = (req, res = response) => {
    res.status(201).json({
        msg: 'peticion patch desde controlador'    
    })
};

   

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch

}