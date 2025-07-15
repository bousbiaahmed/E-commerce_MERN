"use client";
import { BASE_URL } from "@/app/constants/baseUrl";
import { useAuth } from "@/app/context/Auth/AuthContext";
import { useCart } from "@/app/context/Cart/CartContext";
import React, { useEffect, useState, useCallback } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar2 from "@/app/components/Navbar2";
import Footer from "@/app/components/Footer";

interface Product {
  _id: string;
  title: string;
  image: string;
  unitPrice: number;
}

interface CartItem {
  product: Product | null;
  quantity: number;
  unitPrice: number;
}

interface CartData {
  items: CartItem[];
  totalAmount: number;
}

function Cart() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const { updateItemInCart, removeItemInCart, clearCart } = useCart();

  const fetchCart = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Réponse erreur:", text);
        setError("Impossible de récupérer le panier. Réessayez.");
        return;
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error(err);
      setError("Erreur inattendue lors du chargement du panier.");
    }
  }, [token]);

  const handleRemove = async (productId: string) => {
    await removeItemInCart(productId);
    
  };

  const handleQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    await updateItemInCart(productId, quantity);
    
  };
  fetchCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <> 
    <Navbar2 />
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl mt-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        🛒 Mon Panier
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {!cart ? (
        <div className="text-center text-gray-500 animate-pulse">Chargement...</div>
      ) : cart.items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.items
              .filter((item) => item.product !== null)
              .map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col md:flex-row items-center gap-6 border border-gray-200 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition duration-300"
                >
                  <img
                    src={item.product!.image}
                    alt={item.product!.title}
                    className="w-28 h-28 object-cover rounded-xl shadow-sm"
                  />
                  <div className="flex-1 w-full">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {item.product!.title}
                    </h3>
                    <p className="text-gray-500 mb-3 text-sm">
                      Prix unitaire :{" "}
                      <span className="font-medium text-amber-600">
                        ${item.unitPrice.toFixed(2)}
                      </span>
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantity(item.product!._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                        >
                          –
                        </button>
                        <span className="px-4 text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantity(item.product!._id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-lg font-bold text-white bg-amber-400 hover:bg-amber-500 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.product!._id)}
                        className="ml-auto flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        <FaTrashAlt /> Supprimer
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
          </ul>

          {/* Footer du panier */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-300">
            <button
              onClick={() => {
                clearCart();
                fetchCart();
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition shadow"
            >
              🧹 Vider le panier
            </button>
            <p className="text-3xl font-extrabold text-gray-800 mt-6 md:mt-0">
              Total :{" "}
              <span className="text-amber-500">${cart.totalAmount.toFixed(2)}</span>
            </p>
          </div>
        </>
      )}
    </div>
    <Footer />
    </>
  );
}

export default Cart;
