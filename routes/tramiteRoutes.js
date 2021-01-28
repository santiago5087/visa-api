const express = require('express');
const router = express.Router();

const auth = require('../authenticate');
const tramiteController = require('../controllers/tramiteController');

router.get('/', auth.verifyUser, tramiteController.tramite_getAll);
router.get('/:tramiteId', auth.verifyUser, tramiteController.tramite_getOne);
router.post('/', auth.verifyUser, tramiteController.tramite_create);
router.delete('/:tramiteId', auth.verifyUser, tramiteController.tramite_delete);

module.exports = router;