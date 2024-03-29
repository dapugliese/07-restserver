const { response } = require('express');
const { Categoria } = require('../models')

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req = request, res = response) => {
  
    //  const {q, nombre='No enviado', apikey, page=1, limit} = req.query;
      const {limite = 5, desde = 0 } = req.query;
      const query = {estado: true}
      
      const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
          .populate('usuario', 'nombre')
          .limit(Number(limite))
          .skip(Number(desde))
      ])
  
      res.json({
          total,
          categorias
      });
    }
  
// obtenerCategoria - populate {}
const obtenerCategoriaId = async(req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id )
                                .populate('usuario', 'nombre');


    res.json({
        categoria
    });
  }



const crearCategoria = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `la categoria ${ categoriaDB.nombre } ya existe`
    });

    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    
    await categoria.save();

    res.status(201).json(categoria);

}

// actualizarCategoria
const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, resto, { new: true });
    
    res.json(categoria);
  }

//borrarCategoria - estado : false
const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;

       
    //Eliminación física
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Eliminación lógica
    const categoria = await Categoria.findByIdAndUpdate( id , {estado: false}, { new: true } );


    res.json({
        categoria
    });
  }



module.exports = {
    crearCategoria,
    obtenerCategorias,
    borrarCategoria,
    obtenerCategoriaId,
    actualizarCategoria
}