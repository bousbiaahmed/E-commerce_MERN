import { Request, Response } from "express";
import express from "express";
import { addItemToCart, checkout, clearCart, deleteItemIncart, getActiveCartForUser, updateItemInCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";

import {ExtendRequest} from "../types/extendedRequest"

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  try{
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId ,populateProduct:true});
    res.status(200).json(cart);
  }catch(err){
   res.status(500).json("Something went wrong") 

  }

});

router.delete('/',validateJWT,async(req:ExtendRequest,res)=>{
 try{
  const userId=req.user._id;
  const response= await clearCart({userId})
  res.status(response.statusCode).json(response.data)
 }catch(err){
  res.status(500).json("Something went wrong") 

 }

})

router.post('/items',validateJWT,async(req:ExtendRequest,res)=>{
   try{
    const userId=req?.user?._id;
    const{productId,quantity}=req.body;
    const response=await addItemToCart({userId,productId,quantity});
    res.status(response.statusCode).json(response.data)

   }catch(err){
    res.status(500).json("Something went wrong") 

   }

})
router.put('/items',validateJWT,async(req:ExtendRequest,res)=>{
  try{
  const userId=req?.user?._id;
  const {productId,quantity}=req.body;
  const response=await updateItemInCart({userId,productId,quantity});
  res.status(response.statusCode).json(response.data);}catch(err){
    res.status(500).json("Something went wrong") 

  }

});
router.delete('/items/:productId', validateJWT,async(req:ExtendRequest,res)=>{
 try{ 
  const userId=req?.user?._id; 
  const {productId}=req.params;
  const response = await deleteItemIncart({userId,productId})}
 catch(err){
  res.status(500).json("Something went wrong") 

 }
  
})

router.post("/checkout", validateJWT,async(req:ExtendRequest,res)=>{
    try{
      const userId=req?.user?._id;
      const {address}=req.body;
      const response=await checkout({userId,address});
      res.status(response.statusCode).json(response.data);
    }catch(err){   res.status(500).json("Something went wrong") 
    }



})

 

export default router;
