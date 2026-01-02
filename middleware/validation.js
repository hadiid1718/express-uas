const { body, validationResult } = require('express-validator');

exports.validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('cnic').matches(/^[0-9]{13}$/).withMessage('CNIC must be 13 digits'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array()[0].msg);
      return res.redirect('/auth/register');
    }
    next();
  }
];

exports.validateApplication = [
  body('matricMarks').isInt({ min: 0, max: 1100 }).withMessage('Valid matric marks required (0-1100)'),
  body('intermediateMarks').isInt({ min: 0, max: 1100 }).withMessage('Valid intermediate marks required (0-1100)'),
  body('program').notEmpty().withMessage('Program selection is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array()[0].msg);
      return res.redirect('/student/apply');
    }
    next();
  }
];