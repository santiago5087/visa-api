const express = require('express');
const router = express.Router();

const auth = require('../authenticate');
const userController = require('../controllers/userController');

router.get('/checkToken', userController.checkJWT);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/changePassword', auth.verifyUser, userController.changePassword);

module.exports = router;