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
} from 'recharts';
import { BASE_URL } from '@/app/constants/baseUrl';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
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
    }

    fetchData();
  }, []);

  const dataByCategory = Array.isArray(products)
    ? products.reduce((acc: any, product: any) => {
        const category = product.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {})
    : {};

  const chartData = Object.keys(dataByCategory).map((key) => ({
    name: key,
    value: dataByCategory[key],
  }));

  const COLORS = ['#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FF4444'];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        <p>Chargement des données...</p>
      ) : error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Produits par Catégorie
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Stock par Produit
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={products}>
                <XAxis
                  dataKey="title"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
