import express from 'express';
import {
  handleSignup,
  handleLogin,
  handleLogout,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);

export default router;
