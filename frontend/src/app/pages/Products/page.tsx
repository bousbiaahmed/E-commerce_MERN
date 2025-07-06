'use client';
import React, { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard";
import { Product } from '../../types/Product';
import { BASE_URL } from "../../constants/baseUrl";
import Navbar2 from "@/app/components/Navbar2";
import Footer from "../../components/Footer";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/product`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setErr(null);
      } catch (error: any) {
        setErr(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchTitle = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category === '' || product.category?.toLowerCase() === category.toLowerCase();
    return matchTitle && matchCategory;
  });

  return (
    <>
      <Navbar2 />

      {/* Hero Section */}
      <div className="relative bg-black text-white h-[65vh] flex items-center justify-center">
        <img
          src="/fashion-hero.jpg"
          alt="Fashion Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="z-10 text-center px-4 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500"
          >
            Discover Fashion That Speaks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg md:text-xl text-gray-200"
          >
            Curated for the bold, the elegant, and the unique.
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="sticky top-0 z-30 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-300 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
            <FiFilter className="text-yellow-500 shrink-0" />
            {[
              { label: "All", value: "" },
              { label: "Men", value: "homme" },
              { label: "Women", value: "femme" },
              { label: "Boys", value: "garçon" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setCategory(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                  ${category === value
                    ? "bg-yellow-400 text-black shadow"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <FiLoader className="animate-spin text-yellow-400 text-4xl mb-4" />
            <p className="text-yellow-400">Loading products...</p>
          </div>
        )}

        {err && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md text-center my-6">
            {err}
          </div>
        )}

        {!loading && !err && (
          <>
            {filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <FiSearch className="text-yellow-400 text-4xl mb-3" />
                <p className="text-xl">No matching products found.</p>
                <p className="text-sm mt-1">Try another keyword or category.</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Products;
