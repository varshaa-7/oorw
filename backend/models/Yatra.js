import mongoose from 'mongoose';

const yatraSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: { 
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  highlights: [{
    type: String
  }],
  itinerary: [{
    day: String,
    title: String,
    description: String
  }],
  included: [{
    type: String
  }],
  excluded: [{
    type: String
  }],
  maxParticipants: {
    type: Number,
    default: 50
  },
  availableSeats: {
    type: Number,
    default: 50
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

yatraSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Yatra', yatraSchema);
