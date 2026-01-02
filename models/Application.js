const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  matricMarks: {
    type: Number,
    required: [true, 'Matric marks are required'],
    min: 0,
    max: 1100
  },
  intermediateMarks: {
    type: Number,
    required: [true, 'Intermediate marks are required'],
    min: 0,
    max: 1100
  },
  program: {
    type: String,
    required: [true, 'Program choice is required'],
    enum: ['Computer Science', 'Software Engineering', 'Electrical Engineering', 
           'Mechanical Engineering', 'Business Administration', 'Economics']
  },
  meritScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Selected', 'Not Selected'],
    default: 'Pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate merit score before saving
applicationSchema.pre('save', function() {
  // Calculate merit as percentage
  const matricPercentage = (this.matricMarks / 1100) * 100;
  const interPercentage = (this.intermediateMarks / 1100) * 100;
  this.meritScore = (0.5 * matricPercentage) + (0.5 * interPercentage);
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Application', applicationSchema);