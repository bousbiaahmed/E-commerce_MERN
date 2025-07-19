'use client';

import Link from 'next/link';
import { LayoutDashboard, PlusCircle, Users, LogIn } from 'lucide-react';

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-950 rounded-3xl shadow-2xl p-10 text-center transition-all duration-300 border border-gray-200 dark:border-gray-800">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 mb-4 drop-shadow-lg">
           Panneau d&apos;administration
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
          Bienvenue dans votre espace admin.<br />
          <span className="text-purple-500 dark:text-purple-300 font-semibold">Sélectionnez une action ci-dessous :</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <Link
            href="/Dashboard/Dashboard"
            className="group flex flex-col items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-2xl shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
          >
            <PlusCircle className="h-8 w-8 group-hover:animate-bounce" />
            <span className="text-lg">Ajouter un produit</span>
          </Link>

          <Link
            href="/Dashboard/admindashboard"
            className="group flex flex-col items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
          >
            <LayoutDashboard className="h-8 w-8 group-hover:animate-bounce" />
            <span className="text-lg">Voir le Dashboard</span>
          </Link>

          <Link
            href="/Dashboard/Users"
            className="group flex flex-col items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-2xl shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
          >
            <Users className="h-8 w-8 group-hover:animate-bounce" />
            <span className="text-lg">Tous les utilisateurs</span>
          </Link>

          <Link
            href="/pages/login"
            className="group flex flex-col items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800 text-white font-bold rounded-2xl shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
          >
            <LogIn className="h-8 w-8 group-hover:animate-bounce" />
            <span className="text-lg">Se connecter comme utilisateur</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
