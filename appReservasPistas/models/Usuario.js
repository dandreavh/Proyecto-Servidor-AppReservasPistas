const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Para la encriptación del password
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const UsuarioSchema = new Schema({
    dni: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    // quizá se puede tratar como un documento embebido?
    direccion: {
        type: String,
        required: true
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    federado: {
        type: Boolean
    },
    rol: {
        type: String,
        enum: ['administrados', 'deportista'],
        default: 'deportista'
    }
});

UsuarioSchema.pre('save', function(next) {
    let usuario = this;
    // solo aplica una función hash al password si ha sido modificado (o es nuevo)
    if (!usuario.isModified('password ')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    // aplica una función hash al password usando la nueva salt
    bcrypt.hash(usuario.password, salt, function(err, hash) {
    if (err) return next(err);
    // sobrescribe el password escrito con el “hasheado”
    usuario.password = hash;
    next();
    });
    });
    });
    UsuarioSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err,
    isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
    });
    };
    module.exports = mongoose.model('Usuario', UsuarioSchema);