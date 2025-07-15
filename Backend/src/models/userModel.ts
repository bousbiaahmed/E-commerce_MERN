import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
      
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    role: "admin" | "user";


}

const userSchema= new Schema<IUser>({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role: {type:String , enum: ["admin", "user"], default:"user"},
});


const userModel = mongoose.model<IUser>('user',userSchema);

export default userModel;

