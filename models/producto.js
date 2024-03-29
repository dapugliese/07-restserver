
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({


    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true

    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },    
    precio: {
        type: Number,
        default: 0,
    },

    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }

}, {autoIndex: false});


ProductoSchema.methods.toJSON = function() {
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}


module.exports =  model('Producto', ProductoSchema)