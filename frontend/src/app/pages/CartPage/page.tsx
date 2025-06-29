"use client";
import { BASE_URL } from "@/app/constants/baseUrl";
import { useAuth } from "@/app/context/Auth/AuthContext";
import { useCart } from "@/app/context/Cart/CartContext";
import React, { useEffect, useState, useCallback } from "react";

interface Product {
  _id: string;
  title: string;
  image: string;
  unitPrice: number;
}

interface CartItem {
  product: Product;
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
  const { updateItemInCart,removeItemInCart,clearCart } = useCart();

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
        setError("Failed to fetch user cart. Please try again.");
        return;
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error(err);
      setError("Unexpected error while fetching cart.");
    }
  }, [token]);
  const handleRemove=async(productId:string)=>{
    await removeItemInCart(productId);

  
  }
  const handleQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    await updateItemInCart(productId, quantity);
    

  };
 
  fetchCart();
  

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

  {error && <p className="text-red-500 text-center mb-4">{error}</p>}

  {!cart ? (
    <p className="text-center text-gray-500">Loading cart...</p>
  ) : cart.items.length === 0 ? (
    <p className="text-center text-gray-500">Your cart is empty.</p>
  ) : (
    <>
      <ul className="space-y-6">
        {cart.items.map((item, index) => (
          <li
            key={index}
            className="flex flex-col md:flex-row items-center gap-6 border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-32 h-32 object-cover rounded-xl"
            />
            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold mb-1">{item.product.title}</h3>
              <p className="text-gray-600 mb-2">
                Unit Price: ${item.unitPrice.toFixed(2)}
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded-full font-bold text-lg"
                  onClick={() =>
                    handleQuantity(item.product._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  –
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded-full font-bold text-lg"
                  onClick={() =>
                    handleQuantity(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="ml-auto text-red-600 hover:text-red-800 font-medium"
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Clear Cart button placed here */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          🧹 Clear Cart
        </button>
        <p className="text-2xl font-bold text-gray-800">
          Total: ${cart.totalAmount.toFixed(2)}
        </p>
      </div>
    </>
  )}
</div>

  
  );
}

export default Cart;
