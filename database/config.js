const mongoose = require('mongoose');

const dbConnection = async () =>{

        try{

            await mongoose.connect( process.env.MONGODB_CNN,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                //useCreateIndex: true,
                //useFindAndModify: false
            } );

            console.log('conexion db exitosa');


        }catch(err){
            console.log(err);
            throw new Error('error inicio base de datos');
        }


}


module.exports = {
    dbConnection
}