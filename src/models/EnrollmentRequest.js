const mongoose = require('mongoose');

const enrollmentRequestSchema = new mongoose.Schema({
  customerId: String,
  make: String, 
  model: String, 
  year: String,  
  vin: String,
  licensePlate: String,
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending', 
  },
  adminComment: String,
  enrollmentTimestamp: Date,
  verdictTimestamp: Date,
  viewStatus: {
    type: String,
    enum: ['Viewed', 'Not Viewed'], 
    default: 'Not Viewed', 
  },
});

const EnrollmentRequest = mongoose.models.EnrollmentRequest ||mongoose.model('EnrollmentRequest', enrollmentRequestSchema);

module.exports = EnrollmentRequest;
