# University Admission Management System - Complete Setup Guide

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

---

## Installation Steps

### Step 1: Create Project Directory

```bash
mkdir university-admission-system
cd university-admission-system
```

### Step 2: Initialize Project

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
npm install express mongoose ejs express-session bcryptjs dotenv express-validator connect-flash
npm install --save-dev nodemon
```

### Step 4: Create Folder Structure

```bash
# Create all directories
mkdir config models controllers routes middleware views public
mkdir views/partials views/student views/admin
mkdir public/css public/js
```

### Step 5: Create All Files

Copy and paste the code from each artifact file into its respective location:

**Configuration:**
- `config/db.js`
- `.env`
- `package.json`

**Models:**
- `models/Student.js`
- `models/Application.js`

**Middleware:**
- `middleware/auth.js`
- `middleware/validation.js`

**Controllers:**
- `controllers/authController.js`
- `controllers/studentController.js`
- `controllers/adminController.js`

**Routes:**
- `routes/authRoutes.js`
- `routes/studentRoutes.js`
- `routes/adminRoutes.js`

**Views:**
- `views/partials/header.ejs`
- `views/partials/footer.ejs`
- `views/index.ejs`
- `views/404.ejs`
- `views/student/register.ejs`
- `views/student/login.ejs`
- `views/student/dashboard.ejs`
- `views/student/apply.ejs`
- `views/student/merit-list.ejs`
- `views/admin/login.ejs`
- `views/admin/dashboard.ejs`
- `views/admin/applications.ejs`
- `views/admin/merit-list.ejs`

**Public Assets:**
- `public/css/style.css`

**Main Application:**
- `app.js`

### Step 6: Configure Environment Variables

Edit `.env` file with your settings:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/university_admission
SESSION_SECRET=your_secret_key_here_change_in_production
ADMIN_EMAIL=admin@university.edu
ADMIN_PASSWORD=admin123
```

---

## Running the Application

### Step 1: Start MongoDB

**Windows:**
```bash
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

### Step 2: Start the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

### Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## Default Credentials

**Admin Login:**
- Email: `admin@university.edu`
- Password: `admin123`

**Student:** Create your own account via registration

---

## Testing the System

### Test as Student:

1. **Register** at `/auth/register`
   - Name: John Doe
   - Email: john@example.com
   - CNIC: 1234567890123
   - Password: password123

2. **Login** at `/auth/login`

3. **Apply for Admission** at `/student/apply`
   - Matric Marks: 950
   - Intermediate Marks: 980
   - Program: Computer Science

4. **Check Merit List** at `/student/merit-list`

### Test as Admin:

1. **Login** at `/admin/login`
   - Use default credentials

2. **View Applications** at `/admin/applications`

3. **Generate Merit List**
   - Enter cutoff score (e.g., 800)
   - Click "Generate Merit List"

4. **View Published Merit List** at `/admin/merit-list`

---

## Project Features

### Student Module ✅
- ✓ Registration with validation
- ✓ Secure login (bcrypt password hashing)
- ✓ Admission application submission
- ✓ Application update capability
- ✓ Merit list viewing
- ✓ Personal dashboard

### Admin Module ✅
- ✓ Secure admin login
- ✓ View all applications
- ✓ Generate merit list with cutoff
- ✓ Publish merit list
- ✓ Statistics dashboard
- ✓ Application management

### Technical Implementation ✅
- ✓ MVC Architecture
- ✓ MongoDB with Mongoose ORM
- ✓ Express.js backend
- ✓ EJS templating
- ✓ Session management
- ✓ Input validation
- ✓ Error handling
- ✓ Flash messages
- ✓ Responsive design
- ✓ Professional UI with specified color scheme

---

## Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod --version

# Check if service is active
sudo systemctl status mongod
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

### Module Not Found Error
```bash
# Reinstall dependencies
npm install
```

### Session Issues
```bash
# Clear browser cookies and cache
# Or use incognito/private mode
```

---

## Project Structure Summary

```
university-admission-system/
├── config/               # Database configuration
├── models/               # MongoDB schemas
├── controllers/          # Business logic
├── routes/               # Route definitions
├── middleware/           # Auth & validation
├── views/                # EJS templates
│   ├── partials/         # Reusable components
│   ├── student/          # Student views
│   └── admin/            # Admin views
├── public/               # Static assets
│   └── css/              # Stylesheets
├── app.js               # Main application file
├── package.json         # Dependencies
└── .env                 # Environment variables
```

---

## Next Steps

1. **Customize** the color scheme as needed
2. **Add** more programs if required
3. **Implement** email notifications (optional)
4. **Deploy** to cloud platform (Heroku, AWS, etc.)
5. **Add** more features (document upload, payment gateway, etc.)

---

## Support

For issues or questions:
- Check MongoDB connection
- Verify all dependencies are installed
- Ensure .env file is properly configured
- Check console for error messages

---

**System is ready for demonstration and deployment!** 🎓