import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log("failed to connect",err);
  });


  //seed the products to database

seedInitialProducts();

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)


app.listen(port,()=>{
    console.log('server is running at:http://localhost:3001')
})