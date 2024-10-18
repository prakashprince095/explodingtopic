"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Axios } from 'axios';

const Login: React.FC = () => {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });

    const onLogin = async () => {

    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl  mb-6 text-center">Login</h2>
                <form>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <Link onClick={onLogin} href="/dashboard/insights-hub" className=''>
                        <h1 className="w-full text-center p-2 bg-blue-500 text-white rounded-md ">Login</h1>
                    </Link>
                    <Link href='/Signup'>
                        <h1 className='bg-black text-white p-2 rounded-md text-center w-full my-2'  >Signup</h1>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
