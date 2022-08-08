const { Router } = require('express');
const {check} = require('express-validator');
const { existeCategoria } = require('../librerias/db-validators');

const bodyParser = require('body-parser');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearCategoria, 
        obtenerCategorias, 
        borrarCategoria, 
        obtenerCategoriaId, 
        actualizarCategoria } = require('../controllers/categorias');



const router = Router();
const jsonParser = bodyParser.json();
/**
 * {{url}}/api/categorias
 */


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);


// Obtener una categoria por id- publico
router.get('/:id', [
    jsonParser,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
  //  check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoriaId );

// crear categorias - privado - cualquier persona con un toke vàlido
router.post('/', [ 
    jsonParser,
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
 ], crearCategoria );


// Actualizar un registro por id - privado - cualquier persona con un toke vàlido
router.put('/:id', [
    jsonParser,
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria);


// borrar una categoria  - solo ADMIN - Marcar inactivo
router.delete('/:id', [
    jsonParser,
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
    
], borrarCategoria);

module.exports = router;
