import express from 'express';
import { signin, signup } from '../controller/auth.controller.js';
const router = express.Router();

// Example route for user registration  
router.post("/signup",signup)
router.post("/signin",signin)
console.log("auth route");
export default router;