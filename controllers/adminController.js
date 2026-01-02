const Application = require('../models/Application');

exports.getLogin = (req, res) => {
  res.render('admin/login', {
    title: 'Admin Login',
    error: req.flash('error'),
    studentName: undefined,
    isAdmin: undefined
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.redirect('/admin/dashboard');
  } else {
    req.flash('error', 'Invalid admin credentials');
    res.redirect('/admin/login');
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'Pending' });
    const selectedApplications = await Application.countDocuments({ status: 'Selected' });
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      totalApplications,
      pendingApplications,
      selectedApplications,
      error: req.flash('error'),
      success: req.flash('success'),
      studentName: undefined,
      isAdmin: true
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/admin/dashboard');
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('student', 'name email cnic')
      .sort({ meritScore: -1 });
    
    res.render('admin/applications', {
      title: 'All Applications',
      applications,
      error: req.flash('error'),
      success: req.flash('success'),
      studentName: undefined,
      isAdmin: true
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/admin/dashboard');
  }
};

exports.generateMeritList = async (req, res) => {
  try {
    let { cutoffScore } = req.body;
    cutoffScore = parseFloat(cutoffScore);
    
    // Validate cutoff percentage
    if (cutoffScore < 0 || cutoffScore > 100) {
      req.flash('error', 'Cutoff percentage must be between 0 and 100');
      return res.redirect('/admin/applications');
    }
    
    const applications = await Application.find();
    
    for (let app of applications) {
      if (app.meritScore >= cutoffScore) {
        app.status = 'Selected';
      } else {
        app.status = 'Not Selected';
      }
      await app.save();
    }
    
    req.flash('success', `Merit list generated successfully with ${cutoffScore}% cutoff!`);
    res.redirect('/admin/merit-list');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/admin/applications');
  }
};

exports.getMeritList = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('student', 'name email cnic')
      .sort({ meritScore: -1 });
    
    res.render('admin/merit-list', {
      title: 'Merit List',
      applications,
      error: req.flash('error'),
      success: req.flash('success'),
      studentName: undefined,
      isAdmin: true
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/admin/dashboard');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};