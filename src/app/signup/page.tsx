'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProfileUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import appwriteService from '@/appwrite/config';

const SignUp: React.FC = () => {
    const router = useRouter();
    const { setProfileUser } = useProfileUser();  // Get the method to set user profile
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        setLoading(true);
        try {
            // Ensure all fields are filled
            if (!user.email || !user.password || !user.username) {
                alert('Please fill all required fields.');
                setLoading(false);
                return;
            }

            // Create the user in Appwrite
            const createdUser = await appwriteService.createUserAccount({
                email: user.email,
                password: user.password,
                name: user.username,
            });

            // Get the user details after account creation and login
            const currentUser = await appwriteService.getCurrentUser();
            if (currentUser) {
                // Set the user in the context
                setProfileUser({
                    username: currentUser.name,
                    email: currentUser.email,
                });
                // Redirect to the dashboard
                router.push('/dashboard/insights-hub');
            } else {
                throw new Error('User creation failed.');
            }
        } catch (error) {
            if (error instanceof Error && error.message.includes('User already exists')) {
                alert('User already exists. Redirecting to login...');
                router.push('/login');
            } else {
                console.error('Signup failed:', error);
                alert('Signup failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Enable or disable the button based on user input
        if (user.email && user.password && user.username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-6 text-center">{loading ? 'Processing' : 'Sign Up'}</h2>
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
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
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
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
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
                    <Button onClick={onSignup} disabled={buttonDisabled || loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                    <Link href="/login">
                        <h1 className="bg-black text-white p-2 rounded-md text-center w-full my-2">Login</h1>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
