'use client';

import { BASE_URL } from '@/app/constants/baseUrl';
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/users`);
      if (!res.ok) throw new Error('Erreur de chargement');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un utilisateur
  const handleDelete = async (id: string) => {
    if (!confirm('Confirmer la suppression ?')) return;
    try {
      const res = await fetch(`${BASE_URL}/user/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Échec de la suppression');
      // Mise à jour de la liste sans recharger
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>

      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Prénom</th>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-2">{user.firstName}</td>
                <td className="p-2">{user.lastName}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
