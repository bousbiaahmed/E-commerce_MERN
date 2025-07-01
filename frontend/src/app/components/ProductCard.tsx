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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-full overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image with quick actions overlay */}
      <div className="relative w-full aspect-square group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />
        
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 text-gray-900 p-2 rounded-full shadow"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 text-gray-900 p-2 rounded-full shadow"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </motion.button>
        </div>

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
            {category}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{title}</h3>
          <p className="text-yellow-500 dark:text-yellow-400 font-bold text-lg">${price.toFixed(2)}</p>
        </div>

        <motion.button
          onClick={handleViewDetails}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white dark:text-gray-900 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
        >
          <ShoppingCart size={18} />
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;