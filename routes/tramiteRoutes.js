const express = require('express');
const router = express.Router();

const tramiteController = require('../controllers/tramiteController');

router.get('/', tramiteController.tramite_getAll);
router.get('/:tramiteId', tramiteController.tramite_getOne);
router.post('/', tramiteController.tramite_create);
router.delete('/:tramiteId', tramiteController.tramite_delete);

module.exports = router;