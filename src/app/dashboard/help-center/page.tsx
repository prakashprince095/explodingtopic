"use client";

import React from 'react'
import Link from 'next/link'
function Help() {
    return (
        <div className="flex flex-col items-center justify-center ">
            <section className='flex flex-col items-center'>
                <h2 className="text-[40px] text-center mb-4">Contact our team</h2>
                {/* <p className="text-gray-600 mb-8 text-center max-w-[600px]">
                    Got any questions about the product or scaling on our platform? We're here to help.
                    Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
                </p> */}
            </section>
            <section className="flex flex-col xl:flex-row items-start justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
                {/* Left Column - Form */}
                <div className=" flex flex-col justify-center items-center ">
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none  bg-transparent"
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none bg-transparent "
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="you@company.com"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none bg-transparent "
                        />
                        
                        <textarea
                            placeholder="Leave us a message..."
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none bg-transparent "
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
                        <h3 className="text-xl ">Chat with us</h3>
                        <ul className="space-y-2">
                            <li>
                                <p className=" flex items-center gap-2 hover:underline">
                                    <img className='w-10' src="/contact/w.svg" alt="" />
                                    <p className='text-[20px]'> Whats app</p>
                                </p>
                            </li>
                            <li>
                                <p className=" flex items-center gap-2 hover:underline">
                                    <img className='w-10' src="/contact/s.svg" alt="" />
                                    <p className='text-[20px]'> Skype</p>
                                </p>
                            </li>
                            <li>
                                <p className=" flex items-center gap-2 hover:underline">
                                    <img className='w-10' src="/contact/m.svg" alt="" />
                                    <p className='text-[20px]'> Gmail</p>
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="my-3">
                        <h3 className="text-xl ">Call us</h3>
                        <h1>
                            Call our team Mon-Fri from 8am to 5pm.
                            <br />
                            <h2 className=" hover:underline flex items-center gap-3">
                                <img className='w-10' src="/contact/c.svg" alt="" />
                                <h3 className='text-[20px]'>+1 (555) 000-0000</h3>
                            </h2>
                        </h1>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Help