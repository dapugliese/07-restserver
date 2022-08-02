const express = require('express')
const cors = require('cors')
const {dbConnection} = require('../database/config')



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:           '/api/auth',
            categorias:     '/api/categorias',
            usuariosPath:   '/api/usuarios',
            productos:   '/api/productos'
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

        // Directorio Público
        this.app.use(express.static('public'))
    }

    routes() {


        this.app.use(this.paths.auth, require('../routes/auth'));        
        this.app.use(this.paths.categorias, require('../routes/categorias'));        
        this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));        
        this.app.use(this.paths.productos, require('../routes/productos'));        

        
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en puerto ${this.port}`)
        })
    }


    


}

module.exports = Server;