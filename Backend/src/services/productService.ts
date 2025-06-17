import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();

}

export const seedInitialProducts=async()=>{

  try{
    const products = [
      {
        title: "Dell Laptop",
        image: "https://mtsplus.tn/2288-large_default/pc-portable-dell-vostro-3500-i5-11e-gen-8go-mx-330-2g-512go-ssd-v3500i5-2g.jpg",
        price: 15000,
        stock: 10,
        description: "Ordinateur portable Dell performant avec processeur Intel Core i5 de 11e génération, 8 Go de RAM et carte graphique dédiée MX330 2 Go. Idéal pour le travail et les loisirs."
      },
      {
        title: "HP Laptop",
        image: "https://mtsplus.tn/2288-large_default/pc-portable-dell-vostro-3500-i5-11e-gen-8go-mx-330-2g-512go-ssd-v3500i5-2g.jpg",
        price: 15000,
        stock: 10,
        description: "PC portable HP moderne avec design élégant, parfait pour les étudiants et les professionnels. Offre une bonne autonomie et des performances équilibrées."
      },
      {
        title: "Az Laptop",
        image: "https://mtsplus.tn/2288-large_default/pc-portable-dell-vostro-3500-i5-11e-gen-8go-mx-330-2g-512go-ssd-v3500i5-2g.jpg",
        price: 15000,
        stock: 10,
        description: "Laptop Az conçu pour une utilisation quotidienne fluide : navigation, bureautique, et multimédia. Excellent rapport qualité-prix."
      }, {
        title: "Az Laptop",
        image: "https://mtsplus.tn/2288-large_default/pc-portable-dell-vostro-3500-i5-11e-gen-8go-mx-330-2g-512go-ssd-v3500i5-2g.jpg",
        price: 15000,
        stock: 10,
        description: "Laptop Az conçu pour une utilisation quotidienne fluide : navigation, bureautique, et multimédia. Excellent rapport qualité-prix."
      }
    ];
    

    const existingProducts=await getAllProducts();

    if(existingProducts.length === 0){
        await productModel.insertMany(products);
    }
  }catch(err){
    console.error("cannot see database",err);

  }

}