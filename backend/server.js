import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import yatraRoutes from './routes/yatraRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/yatra', yatraRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/registration', registrationRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Yatra Management API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      yatra: '/api/yatra',
      videos: '/api/videos',
      registration: '/api/registration'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
