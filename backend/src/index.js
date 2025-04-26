import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ import cors
import connectDB from './config/db.js';
import templateRoutes from './routes/template.route.js';

dotenv.config();

const app = express();

// ✅ Enable CORS for all origins (or restrict to specific one in production)
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));

// Middlewares
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// Routes
app.use('/api/templates', templateRoutes);

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start:", err);
  });
