'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../../constants/baseUrl';

export default function AdminProductForm() {
  const [form, setForm] = useState({
    title: '',
    image: '',
    price: '',
    stock: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.title || !form.image || !form.price) {
      setError('Title, image, and price are required.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${BASE_URL}/dashboard/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,// envoie le token pour auth
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create product');
        setLoading(false);
        return;
      }

    alert("your product Added")
    } catch (err: any) {
      setError(err.message || 'Network error');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
    {error && (
      <p className="mb-4 text-red-600 dark:text-red-400 font-semibold text-center">
        {error}
      </p>
    )}
  
    {/* Title */}
    <div className="mb-4">
      <label htmlFor="title" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
        Title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Product title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  
    {/* Image URL */}
    <div className="mb-4">
      <label htmlFor="image" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
        Image URL <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="image"
        name="image"
        placeholder="https://example.com/image.jpg"
        value={form.image}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  
    {/* Price */}
    <div className="mb-4">
      <label htmlFor="price" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
        Price ($) <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        id="price"
        name="price"
        min="0"
        step="0.01"
        placeholder="99.99"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  
    {/* Stock */}
    <div className="mb-4">
      <label htmlFor="stock" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
        Stock
      </label>
      <input
        type="number"
        id="stock"
        name="stock"
        min="0"
        placeholder="0"
        value={form.stock}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  
    {/* Description */}
    <div className="mb-4">
      <label htmlFor="description" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Describe your product..."
        value={form.description}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-2 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  
    {/* Category */}
    <div className="mb-6">
      <label htmlFor="category" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
        Category
      </label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Category name"
        value={form.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  
    {/* Submit button */}
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3 font-semibold rounded-lg text-white transition-colors ${
        loading ? 'bg-yellow-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
      }`}
    >
      {loading ? 'Saving...' : 'Save Product'}
    </button>
  </form>
  
  );
}
