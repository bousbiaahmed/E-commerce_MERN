import express from "express"
import { getAllProducts } from "../services/productService"
import productModel from "../models/productModel";
import { Router, Request, Response } from 'express';

const router=express.Router()

router.get('/',async (req,res)=>{

    try{
        const products= await getAllProducts();
        res.status(200).send(products)
    }catch(err){
        
        res.status(500).send("Something went wrong") 

    }

})
router.get('/products/:id', async (req: Request, res: Response) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });



export default router;