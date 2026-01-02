const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration } = require('../middleware/validation');

router.get('/register', authController.getRegister);
router.post('/register', validateRegistration, authController.postRegister);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);

module.exports = router;