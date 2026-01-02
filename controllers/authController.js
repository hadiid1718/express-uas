const Student = require('../models/Student');

exports.getRegister = (req, res) => {
  res.render('student/register', {
    title: 'Student Registration',
    error: req.flash('error'),
    success: req.flash('success'),
    studentName: undefined,
    isAdmin: undefined
  });
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, cnic } = req.body;
    
    const existingStudent = await Student.findOne({ $or: [{ email }, { cnic }] });
    if (existingStudent) {
      req.flash('error', 'Email or CNIC already registered');
      return res.redirect('/auth/register');
    }
    
    await Student.create({ name, email, password, cnic });
    req.flash('success', 'Registration successful! Please login.');
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/auth/register');
  }
};

exports.getLogin = (req, res) => {
  res.render('student/login', {
    title: 'Student Login',
    error: req.flash('error'),
    success: req.flash('success')
  });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const student = await Student.findOne({ email });
    if (!student || !(await student.comparePassword(password))) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }
    
    req.session.studentId = student._id;
    req.session.studentName = student.name;
    res.redirect('/student/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};