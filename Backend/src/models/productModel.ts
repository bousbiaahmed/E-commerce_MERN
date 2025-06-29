import mongoose,{Schema,Document} from "mongoose";

export interface IProduct extends Document{

    title:string;
    image:string;
    price:number;
    stock:number;
    description:string;
    category:string;

}

const productSchema= new Schema<IProduct>({

    title:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    stock:{type:Number, required:true, default:0},
    description: { type: String, required: false },
    category:{type:String,required:false},

}) 
const productModel= mongoose.model<IProduct>('Product',productSchema)

export default productModel ;