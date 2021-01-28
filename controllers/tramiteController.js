const Tramite =  require('../models/tramite');

const tramite_getAll = (req, res, next) => {
Tramite.find({ email: req.user.email })
.then(tramites => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ success: true, tramites });
    })
    .catch(next);
}

const tramite_getOne = (req, res, next) => {
  Tramite.findById(req.params.tramiteId)
    .then(tramite => {
      res.setHeader('Content-Type', 'application/json');
      if(!tramite) res.status(404).json({ success: false, msg: 'Trámite no econtrado!' });
      res.status(200).json({ success: true, tramite });      
    })
    .catch(next);
}

const tramite_create = (req, res, next) => {
  let newTramite = new Tramite({
    tipoTramite: req.body.tipoTramite,
    tipoVisa: req.body.tipoVisa,
    viajandoPor: req.body.viajandoPor,
    tiempoEstadia: req.body.tiempoEstadia,
    velocidad: req.body.velocidad,
    numeroTramites: req.body.numeroTramites,
    email: req.user.email
  });

  newTramite.save()
    .then(tramite => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ success: true, tramite });
    })
    .catch(next);
}

const tramite_delete = (req, res, next) => {
  Tramite.findByIdAndRemove(req.params.tramiteId)
    .then(tramite => {
      res.setHeader('Content-Type', 'application/json');
      if(!tramite) res.status(404).json({ success: false, msg: 'Trámite no encontrado!' });
      res.status(200).json({ success: true, tramite });
    })
    .catch(next);
}

module.exports = {
  tramite_getAll,
  tramite_getOne,
  tramite_create,
  tramite_delete
}