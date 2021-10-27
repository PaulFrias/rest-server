const { Schema, model } = require('mongoose');

const RolSchema = Schema({

    rol:{
        type: String,
        require: [ true, 'el rol es obligatorio' ]
    }


});

module.exports = model( 'Role', RolSchema );