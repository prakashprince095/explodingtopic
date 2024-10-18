'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Axios } from 'axios';
import { useProfileUser } from '@/context/UserContext';

const SignUp: React.FC = () => {
    const { profileUser, setProfileUser } = useProfileUser();  // Use profileUser from context
    const [user, setUser] = React.useState({  // Your backend user state
        username: '',
        email: '',
        password: '',
    });

    const onSignup = async () => {

    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl  mb-6 text-center">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Username
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Username"
                            value={user.username}
                            onChange={(e) => {
                                setUser({ ...user, username: e.target.value }); // Update backend user state
                                setProfileUser({ ...profileUser, username: e.target.value }); // Update context state for UI
                            }}
                        />
                    </div>
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
                            onChange={(e) => {
                                setUser({ ...user, email: e.target.value }); // Update backend user state
                                setProfileUser({ ...profileUser, email: e.target.value }); // Update context state for UI
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value }); // Update backend user state
                            }}
                        />
                    </div>
                    <Link onClick={onSignup} href="/dashboard/insights-hub">
                        <h1 className="w-full text-center p-2 bg-blue-500 text-white rounded-md">Sign up</h1>
                    </Link>
                    <Link href='/login'>
                        <h1 className='bg-black text-white p-2 rounded-md text-center w-full my-2'>Login</h1>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
