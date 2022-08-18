const { Router } = require('express');
const {check} = require('express-validator');

const bodyParser = require('body-parser');
const { usuariosGet, usuariosPatch, usuariosPut, usuariosDelete, usuariosPost, obtenerUsuarioId } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../librerias/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares');

const router = Router();
const jsonParser = bodyParser.json();



    router.get('/',  usuariosGet);

    // Obtener Usuario por id- publico
    router.get('/:id', [
        jsonParser,
        check('id', 'No es un ID de Mongo válido').isMongoId(),
    //  check('id').custom( existeCategoria ),
        validarCampos
    ], obtenerUsuarioId );

    router.put('/:id', [
        jsonParser,
        check('id', 'No es un ID válido').isMongoId(),
       // check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos
        ] , usuariosPut);    

    router.post('/', [
        jsonParser,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password tiene que ser de 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El corero no es válido').isEmail(),
        //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', ' USER_ROLE']),   
        check('rol').custom(esRoleValido),
       check('correo').custom(emailExiste),

        validarCampos     
                    ], usuariosPost);   

    router.patch('/',  usuariosPatch);   
     
    router.delete('/:id',  [
        jsonParser,
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
       // check('id').custom(existeUsuarioPorId),
        validarCampos
        ], usuariosDelete);    


module.exports = router;


// comentario prueba git