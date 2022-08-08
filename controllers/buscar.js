 const { response } = require('express');
 const { isValidObjectId } = require("mongoose");
 


 const { Usuario, Categoria, Producto } = require('../models');

 const coleccionesPermitidas = [
    'categorias',
    'usuarios',
    'productos',
    'roles'
 ]

 const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoId = isValidObjectId( termino );

    if ( esMongoId ){
        const usuario = await Usuario.findById( termino );
        res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
        return
    }

    

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
        
     });
     
    res.json({
        results: usuarios
    })

 }


 const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoId = isValidObjectId( termino );

    if ( esMongoId ){
        const categoria = await Categoria.findById( termino );
        res.json({
            results: ( categoria ) ? [ categoria ] : []

        });
        return
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({ 
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
        
     });

    res.json({
        results: categorias
    })

 }


 const buscarProductos = async( termino = '', res = response ) => {

    const esMongoId = isValidObjectId( termino );

    if ( esMongoId ){
        const producto = await Producto.findById( termino )
                        .populate('categoria','nombre');
        res.json({
            results: ( producto ) ? [ producto ] : []
        });
        return
    }

    

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find({ 
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
        
     }).populate('categoria','nombre');
     ;
     
    res.json({
        results: productos
    })

 }

const buscar = (req, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch ( coleccion ) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            
        break;
        case 'categorias':
            buscarCategorias(termino, res);
            
        break;
        case 'productos':
            buscarProductos(termino, res);            
            
        break;
        case 'roles':
            
        break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            })
          
    }

    
}


module.exports = {
    buscar
}