'use client';

import { useAuth } from "@/app/context/Auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/app/components/Navbar";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Check submitted data.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();
      

      if (!response.ok) {
        setError(resData.message || "Login failed.");
        return;
      }
      if (!resData) {
        setError("Incorrect token");
        return;
      }
      
      login(email, resData);
      router.push("/pages/Products");
      
      
      
      

    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
