import productModel from "../models/productModel";

export async function getAllProducts() {
  return await productModel.find(); 
}

export const seedInitialProducts=async()=>{

  try{
    const products = [
      {
        title: "Chaussures Nike Air Max",
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQSEBUUEBIVFRMXFhcYGRgWEhoUFxYWFxUWFhgTFxUaHSggGhomGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGjUiHR8tLS03Ly0tNSs3LS0rLTU3LS0yLS0tLisrNy8rNTAtLy0rLS0rLysrKy0tNSstNTYtLf/AABEIAQMAwgMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCAQj/xABLEAABAwIDBAYFCAUJCQEAAAABAAIDBBESITEFBkFxBxNRYYGRIjKhscEUQlKCktHS8CNEYpPCFRYzQ1RVcpSiF0VTc4Oy0+HiCP/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAKxEBAQACAQIEBAYDAAAAAAAAAAECEQMhQRITMZEEUdHhMoGhscHwIkJx/9oADAMBAAIRAxEAPwC8UREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARFWG9kNVtTaxoIp3wUdPGx9Q6Nxa5zpBia3vuCAAchZ5N7AILPRQbaWxzsikfUUEkrmwjHLDNM6WOWMeuW4r9VIBcgssDaxByt2Nmb7UM5a1lTGJHMY/A52Fw6xoe1ueWKzh6INwgkKIiAiIgg+/m9TaKrpY553w08rJcTosBkbIDGGOe1wceqAL82jW18guxszaUkb2MqJGzQygdRVNwgSYsxHKG+iHkWLXts1+lmmwdW2/jmzbRmLmglmGLMC4a1odbPQYnuP1rqOtdLAQaV9hoYXFxgkadYzHezQe4ZHMWOYD9Foql2D0ouYXtnhkdDGG5vc35QA4gWxYsE2E3FxZxAaTdxN7VpZxIxr23wvaH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",
        price: 320,
        stock: 15,
        description: "Chaussures de sport Nike Air Max avec amorti optimal et design moderne. Parfaites pour un usage quotidien ou pour le sport.",
        category: "Homme"
      },
      {
        title: "Casquette Adidas Originals",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3RImYOZq8ELWYoR1cy47jNngi6S2YwmjAA&s",
        price: 70,
        stock: 25,
        description: "Casquette noire Adidas avec logo Trefoil brodé. Idéale pour compléter un look streetwear ou se protéger du soleil.",
        category: "Femme"
      },
      {
        title: "Pantalon Cargo Homme",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCagckzUIf2PX_kyWF-uu5gB6rGLXloPm5BA&s",
        price: 140,
        stock: 12,
        description: "Pantalon cargo confortable avec poches multiples. Style urbain, parfait pour les sorties et les tenues casual.",
        category: "Homme"
      },
      {
        title: "Hoodie Champion Gris",
        image: "https://media-cdn.citadium.com/image/62/7/4102627.png?fit=bounds&bg-color=ECEEEE&width=407&height=569&canvas=407-569",
        price: 180,
        stock: 8,
        description: "Sweat à capuche en coton doux avec logo Champion. Confortable et tendance, pour un look sportif décontracté.",
        category: "Kids"
      },
      {
        title: "Veste Jean Levi's",
        image: "https://resize.elle.fr/original/var/plain_site/storage/images/mode/les-news-mode/veste-en-jean-levi-s-trucker-trouvez-la-forme-qui-vous-convient/84122324-1-fre-FR/Veste-en-jean-Levi-s-trucker-trouvez-la-forme-qui-vous-convient.jpg",
        price: 250,
        stock: 6,
        description: "Veste en jean Levi's classique et intemporelle. S'adapte à tous les styles pour une touche vintage.",
        category: "Femme"
      },
      {
        title: "T-Shirt Oversize Unisexe",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcCfkPd6OqNnbVtYsVhC82IIQsNLauLKtccQ&s",
        price: 90,
        stock: 30,
        description: "T-shirt oversize en coton bio. Minimaliste, confortable et idéal pour toutes les saisons.",
        category: "Homme"
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