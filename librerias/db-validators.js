
const Usuario = require('../models/usuario');
const Role = require('../models/role');

const esRoleValido =  async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`${rol} No esta en la BD`);
    }

}

const emailExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`${correo} ya existe!`);

}

}


const existeUsuarioPorId = async( id  ) => {

    const existeUsuario = await Usuario.findById({id});
    if (!existeUsuario) {
        throw new Error(`El id  ${ id } no existe!`);

}

}

module.exports =  {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
    
}