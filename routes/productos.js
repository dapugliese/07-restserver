const { Router } = require('express');
const {check} = require('express-validator');
const { existeCategoria, existeProducto } = require('../librerias/db-validators');

const bodyParser = require('body-parser');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearProducto, 
        obtenerProductos, 
        borrarProducto, 
        obtenerProductoId, 
        actualizarProducto } = require('../controllers/productos');



const router = Router();
const jsonParser = bodyParser.json();


// crear producto - privado - cualquier persona con un toke vàlido
router.post('/', [ 
    jsonParser,
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//    check('id').custom( existeCategoria ),    
    validarCampos,
 ], crearProducto );

// Obtener todos los productos - publico
router.get('/', obtenerProductos);


// Obtener una producto por id- publico
router.get('/:id', [
    jsonParser,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    //check('id').custom( existeProducto ),
    validarCampos
], obtenerProductoId );




// Actualizar un registro por id - privado - cualquier persona con un toke vàlido
router.put('/:id', [
    jsonParser,
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('id').custom( existeCategoria ),
    validarCampos
], actualizarProducto);


// borrarun producto  - solo ADMIN - Marcar inactivo
router.delete('/:id', [
    jsonParser,
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
   // check('id').custom( existeProducto ),
    validarCampos
    
], borrarProducto);

module.exports = router;
