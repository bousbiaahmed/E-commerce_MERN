'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">
        <Link href="/">L&B Bazaar</Link>
      </div>
      <div className="space-x-4">
        <Link
          href="/login"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Login
        </Link>
        <Link 
          href="/pages/Register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
