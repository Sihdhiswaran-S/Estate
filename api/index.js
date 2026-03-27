import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();
const app = express(); 
app.use(express.json());


mongoose.connect(process.env.MONGO).then(()=>{ 
  console.log("Connected to MongoDB"); 
  app.listen(3000,()=>{ 
  console.log("Server is running on port 3000 "); 
}
);
} ).catch((err)=>{ 
  console.error("Error connecting to MongoDB", err); 

});
app.use("/api/user", userRouter);  
app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});