import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';

dotenv.config();
const app = express(); 
app.use(express.json());
console.log(process.env.MONGO);

mongoose.connect(process.env.MONGO).then(()=>{ 
  console.log("Connected to MongoDB"); 
  app.listen(3000,()=>{ 
  console.log("Server is running on port 3000 "); 
}
);
} ).catch((err)=>{ 
  console.error("Error connecting to MongoDB", err); 
});

