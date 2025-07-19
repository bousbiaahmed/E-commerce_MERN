'use client';

import { BASE_URL } from '@/app/constants/baseUrl';
import React, { useEffect, useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaTrash, FaUser } from 'react-icons/fa';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface SortConfig {
  key: keyof User;
  direction: 'ascending' | 'descending';
}

const Button = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'ghost';
  onClick?: () => void;
  className?: string;
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg",
    danger: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-md hover:shadow-lg",
    ghost: "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const SkeletonRow = () => (
  <tr className="border-b border-gray-200 dark:border-gray-700">
    {[...Array(4)].map((_, i) => (
      <td key={i} className="p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
      </td>
    ))}
  </tr>
);

const UserRow = ({
  user,
  onDelete,
}: {
  user: User;
  onDelete: (id: string) => void;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
              <FaUser className="text-gray-400" />
            </div>
            <span>{user.firstName}</span>
          </div>
        </td>
        <td className="p-4">{user.lastName}</td>
        <td className="p-4">{user.email}</td>
        <td className="p-4 text-center">
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
            className="text-sm"
          >
            <FaTrash /> Supprimer
          </Button>
        </td>
      </tr>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Confirmer la suppression
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
              <span className="font-semibold">
                {user.firstName} {user.lastName}
              </span>
              ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onDelete(user._id);
                  setShowDeleteModal(false);
                }}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'firstName',
    direction: 'ascending',
  });

  const filteredAndSortedUsers = useMemo(() => {
    let filteredUsers = users;
    
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      filteredUsers = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(lowerFilter) ||
          user.lastName.toLowerCase().includes(lowerFilter) ||
          user.email.toLowerCase().includes(lowerFilter)
      );
    }
    
    return [...filteredUsers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [users, filter, sortConfig]);

  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof User) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === 'ascending' ? 
      <FaSortUp className="text-blue-500" /> : 
      <FaSortDown className="text-blue-500" />;
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/users`);
      if (!res.ok) throw new Error('Erreur de chargement');
      const data = await res.json();
      setUsers(data);
    } catch {
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/user/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Échec de la suppression');
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Gestion des Utilisateurs
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Gérer tous les utilisateurs du système avec possibilité de recherche, tri et suppression
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher utilisateurs..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => fetchUsers()}>
              Actualiser
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {['firstName', 'lastName', 'email'].map((key) => (
                  <th
                    key={key}
                    className="p-4 text-left font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                    onClick={() => requestSort(key as keyof User)}
                  >
                    <div className="flex items-center gap-1">
                      {key === 'firstName' && 'Prénom'}
                      {key === 'lastName' && 'Nom'}
                      {key === 'email' && 'Email'}
                      {getSortIcon(key as keyof User)}
                    </div>
                  </th>
                ))}
                <th className="p-4 text-center font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => <SkeletonRow key={index} />)
              ) : filteredAndSortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <FaUser className="text-5xl text-gray-300 dark:text-gray-600" />
                      <p className="text-lg">Aucun utilisateur trouvé</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Essayez de modifier vos critères de recherche
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedUsers.map((user) => (
                  <UserRow
                    key={user._id}
                    user={user}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}