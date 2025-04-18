import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();

}

export const seedInitialProducts=async()=>{

    const products=[
        {title:"dell laptop",image:"https://mtsplus.tn/2288-large_default/pc-portable-dell-vostro-3500-i5-11e-gen-8go-mx-330-2g-512go-ssd-v3500i5-2g.jpg",price:15000,stock:10},
    ];

    const existingProducts=await getAllProducts();

    if(existingProducts.length === 0){
        await productModel.insertMany(products);
    }
}