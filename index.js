// Suppress deprecation warnings
process.noDeprecation = true;

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hour
}));

// Flash Messages
app.use(flash());

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'University Admission System',
    studentName: undefined,
    isAdmin: undefined
  });
});

app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Page Not Found',
    studentName: undefined,
    isAdmin: undefined
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});