// const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../librerias/generar-jwt');
const { googleVerify } = require('../librerias/google-verify');
const { json } = require('body-parser');

const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try{

        // Verificar si el mail existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario){
            return res.status(400).json({
                msg: ' Usuario / Password no son correctos -- correo '
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);




        // Si el usuario está activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: ' Usuario / Password no son correctos - estado: false '
            });
        }


        // // Verificar la contraseña
        const validPassword =  bcryptjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg: ' Usuario / Password no son correctos - Password '
            });
        }

        //Generar el JWT

        res.json({
            usuario,
            token
        })


    } catch (error)
    {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }
}

const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const {correo, nombre, img} = await googleVerify( id_token );
        
        
        let usuario = await Usuario.findOne({ correo });
        

        if ( !usuario ) {

            const data = {
                nombre,
                correo,
                rol: "USER_ROLE",
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );

            await usuario.save();
        } 

        //El usuario está en la BD?

        
        if ( !usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
  
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );
        

        res.json({
            usuario,
            token
            
            
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,

            msg: 'El token no se pudo verificar',
            error
        })
    }

}



module.exports = {
    login,
    googleSignIn
}