'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/Auth/AuthContext';
import { useCart } from '../context/Cart/CartContext';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Link from 'next/link';
import { motion } from 'framer-motion';

function Navbar2() {
  const { username, logout } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  if (!username) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo ou Nom du site */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`text-2xl font-bold tracking-tight ${
            isScrolled ? "text-gray-900 dark:text-white" : "text-white"
          }`}
        >
          <Link href="/" className="flex items-center gap-1 cursor-pointer">
            <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-md">
              L&B
            </span>
            <span className="hidden sm:inline ml-1">Bazaar</span>
          </Link>
        </motion.div>

        {/* Right: User info et actions */}
        <div className="flex items-center gap-4">
          {/* Avatar avec initiale */}
          <div className="bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold uppercase">
            {username.charAt(0)}
          </div>
          <span className="text-base font-medium">{username}</span>

          {/* Logout button */}
          <button 
            onClick={handleLogout} 
            aria-label="Logout"
            className="hover:text-red-400 transition-colors"
            title="Logout"
          >
            <FiLogOut className="text-xl" />
          </button>

          {/* Cart Icon with Link */}
          <Link 
            href="/pages/CartPage" 
            aria-label="Cart"
            className="relative hover:text-yellow-400 transition-colors"
            title="Shopping Cart"
          >
            <FaShoppingCart className="text-3xl" />
            {/* Badge panier */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;
