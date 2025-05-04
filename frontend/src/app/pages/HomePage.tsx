'use client';
import Link from "next/link";
import React from "react";
import Image from "next/image";


const HomePage = () => {
  return (
  
    <>
  <Image 
    src="/nike1.png"
    alt="Shoe Promo"
    width={500}
    height={500}
    className="ml-[50%]"
  />
      {/* Promo Section */}
      <div className="bg-black text-center py-20  h-[80vh] animate-zoomIn overflow-x-hidden sm:mt-[-100%] md:mt-[-32%]">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wide uppercase mb-4 animate-font">
          Step Into Comfort and Style
        </h1>
        <p className="text-lg text-gray-200 mb-6 animate-font sm:text-3xl">
          Discover the latest collections designed for every adventure.
        </p>
        
        <Link href="/">
          <button className="mt-4 bg-white text-yellow-400 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Shop Now
          </button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
