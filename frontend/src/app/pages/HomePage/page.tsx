'use client';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";

const HomePage = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-950 to-gray-900 text-white min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 overflow-hidden">
      
      {/* Text Section */}
      <motion.div 
        className="z-10 max-w-xl text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Step Into <span className="text-amber-400 font-extrabold">Comfort</span> and <span className="text-amber-400 font-extrabold">Style</span>
        </motion.h1>
        
        <motion.p 
          className="text-gray-400 text-lg sm:text-xl mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Discover premium footwear crafted for your every adventure.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/products">
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
            >
              Shop Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FiArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </Link>
          
          <Link href="/collections">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-amber-500/30 hover:border-amber-400/50 text-amber-400 font-medium px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
            >
              <FiShoppingBag className="w-5 h-5" />
              View Collections
            </motion.button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { icon: <FiStar className="w-5 h-5" />, text: "Premium Quality" },
            { icon: <FiTruck className="w-5 h-5" />, text: "Free Shipping" },
            { icon: <div className="w-5 h-5 flex items-center justify-center">30</div>, text: "Day Returns" }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg"
            >
              <span className="text-amber-400">{feature.icon}</span>
              <span className="text-sm text-gray-300">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Product Image */}
      <motion.div
        className="relative w-full md:w-1/2 mt-10 md:mt-0 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <Image 
            src="/nike1.png"
            alt="Premium Sneakers"
            width={600}
            height={600}
            className="object-contain drop-shadow-2xl"
            priority
          />
          {/* Floating price tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute top-1/4 -right-4 sm:right-4 bg-amber-500 text-gray-900 font-bold px-4 py-2 rounded-lg shadow-lg"
          >
            $129.99
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute right-[-100px] bottom-[-100px] w-[300px] h-[300px] bg-amber-400 rounded-full blur-3xl opacity-[0.15] z-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      />
      
      <motion.div 
        className="absolute left-[-50px] top-[-50px] w-[200px] h-[200px] bg-blue-400 rounded-full blur-2xl opacity-[0.08] z-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400/20"
          style={{
            width: Math.random() * 10 + 5 + 'px',
            height: Math.random() * 10 + 5 + 'px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 60, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default HomePage;