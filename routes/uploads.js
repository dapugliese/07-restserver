const { Router } = require('express');
const {check} = require('express-validator');

const bodyParser = require('body-parser');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../librerias');


const router = Router();
const jsonParser = bodyParser.json();

router.post( '/' , validarArchivoSubir, cargarArchivo);

router.put( '/:coleccion/:id' , [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c,['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);

router.get( '/:coleccion/:id' , [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c,['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);


module.exports = router;
