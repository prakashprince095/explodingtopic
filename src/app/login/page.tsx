'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import appwriteService from '@/appwrite/config';

const Login: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        setLoading(true);
        try {
            if (!user.email || !user.password) {
                alert("Please enter both email and password");
                setLoading(false);
                return;
            }

            const session = await appwriteService.login({
                email: user.email,
                password: user.password,
            });

            if (session) {
                router.push("/dashboard/insights-hub");
            }
        } catch (error) {
            alert("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-6 text-center">{loading ? "Logging in..." : "Login"}</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onLogin}
                        className="w-full p-2 bg-blue-500 text-white rounded-md"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <Link href='/signup'>
                        <h1 className='bg-black text-white p-2 rounded-md text-center w-full my-2'>Sign Up</h1>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
