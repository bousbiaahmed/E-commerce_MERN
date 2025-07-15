import express, { Request, Response } from "express";
import { getAllProducts } from "../services/productService";
import productModel from "../models/productModel";

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
});

// GET product by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
