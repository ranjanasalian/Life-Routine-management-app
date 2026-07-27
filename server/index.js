import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', profileRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🍃 Life Routine Companion MongoDB API Server Running' });
});

// Connect DB and listen
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API Backend Server running on http://localhost:${PORT}`);
  });
});
