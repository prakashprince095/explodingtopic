'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const onLogin = async (event: React.FormEvent) => {
    
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-6 text-center">{loading ? 'Logging in...' : 'Login'}</h2>
        {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
        <form onSubmit={onLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              disabled={loading}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={handleInputChange}
              disabled={loading}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <Link href="/signup" className="block mt-4 text-center text-blue-500">Don't have an account? Sign Up</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
