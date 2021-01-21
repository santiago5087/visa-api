const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tramiteSchema = new Schema({
  tipoTramite: { type: String, required: true },
  tipoVisa: { type: String, required: true },
  viajandoPor: { type: String, required: true },
  tiempoEstadia: { type: String, required: true },
  velocidad: { type: String, required: true },
  numeroTramites: { type: Number, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Tramite', tramiteSchema);