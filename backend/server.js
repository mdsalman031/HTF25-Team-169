// Load environment variables from .env file
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { initializeFirebase } from './src/config/firebase.js';

// Import API routes
import taskRoutes from './src/routes/taskRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

// --- Firebase Admin SDK Initialization ---
initializeFirebase();

// --- Express App Setup ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- Global Middlewares ---
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());

// --- API Routes ---
// A simple health check endpoint to verify the server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Mount the task-related routes under the /api/v1/tasks prefix
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Server is running and listening on http://localhost:${PORT}`);
});