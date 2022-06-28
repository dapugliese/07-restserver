const { Router } = require('express');
const bodyParser = require('body-parser');
const { usuariosGet, usuariosPatch, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/usuarios');


const router = Router();
const jsonParser = bodyParser.json();

    router.get('/',  usuariosGet);
    router.put('/:id',  usuariosPut);    
    router.post('/', jsonParser, usuariosPost);    
    router.patch('/',  usuariosPatch);    
    router.delete('/',  usuariosDelete);    


module.exports = router;