'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BASE_URL } from '@/app/constants/baseUrl';
import { FaCheckCircle, FaTimesCircle, FaShoppingCart } from 'react-icons/fa';

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  description: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/product/products/${id}`);
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600 mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">Erreur : {error}</p>;
  if (!product) return <p className="text-center mt-10">Produit introuvable</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-xl grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-cover rounded-xl"
        />

        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <p className="text-3xl text-blue-600 font-semibold">${product.price}</p>

          <div>
            {product.stock > 0 ? (
              <span className="text-green-600 flex items-center text-sm">
                <FaCheckCircle className="mr-2" /> En stock ({product.stock})
              </span>
            ) : (
              <span className="text-red-600 flex items-center text-sm">
                <FaTimesCircle className="mr-2" /> Rupture de stock
              </span>
            )}
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium disabled:bg-gray-400"
            disabled={product.stock === 0}
          >
            <FaShoppingCart /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
