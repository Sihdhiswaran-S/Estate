import express from 'express';
import { signup } from '../controller/auth.controller.js';
const router = express.Router();

// Example route for user registration  
router.get("/signup",signup)
export default router;