const { response, request } = require('express');
const bcryptjs = require('bcryptjs');



const Usuario = require('../models/usuario');



// Crear Usuarios
  const usuariosPost =  async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(usuario.password, salt);

    // Guardar en BD
    
    await usuario.save();

    res.json({
        
        usuario
        
    });
  }


    //Obtener usuarios
    const usuariosGet = async(req = request, res = response) => {
  
      //  const {q, nombre='No enviado', apikey, page=1, limit} = req.query;
        const {limite = 5, desde = 0 } = req.query;
        const query = {estado: true}
        
        const [total, usuarios] = await Promise.all([
          Usuario.countDocuments(query),
          Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
        ])
    
        res.json({
            total,
            usuarios
        });
      }

  //Obtener usuarios por Id
  const obtenerUsuarioId = async(req = request, res = response) => {
  
      const { id } = req.params;

      const usuario = await Usuario.findById( id );
  
      res.json({
         usuario
      });
    }

  //Actualizar Usuarios

  const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if ( password ) {
          // Encriptar la contraseña
          const salt = bcryptjs.genSaltSync();
          resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );



    
    res.json(usuario);
  }




  const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

       
    //Eliminación física
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Eliminación lógica
    const usuario = await Usuario.findByIdAndUpdate( id , {estado: false} );


    res.json({
        usuario
    });
  }

  const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'get patch - Controlador'
        
    });
  }
module.exports = {
    usuariosGet,
    obtenerUsuarioId,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}