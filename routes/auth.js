const { Router } = require('express');
const {check} = require('express-validator');

const bodyParser = require('body-parser');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignIn } = require('../controllers/auth');


const router = Router();
const jsonParser = bodyParser.json();



router.post('/login', [
    jsonParser,
    check('correo', 'El corero es obligatorio o no es válido').isEmail(),
    check('password', 'La contraseña es  obligatoria').notEmpty(),
    validarCampos     
],  login);

router.post('/google', [
    jsonParser,
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos     
],  googleSignIn);



    module.exports = router;
