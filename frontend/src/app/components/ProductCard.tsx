'use client';

import Image from 'next/image';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Props {
  _id: string;
  title: string;
  price: number;
  image: string;
  category?: string;
}

const ProductCard: React.FC<Props> = ({ _id, title, image, price, category }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/pages/detaillPage/${_id}`);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative group"
      whileHover={{ scale: 1.015, y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
            {category}
          </div>
        )}

        {/* Quick actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[{ icon: Eye, label: "Quick view" }, { icon: Heart, label: "Wishlist" }].map(({ icon: Icon, label }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 text-gray-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
              aria-label={label}
            >
              <Icon size={20} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">{title}</h3>
          <p className="text-lg font-bold text-yellow-500 dark:text-yellow-400">
            ${price.toFixed(2)}
          </p>
        </div>

        <motion.button
          onClick={handleViewDetails}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-400 text-gray-900 dark:text-gray-900 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-200 shadow-md hover:shadow-xl"
        >
          <ShoppingCart size={18} />
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
