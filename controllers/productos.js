const { response } = require('express');
const { Producto } = require('../models')

// obtenerProducto - paginado - total - populate
const obtenerProductos = async(req = request, res = response) => {
  
    //  const {q, nombre='No enviado', apikey, page=1, limit} = req.query;
      const { limite = 5, desde = 0 } = req.query;
      const query = {estado: true}
      
      const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
          .populate('usuario', 'nombre')
          .populate('categoria', 'nombre')
          .skip(Number(desde))
          .limit(Number(limite))
      ])
  
      res.json({
          total,
          productos
      });
    }
  
// obtenerCategoria - populate {}
const obtenerProductoId = async(req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');


    res.json({
        producto
    });
  }



const crearProducto = async( req, res = response ) => {

  
  const { estado, usuario,  ...body} = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe`
    });

    }
    console.log(body);
    // Generar la data a guardar
    const data = {
        ...body,
        nombre:  req.body.nombre.toUpperCase(),
        usuario: req.usuario._id

    }

    const producto = new Producto( data );
    
    await producto.save();

    res.status(201).json(producto);

}

// actualizarProducto
const actualizarProducto = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, categoria, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;
    resto.categoria = req.categoria._id;

    const producto = await Producto.findByIdAndUpdate( id, resto, { new: true });
    
    res.json(producto);
  }

//borrarProducto - estado : false
const borrarProducto = async(req, res = response) => {

    const { id } = req.params;

       
    //Eliminación física
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Eliminación lógica
    const producto = await Producto.findByIdAndUpdate( id , {estado: false}, { new: true } );


    res.json({
        producto
    });
  }



module.exports = {
    crearProducto,
    obtenerProductos,
    borrarProducto,
    obtenerProductoId,
    actualizarProducto
}