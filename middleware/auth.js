exports.isAuthenticated = (req, res, next) => {
  if (req.session.studentId) {
    return next();
  }
  req.flash('error', 'Please login to access this page');
  res.redirect('/auth/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  req.flash('error', 'Unauthorized access');
  res.redirect('/admin/login');
};