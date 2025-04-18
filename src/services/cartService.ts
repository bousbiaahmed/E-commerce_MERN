import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";


interface createCartForUser{
    userId:string;
}


const createCartForUser= async({userId}:createCartForUser)=>{

    const cart = await cartModel.create({ userId,totalAmount:0 });
    await cart.save();
    return cart;
}

interface GetActiveCartForUser{
    userId: string;
}

export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" });

    if(!cart){
        cart= await createCartForUser({userId});

    }
    return cart;
};

interface AddItemToCart{
    productId:any;
    userId: string;
    quantity:number;
}

export const addItemToCart = async ({ productId, userId, quantity }: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find((p) => p.product.toString() === productId);

  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if(product.stock < quantity){
    return { data: "Not enough stock!", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });
      
  cart.totalAmount += product.price * quantity;

  const updateCart = await cart.save();

  return { data: updateCart, statusCode: 200 };
};
