'use client';

import Link from "next/link";
import { useAuth } from "../context/Auth/AuthContext";
import { motion } from "framer-motion";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { username, token, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800"
          : "bg-transparent"
      } px-4 sm:px-6 py-3`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
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

        {/* Navigation actions */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {token ? (
            <>
              <motion.div
                className={`hidden sm:flex items-center space-x-1 ${
                  isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">
                  Hello,{" "}
                  <span className="font-semibold text-yellow-400">
                    {username}
                  </span>
                </span>
              </motion.div>

              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              >
                <ShoppingCart
                  className={`h-5 w-5 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-white"
                  }`}
                />
              </Link>

              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none 
                text-gray-900 px-3 py-2 rounded-md transition-all shadow-sm text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/pages/login"
                  className={`hidden sm:block transition font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-yellow-500"
                      : "text-white hover:text-yellow-300"
                  }`}
                >
                  Login
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/pages/register"
                  className="flex items-center space-x-1 bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 focus:outline-none 
                  text-gray-900 px-3 py-2 rounded-md transition-all shadow-sm text-sm font-semibold"
                >
                  <span>Sign Up</span>
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
