"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Help() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Ensures component only renders after mount

    return (
        <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center">
                <h2 className="text-[40px] text-center mb-4">Contact our team</h2>
            </section>
            <section className="flex flex-col xl:flex-row items-start justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
                {/* Left Column - Form */}
                <div className="flex flex-col justify-center items-center">
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none bg-transparent"
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none bg-transparent"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="you@company.com"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none bg-transparent"
                        />
                        
                        <textarea
                            placeholder="Leave us a message..."
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none bg-transparent"
                        />
                        
                        <button
                            type="submit"
                            className="w-full bg-white text-black rounded-lg p-2 hover:bg-gray-200"
                        >
                            Send message
                        </button>
                    </form>
                </div>

                {/* Right Column - Contact Info */}
                <div className="flex flex-col items-start justify-center">
                    <div className="my-3">
                        <h3 className="text-xl">Chat with us</h3>
                        <ul className="space-y-2">
                            <li>
                                <p className="flex items-center gap-2 hover:underline">
                                    <img className="w-10" src="/contact/w.svg" alt="WhatsApp" />
                                    <span className="text-[20px]">WhatsApp</span>
                                </p>
                            </li>
                            <li>
                                <p className="flex items-center gap-2 hover:underline">
                                    <img className="w-10" src="/contact/s.svg" alt="Skype" />
                                    <span className="text-[20px]">Skype</span>
                                </p>
                            </li>
                            <li>
                                <p className="flex items-center gap-2 hover:underline">
                                    <img className="w-10" src="/contact/m.svg" alt="Gmail" />
                                    <span className="text-[20px]">Gmail</span>
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="my-3">
                        <h3 className="text-xl">Call us</h3>
                        <p>
                            Call our team Mon-Fri from 8am to 5pm.
                            <br />
                            <span className="hover:underline flex items-center gap-3">
                                <img className="w-10" src="/contact/c.svg" alt="Phone" />
                                <span className="text-[20px]">+1 (555) 000-0000</span>
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Help;
