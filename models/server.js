const express = require('express')
var cors = require('cors')


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.routesPath = '/api/usuarios';

        //middleware
        this.middleware();

        //rutas de mi aplicacion
        this.routes();

    }

    middleware(){

        // cors
        this.app.use( cors() );

        //lectura y parseo del body
        this.app.use( express.json() );

        //directorio public
        this.app.use( express.static('public'));

        

    }

    routes(){
        
        this.app.use(this.routesPath, require('../routes/users'))

    }

    listen(){
        this.app.listen(this.port,() => {
            console.log('aplicacion corriendo en el puerto: ', this.port)
        })
    }

}

module.exports = Server