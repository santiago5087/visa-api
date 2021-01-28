const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAdminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('UserAdmin', userAdminSchema);