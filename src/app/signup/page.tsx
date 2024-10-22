'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import appwriteService from '@/appwrite/config';
import Link from 'next/link';

const SignUp: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const onSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Simple form validation
    if (!user.name || !user.email || !user.password) {
      setErrorMessage('All fields are required');
      setLoading(false);
      return;
    }

    try {
      // Create the user account
      await appwriteService.createUserAccount({
        email: user.email,
        password: user.password,
        name: user.name,
      });

      // Automatically log the user in and redirect
      await router.push('/dashboard/insight-hub');
    } catch (error) {
      // Display error message to the user
      setErrorMessage(error instanceof Error ? error.message : 'Account creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-6 text-center">{loading ? 'Processing...' : 'Sign Up'}</h2>
        {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
        <form onSubmit={onSignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">name</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={handleInputChange}
              disabled={loading}
              className="border p-2 rounded w-full"
              required
            />
          </div>
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <Link href="/login" className="block mt-4 text-center text-blue-500">Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
