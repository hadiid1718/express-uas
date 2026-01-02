const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');

router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);

router.get('/dashboard', isAdmin, adminController.getDashboard);
router.get('/applications', isAdmin, adminController.getApplications);
router.post('/generate-merit', isAdmin, adminController.generateMeritList);
router.get('/merit-list', isAdmin, adminController.getMeritList);

router.get('/logout', adminController.logout);

module.exports = router;