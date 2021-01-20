const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://localhost:27017/visa-bd", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(db => console.log("Base de datos conectada"))
.catch(err => console.error(err));