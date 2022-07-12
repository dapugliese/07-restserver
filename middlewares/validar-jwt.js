const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        //console.log(jwt.verify( token, process.env.SECRETORPRIVATEKEY ));
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            })
        }

        // verificar si el uid tiene estado en true
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            })
        }

        req.usuario = usuario;
        req.uid = uid;

        next();

    } catch (error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })

    }
}

module.exports = {
    validarJWT
}