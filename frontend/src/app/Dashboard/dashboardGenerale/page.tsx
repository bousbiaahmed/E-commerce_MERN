'use client';

import Link from 'next/link';
import { LayoutDashboard, PlusCircle, Users, LogIn } from 'lucide-react';

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 text-center transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          🎛️ Panneau d'administration
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Bienvenue dans votre espace admin. Sélectionnez une action ci-dessous :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            href="/Dashboard/Dashboard"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow-lg transition"
          >
            <PlusCircle className="h-5 w-5" />
            Ajouter un produit
          </Link>

          <Link
            href="/Dashboard/admindashboard"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition"
          >
            <LayoutDashboard className="h-5 w-5" />
            Voir le Dashboard
          </Link>

          <Link
            href="/Dashboard/Users"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition"
          >
            <Users className="h-5 w-5" />
            Tous les utilisateurs
          </Link>

          <Link
            href="/pages/login"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg transition"
          >
            <LogIn className="h-5 w-5" />
            Se connecter comme utilisateur
          </Link>
        </div>
      </div>
    </div>
  );
}
