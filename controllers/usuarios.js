const { response, request } = require('express');

 const usuariosGet = (req = request, res = response) => {
    const {q, nombre='No enviado', apikey, page=1, limit} = req.query;
    
    res.json({
        msg: 'get Api - Controlador',
        q, 
        nombre, 
        apikey, 
        page, 
        limit
    });
  }

  const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;
    
    res.json({
        msg: 'post Api - Controlador',
        nombre,
        edad
        
    });
  }

  const usuariosPut = (req, res = response) => {

    const id = req.params.id;
    
    res.json({
        msg: 'put Api - Controlador',
        id
    });
  }

  const usuariosDelete = (req, res = response) => {
    
    res.json({
        msg: 'delete Api - Controlador'
    });
  }

  const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'get patch - Controlador'
    });
  }
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}