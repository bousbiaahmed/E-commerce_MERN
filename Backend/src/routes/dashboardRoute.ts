import express from 'express';
import productModel from "../models/productModel";
import validateJWT from "../middlewares/validateJWT";
const router = express.Router();

router.post('/products', validateJWT, async (req, res) => {
    try {
      const { title, image, price, stock = 0, description = '', category = '' } = req.body;
  
      if (!title || !image || typeof price !== 'number') {
        return res.status(400).json({ message: 'Title, image, and numeric price are required.' });
      }
  
      const newProduct = new productModel({ title, image, price, stock, description, category });
      await newProduct.save();
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product', error });
    }
  });
  

export default router;
