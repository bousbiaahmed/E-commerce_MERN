'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BASE_URL } from '@/app/constants/baseUrl';
import { Sparkles, Package, Layers, RefreshCw } from 'lucide-react';

type Product = {
  _id: string;
  title: string;
  category: string;
  stock: number;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid response: not an array');
      }

      setProducts(data);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category || 'Uncategorized')));

  const filteredProducts = products.filter((p) =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const dataByCategory = filteredProducts.reduce<Record<string, number>>((acc, product) => {
    const category = product.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(dataByCategory).map((key) => ({
    name: key,
    value: dataByCategory[key],
  }));

  const totalStock = filteredProducts.reduce((acc, p) => acc + p.stock, 0);

  const COLORS = [
    '#0ea5e9',
    '#6366f1',
    '#16a34a',
    '#eab308',
    '#ef4444',
    '#f472b6',
    '#14b8a6',
    '#f59e42',
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-blue-900 dark:text-white drop-shadow-lg">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-blue-600 dark:text-blue-300 font-medium">
            Aperçu des produits et du stock
          </p>
        </div>
        <Sparkles className="text-blue-400 w-12 h-12 animate-pulse drop-shadow-xl" />
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <select
          className="border rounded-lg px-4 py-2 text-blue-900 dark:text-white dark:bg-gray-800"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border rounded-lg px-4 py-2 text-blue-900 dark:text-white dark:bg-gray-800"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500 font-semibold text-center">{error}</p>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={fetchData}
          >
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all flex flex-col justify-center items-center border border-blue-100 dark:border-gray-800">
            <div className="flex items-center gap-6">
              <Package className="w-14 h-14 text-blue-500 drop-shadow-lg" />
              <div>
                <h2 className="text-base text-slate-500 dark:text-gray-400 font-semibold">Nombre total de produits</h2>
                <p className="text-4xl font-extrabold text-blue-900 dark:text-white">{filteredProducts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all flex flex-col justify-center items-center border border-purple-100 dark:border-gray-800">
            <div className="flex items-center gap-6">
              <Layers className="w-14 h-14 text-purple-500 drop-shadow-lg" />
              <div>
                <h2 className="text-base text-slate-500 dark:text-gray-400 font-semibold">Stock total disponible</h2>
                <p className="text-4xl font-extrabold text-purple-900 dark:text-white">{totalStock}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-yellow-100 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white text-center">
              Produits par Catégorie
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} (${percent ? (percent * 100).toFixed(0) : 0}%)`
                  }
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ marginTop: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all mt-8 border border-blue-100 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white text-center">
              Stock par Produit
            </h2>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={filteredProducts}>
                <XAxis
                  dataKey="title"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={100}
                  tick={{ fill: '#3b82f6', fontWeight: 600, fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: '#6366f1', fontWeight: 600, fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="top"
                  wrapperStyle={{ marginBottom: 12 }}
                />
                <Bar dataKey="stock" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
