'use client';

import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Product } from '../../types/Product';
import { BASE_URL } from "../../constants/baseUrl";
import Navbar2 from "@/app/components/Navbar2";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [err , setErr] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setErr(true);
      }
    };

    fetchData();
  }, []);

  if (err) {
    alert("Something went wrong, please try again");
  }

  // 🔎 Filtrage ici
  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === '' || product.category?.toLowerCase() === category.toLowerCase();

    return matchesTitle && matchesCategory;
  });

  return (
    <>
      <Navbar2 />

      {/* Champs de recherche et sélection */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6 mb-6 px-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

<div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6 mb-6 px-6">
  
  

  {/* Catégorie par boutons */}
  <div className="flex gap-2 flex-wrap">
    {[
      { label: "All", value: "" },
      { label: "Men", value: "homme" },
      { label: "Women", value: "femme" },
      { label: "Boys", value: "garçon" },
    ].map(({ label, value }) => (
      <button
        key={value}
        onClick={() => setCategory(value)}
        className={`px-4 py-2 rounded border ${
          category === value ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
</div>


      </div>

      {/* Produits filtrés */}
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {filteredProducts.map((p) => (
          <ProductCard key={p._id} {...p} />
        ))}
      </div>
    </>
  );
}

export default Products;
