const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(db => console.log("Base de datos conectada"))
    .catch(err => console.error(err));