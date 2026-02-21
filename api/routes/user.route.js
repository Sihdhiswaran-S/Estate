import express from 'express';
import { testUserRoute } from '../controller/user.controller.js';

const router = express.Router();

// Example route for user registration  
router.get("/test", testUserRoute);

export default router;