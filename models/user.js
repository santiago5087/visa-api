const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  fechaNacimiento: { type: String, required: true },
  celular: { type: String, required: true },
  direccion: { type: String, required: true },
  codigoPostal: { type: Number, required: true },
  numeroPasaporte: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);