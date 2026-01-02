const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { isAuthenticated } = require('../middleware/auth');
const { validateApplication } = require('../middleware/validation');

router.get('/dashboard', isAuthenticated, studentController.getDashboard);
router.get('/apply', isAuthenticated, studentController.getApply);
router.post('/apply', isAuthenticated, validateApplication, studentController.postApply);
router.get('/merit-list', isAuthenticated, studentController.getMeritList);

module.exports = router;