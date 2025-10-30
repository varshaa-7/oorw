import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  idProof: {
    type: String,
    required: true
  },
  idProofNumber: {
    type: String,
    required: true
  },
  emergencyContact: {
    name: String,
    mobile: String,
    relation: String
  },
  healthDeclaration: {
    hasConditions: {
      type: Boolean,
      default: false
    },
    conditions: String,
    medications: String
  },
  documentUrl: { 
    type: String
  },
  selectedYatra: {
    type: Number,
    ref: 'Yatra',
    required: true
  },
  yatraTitle: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'completed', 'refunded'],
    default: 'pending'
  },
  registrationStatus: {
    type: String,
    enum: ['submitted', 'approved', 'rejected', 'cancelled'],
    default: 'submitted'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
});

export default mongoose.model('Registration', registrationSchema);
