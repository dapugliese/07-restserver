
const { Usuario, Role, Categoria } = require('../models');


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


const existeCategoria = async( id  ) => {

    const existeCategoria = await Categoria.findById({id});
    if (!existeCategoria) {
        throw new Error(`El id de categoría ${ id } no existe!`);

}

}


const existeProducto = async( id  ) => {

    const existeProducto = await Producto.findById({id});
    if (!existeProducto) {
        throw new Error(`El id de producto ${ id } no existe!`);
    }
}


const coleccionesPermitidas = ( coleccion = '', colecciones = []  ) => {

    const incluida = colecciones.includes( coleccion );
    if  (!incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida: ${ colecciones}`);
    }

    return true;
}
module.exports =  {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
    
}