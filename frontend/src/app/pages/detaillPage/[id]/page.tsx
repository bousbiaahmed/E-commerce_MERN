'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaCheckCircle, FaTimesCircle, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/app/context/Cart/CartContext';
import Navbar2 from '@/app/components/Navbar2';

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  description: string;
  category: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { addItemToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/products/${id}`);
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        const data: Product = await res.json();
        setProduct(data);
        setQuantity(data.stock > 0 ? 1 : 0);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Une erreur inconnue est survenue');
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItemToCart(product._id);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Chargement...</p>;
  if (error)
    return (
      <p className="text-center text-red-600 mt-10">
        Erreur : {error}
      </p>
    );
  if (!product)
    return <p className="text-center mt-10">Produit introuvable</p>;

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl grid md:grid-cols-2 gap-12">
          {/* Image avec zoom au hover */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden cursor-zoom-in">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
              priority
            />
          </div>

          {/* Informations produit */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                {product.title}
              </h1>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {product.description}
              </p>

              <p className="text-4xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
                ${product.price.toFixed(2)}
              </p>

              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-green-600 flex items-center text-lg font-medium">
                    <FaCheckCircle className="mr-2" /> En stock ({product.stock})
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center text-lg font-medium">
                    <FaTimesCircle className="mr-2" /> Rupture de stock
                  </span>
                )}
              </div>

              {product.stock > 0 && (
                <div className="mb-6 flex items-center gap-4">
                  <label htmlFor="quantity" className="font-semibold text-gray-800 dark:text-gray-200">
                    Quantité:
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    max={product.stock}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.min(product.stock, Math.max(1, Number(e.target.value))))
                    }
                    className="w-20 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Bouton Ajouter au panier */}
            <button
              className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition-transform transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed`}
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              aria-label="Ajouter au panier"
            >
              <FaShoppingCart size={24} /> Ajouter au panier
            </button>
          </div>
        </div>

        {/* Toast notification */}
        {showToast && (
          <div className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeInOut z-50">
            Produit ajouté au panier !
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          10%, 90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
    </>
  );
}
