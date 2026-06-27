import express from 'express';
import { googleAuth, signin, signup } from '../controller/auth.controller.js';
const router = express.Router();

// Example route for user registration  
router.post("/signup",signup)
router.post("/signin",signin)
router.post("/google",googleAuth)
console.log("auth route");
export default router;