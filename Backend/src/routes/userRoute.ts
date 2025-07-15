import express from "express";
import { login, register } from "../services/userService";
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

router.delete('/users/:id', async (req, res) => {
   try {
     const deletedUser = await userModel.findByIdAndDelete(req.params.id);
     if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
     res.json({ message: 'Utilisateur supprimé avec succès' });
   } catch (error) {
     res.status(500).json({ message: 'Erreur serveur' });
   }
 });
 

export default router;