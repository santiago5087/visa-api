const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./models/user');

let getToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '8h' });
}

let verifyUser = passport.authenticate('jwt', { session: false });

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
  User.findOne({ email: username })
    .then(user => {
      if(!user) return done(null, false, { msg: 'El correo ingresado no existe' })

      bcrypt.compare(password, user.password)
        .then(same => {
          if(same) return done(null, user);
          else return done(null, false, { msg: 'Contraseña ingresada inválida' });
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  User.findOne({ email })
    .then(user => {
      done(null, user);
    });
});

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
  console.log("jwt_payload", jwt_payload);
  User.findOne({ email: jwt_payload.email })
    .then(user => {
      if(!user) return done(null, false, { msg: 'El correo ingresado no existe' });

      return done(null, user);
    })
    .catch(err => done(err, false));
  })
);

module.exports = {
  getToken,
  verifyUser,
  passport
}