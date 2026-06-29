import express from 'express';
import { testUserRoute, userUpdate } from '../controller/user.controller.js';
import { verifyUser } from '../Utils/verifyUser.js';

const router = express.Router();

// Example route for user registration  
router.get("/test", testUserRoute);
router.post("/update/:id",verifyUser, userUpdate);
export default router;