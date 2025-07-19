import express, { Request, Response } from "express";
import { login, register , deletedUser, getData } from "../services/userService";
import userModel from "../models/userModel";

const router=express.Router( );

router.post('/register',async(req,res)=>{
   try{
    const {firstName,lastName,email,password}=req.body;

    const {statusCode,data}= await register({firstName,lastName,email,password})

    res.status(statusCode).json(data)
   }catch(err){
    res.status(500).json("Something went wrong") 

   }
})

router.post('/login',async(req,res)=>{

   try{
    const {email,password}=req.body
    const{statusCode,data}=await login({email,password})

    res.status(statusCode).json(data)
   }catch(err){
    res.status(500).json("Something went wrong") 

   }
})

router.get('/users', async (req, res) => {
   try {
     const users = await userModel.find({}, 'email firstName lastName');
     res.json(users);
   } catch (error) {
     res.status(500).json({ message: 'Erreur serveur' });
   }
 });

router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusCode, data } = await deletedUser(id);
    res.status(Number(statusCode)).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.get('/admin', async (req: Request, res: Response) => {
  try {
    const { statusCode, data } = await getData();
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
 

export default router;