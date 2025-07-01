'use client';
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Product } from '../../types/Product';
import { BASE_URL } from "../../constants/baseUrl";
import Navbar2 from "@/app/components/Navbar2";
import { FiSearch, FiFilter, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErr(error.message);
        } else {
          setErr('An error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === '' || product.category?.toLowerCase() === category.toLowerCase();
    return matchesTitle && matchesCategory;
  });

  return (
    <>
      <Navbar2 />

      <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-transparent py-12 px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-yellow-400 mb-4"
          >
            Our Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-300 max-w-2xl mx-auto"
          >
            Discover premium footwear for every occasion
          </motion.p>
        </div>

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="sticky top-0 z-10 bg-gray-900/90 backdrop-blur-sm py-4 px-6 border-b border-gray-800"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 text-white placeholder-gray-400
                         border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <FiFilter className="text-yellow-400" />
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { label: "All", value: "" },
                  { label: "Men", value: "homme" },
                  { label: "Women", value: "femme" },
                  { label: "Boys", value: "garçon" },
                ].map(({ label, value }) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCategory(value)}
                    aria-pressed={category === value}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                      category === value
                        ? "bg-yellow-400 text-gray-900 font-medium"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Loading and Error States */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <FiLoader className="animate-spin text-yellow-400 text-4xl mb-4" />
              <p className="text-yellow-400">Loading products...</p>
            </motion.div>
          )}

          {err && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center my-10"
            >
              <p className="text-red-400">{err}</p>
            </motion.div>
          )}

          {/* Products Grid */}
          {!loading && !err && (
            <>
              {filteredProducts.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredProducts.map((p) => (
                    <motion.div
                      key={p._id}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard {...p} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <p className="text-yellow-400 text-lg mb-2">No products found</p>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;