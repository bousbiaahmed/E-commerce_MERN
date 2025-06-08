'use client';

import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Product } from '../../types/Product';
import { BASE_URL } from "../../constants/baseUrl";



function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [err , setErr] = useState(false)
  useEffect(() => {
    const fetchData = async() =>{
    try{
      
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
        
      
    }
    catch{
      setErr(true);
    }

  }
    fetchData();
    
  }, []);

  if(err){
    alert("Something went wrong , please try again");
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          {...p}
        />
      ))}
    </div>
  );
}

export default Products;
