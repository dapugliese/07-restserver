const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const  fileUpload = require('express-fileupload');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:           '/api/auth',
            buscar:           '/api/buscar',
            categorias:     '/api/categorias',
            usuariosPath:   '/api/usuarios',
            productos:   '/api/productos',
            uploads:   '/api/uploads'
        }



        //Conectar a BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Lectura y parseo del body
        this.app.use( express.static('public'));

        //Rutas de mi aplicación
        this.routes();
        
    }

    async conectarDB() {
        await dbConnection();
    }
    
    middlewares() {

        // CORS
        this.app.use (cors());

        //Lectura y parseo del boy
        this.app.use ( express.json() );


        // Directorio Público
        this.app.use(express.static('public'))

        // Fileupload - Carga
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {


        this.app.use(this.paths.auth, require('../routes/auth'));        
        this.app.use(this.paths.buscar, require('../routes/buscar'));                
        this.app.use(this.paths.categorias, require('../routes/categorias'));        
        this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));        
        this.app.use(this.paths.productos, require('../routes/productos'));        
        this.app.use(this.paths.uploads, require('../routes/uploads'));        

        
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en puerto ${this.port}`)
        })
    }


    


}

module.exports = Server;