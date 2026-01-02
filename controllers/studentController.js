const Application = require('../models/Application');

exports.getDashboard = async (req, res) => {
  try {
    const application = await Application.findOne({ student: req.session.studentId });
    res.render('student/dashboard', {
      title: 'Student Dashboard',
      studentName: req.session.studentName,
      application,
      error: req.flash('error'),
      success: req.flash('success'),
      isAdmin: undefined
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/student/dashboard');
  }
};

exports.getApply = async (req, res) => {
  try {
    const application = await Application.findOne({ student: req.session.studentId });
    res.render('student/apply', {
      title: 'Apply for Admission',
      application,
      error: req.flash('error'),
      success: req.flash('success'),
      studentName: req.session.studentName,
      isAdmin: undefined
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/student/dashboard');
  }
};

exports.postApply = async (req, res) => {
  try {
    const { matricMarks, intermediateMarks, program } = req.body;
    
    const existingApplication = await Application.findOne({ student: req.session.studentId });
    
    if (existingApplication) {
      existingApplication.matricMarks = matricMarks;
      existingApplication.intermediateMarks = intermediateMarks;
      existingApplication.program = program;
      await existingApplication.save();
      req.flash('success', 'Application updated successfully!');
    } else {
      await Application.create({
        student: req.session.studentId,
        matricMarks,
        intermediateMarks,
        program
      });
      req.flash('success', 'Application submitted successfully!');
    }
    
    res.redirect('/student/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/student/apply');
  }
};

exports.getMeritList = async (req, res) => {
  try {
    const applications = await Application.find({ status: { $ne: 'Pending' } })
      .populate('student', 'name email')
      .sort({ meritScore: -1 });
    
    const myApplication = await Application.findOne({ student: req.session.studentId })
      .populate('student', 'name email');
    
    res.render('student/merit-list', {
      title: 'Merit List',
      applications,
      myApplication,
      error: req.flash('error'),
      success: req.flash('success'),
      studentName: req.session.studentName,
      isAdmin: undefined
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/student/dashboard');
  }
};