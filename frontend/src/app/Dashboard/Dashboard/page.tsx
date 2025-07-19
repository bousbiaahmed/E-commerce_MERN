'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../../constants/baseUrl';
import { FiArrowLeft, FiImage, FiDollarSign, FiPackage, FiType, FiTag, FiFileText } from 'react-icons/fi';

export default function AdminProductForm() {
  const [form, setForm] = useState({
    title: '',
    image: '',
    price: '',
    stock: '',
    description: '',
    category: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!form.title.trim()) errors.title = 'Title is required';
    if (!form.image.trim()) errors.image = 'Image URL is required';
    if (!form.price) errors.price = 'Price is required';
    if (Number(form.price) <= 0) errors.price = 'Price must be greater than 0';
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${BASE_URL}/dashboard/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create product');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/products');
      }, 1500);
    } catch (err: any) {
      setFieldErrors({ general: err.message || 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl dark:bg-gray-800 flex flex-col items-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Created!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Your product has been successfully added to the inventory.
        </p>
        <div className="h-1.5 w-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full overflow-hidden">
          <div className="h-full bg-gray-200 dark:bg-gray-700 animate-progress"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <FiArrowLeft />
        <span>Back to Products</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700">
          <h1 className="text-2xl font-bold text-white">Add New Product</h1>
          <p className="text-blue-100">Fill in the details below to add a new product to your inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {fieldErrors.general && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 font-medium">{fieldErrors.general}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FiType className="text-gray-500" />
                <span>Product Title <span className="text-red-500">*</span></span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Premium Headphones"
                  value={form.title}
                  onChange={handleChange}
                  className={`w-full px-4 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                    fieldErrors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.title && (
                  <p className="mt-1 text-red-500 text-sm">{fieldErrors.title}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FiTag className="text-gray-500" />
                <span>Category</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Electronics"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 pl-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Image URL with Preview */}
          <div className="mb-6">
            <label htmlFor="image" className="block mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FiImage className="text-gray-500" />
              <span>Image URL <span className="text-red-500">*</span></span>
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={handleChange}
                className={`w-full px-4 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  fieldErrors.image ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {fieldErrors.image && (
                <p className="mt-1 text-red-500 text-sm">{fieldErrors.image}</p>
              )}
            </div>
            
            {form.image && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Preview:</p>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden max-w-xs">
                  
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Price */}
            <div>
              <label htmlFor="price" className="block mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FiDollarSign className="text-gray-500" />
                <span>Price ($) <span className="text-red-500">*</span></span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="99.99"
                  value={form.price}
                  onChange={handleChange}
                  className={`w-full px-4 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                    fieldErrors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.price && (
                  <p className="mt-1 text-red-500 text-sm">{fieldErrors.price}</p>
                )}
              </div>
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FiPackage className="text-gray-500" />
                <span>Stock Quantity</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                placeholder="50"
                value={form.stock}
                onChange={handleChange}
                className="w-full px-4 pl-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label htmlFor="description" className="block mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FiFileText className="text-gray-500" />
              <span>Description</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your product in detail..."
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-4 font-semibold rounded-lg text-white transition-all flex items-center justify-center gap-2 ${
                loading 
                  ? 'bg-gradient-to-r from-blue-400 to-blue-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving Product...</span>
                </>
              ) : (
                <span>Save Product</span>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="py-4 px-6 font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}