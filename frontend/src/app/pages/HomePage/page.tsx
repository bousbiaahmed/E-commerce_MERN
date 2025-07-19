'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiStar, FiTruck } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/Auth/AuthContext";

type Circle = {
  width: number;
  height: number;
  left: string;
  top: string;
  y: number;
  x: number;
  duration: number;
  delay: number;
};

const HomePage = () => {
  const router = useRouter();
  const { token } = useAuth();

  const [circles, setCircles] = useState<Circle[]>([]);

  // Générer les cercles uniquement côté client une fois
  useEffect(() => {
    const generatedCircles: Circle[] = Array.from({ length: 8 }).map(() => ({
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      y: (Math.random() - 0.5) * 60,
      x: (Math.random() - 0.5) * 40,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 2,
    }));
    setCircles(generatedCircles);
  }, []);

  const handleShopNow = () => {
    router.push(token ? "/pages/Products" : "/pages/login");
  };

  return (
    <div className="relative bg-gradient-to-br from-[#0e0e0f] to-[#1c1c1f] text-white min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 overflow-hidden">

      <motion.div 
        className="z-10 max-w-xl text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Step Into <span className="text-amber-400 drop-shadow-lg">Comfort</span> & <span className="text-amber-400 drop-shadow-lg">Style</span>
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-lg sm:text-xl mb-8 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Discover next-level sneakers built for performance, elegance, and everyday adventure.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button 
            onClick={handleShopNow}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
          >
            Shop Now
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <FiArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.button>

          <Link href="/pages/login" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-600 hover:border-amber-400 text-yellow-400 hover:text-white font-medium px-8 py-3 rounded-full transition duration-300"
            >
              Login
            </motion.button>
          </Link>
        </motion.div>

        <motion.div 
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { icon: <FiStar className="w-5 h-5" />, text: "Premium Quality" },
            { icon: <FiTruck className="w-5 h-5" />, text: "Fast Delivery" },
            { icon: <div className="w-5 h-5 flex items-center justify-center font-bold">30</div>, text: "Day Return" }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm"
            >
              <span className="text-amber-400">{feature.icon}</span>
              <span className="text-sm text-gray-300">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="relative w-full md:w-1/2 mt-16 md:mt-0 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Image 
            src="/nike1.png"
            alt="Premium Sneakers"
            width={600}
            height={600}
            className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
            priority
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute top-1/4 -right-4 sm:right-4 bg-amber-500 text-gray-900 font-bold px-4 py-2 rounded-lg shadow-md"
          >
            $129.99
          </motion.div>
        </motion.div>
      </motion.div>

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

      {/* Cercles flottants */}
      {circles.map((circle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400/20"
          style={{
            width: `${circle.width}px`,
            height: `${circle.height}px`,
            left: circle.left,
            top: circle.top,
          }}
          animate={{
            y: [0, circle.y, 0],
            x: [0, circle.x, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: circle.delay,
          }}
        />
      ))}

    </div>
  );
};

export default HomePage;
