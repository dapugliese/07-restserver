const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../librerias/generar-jwt');

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


module.exports = {
    login
}