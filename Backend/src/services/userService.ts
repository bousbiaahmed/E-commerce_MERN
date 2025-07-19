import userModel from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
interface RegisterParams{
    firstName:String;
    lastName:string;
    email:string;
    password:string;

}



export const register = async ({ firstName, lastName, email, password }: RegisterParams) => {
    const findUser = await userModel.findOne({ email });
  
    if (findUser) {
      return {
        data: { message: "User already exists!" },
        statusCode: 400,
      };
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ email, password: hashedPassword, firstName, lastName });
  
    await newUser.save();
  
    const token = generateJWT({ firstName, lastName, email });
  
    return {
      data: { token },
      statusCode: 200,
    };
  };
  

interface LoginParams{
    email:string;
    password:string;
 
}

export const login= async({email,password}:LoginParams)=>{

    const findUser= await userModel.findOne({email})

    if(!findUser){

        return { data:"Incorrect email or password", statusCode:400 }
    }

    const passwordMatch= await bcrypt.compare(password,findUser.password);
     
       if(passwordMatch){
        return {data:generateJWT({email,firstName:findUser.firstName,lastName:findUser.lastName,role:findUser.role}),statusCode:200};
       }

              return {data:"Incorrect email or password",statusCode:400}


}
 export const deletedUser = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { statusCode: 400, data: { message: 'Format d\'ID invalide' } };
    }
  
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return { statusCode: 404, data: { message: 'Utilisateur non trouvé' } };
    }
  
    return { statusCode: 200, data: { message: 'Utilisateur supprimé avec succès' } };
  };


   interface LoginAdmin{
    role :"admin" |"user";
    }
    export const getData = async () => {
        try {
          // Only return users with role 'user'
          const users = await userModel.find({ role: 'user' }, 'firstName email');
          return { data: { users }, statusCode: 200 };
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          return { data: { users: [] }, statusCode: 500 };
        }
      };


const generateJWT=(data:any)=>{
    return jwt.sign(data,process.env.JWT_SECRET ||'')
}