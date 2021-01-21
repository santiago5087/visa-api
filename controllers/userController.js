const bcrypt = require('bcrypt');
const auth = require('../authenticate');

const User = require('../models/user');

const saltRounds = 10;

let signup = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds).then(passHash => {

    let user = new User({
      email: req.body.email,
      password: passHash,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nacionalidad: req.body.nacionalidad,
      fechaNacimiento: req.body.fechaNacimiento,
      celular: req.body.celular,
      direccion: req.body.direccion,
      codigoPostal: req.body.codigoPostal,
      numeroPasaporte: req.body.numeroPasaporte
    });

    user.save().then(newUser => {
      auth.passport.authenticate('local')(req, res, () => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ success: true, msg: 'Registro exitoso!' });
      });
    }, err => {
      if(err.keyPattern.email) {
        res.status(401).json({
          success: false,
          msg: 'El correo ingresado ya existe, intente con otro'
        }); 
      }
    }).catch(err => {
      res.status(400).json({
        success: false,
        msg: 'Por favor complete todos los campos correctamente e inténtelo de nuevo'
      });
    })
  });
}

let login = (req, res, next) => {
  auth.passport.authenticate('local', { session: false }, (err, user, info) => {
    if(err) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(401).json({ success: false, err });
    }
    if(!user) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(401).json({ success: false, msg: 'Usuario/contraseña incorrecta' });
    }

    // Adjunta los datos del usuario a req.user
    req.logIn(user, (err) => {
      if(err) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).json({ success: false, err });
      }

      let token = auth.getToken(req.user.email);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ success: true, user, token });
    });
  })(req, res, next);
}

module.exports = {
  signup,
  login
}