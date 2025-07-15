import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import cors from "cors"; 
import userModel from "./models/userModel";
import bcrypt from 'bcrypt';
import dashboardRoute from "./routes/dashboardRoute";
const app = express();


const port = 3001;

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL||'')
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err: unknown) => {
    console.log("failed to connect", err);
  });

  const createAdmin = async ()=>{
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is not defined in .env");
    }

      await userModel.deleteOne({role:"admin"});
      const hashedPassword = await bcrypt.hash(password, 10);
  

      await userModel.create({
        firstName: "Admin",
        lastName: "Root",
        email: email,
        password: hashedPassword,
        role: "admin",
      });
    
      console.log("Admin created successfully");
  }


  createAdmin().catch((err) => console.error(err));
seedInitialProducts();

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use('/dashboard',dashboardRoute)


app.listen(port,()=>{
    console.log('server is running at:http://localhost:3001')
})