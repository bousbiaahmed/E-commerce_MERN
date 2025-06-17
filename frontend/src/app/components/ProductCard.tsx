'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  _id: string;
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<Props> = ({ _id, title, image, price }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/pages/detaillPage/${_id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
      <div className="relative w-full h-56">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-green-600 font-bold text-md">${price}</p>
        </div>
        <button
          onClick={handleViewDetails}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 flex items-center justify-center gap-2 transition"
        >
          <ShoppingCart size={18} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
