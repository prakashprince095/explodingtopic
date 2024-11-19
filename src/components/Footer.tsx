'use client'


export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t border-gray-200 py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
                {/* Left Side - Logo and Contact Info */}
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl  text-gray-800">Exploding</h2>
                    <p className="mt-2 text-gray-600">
                        exploding helps top companies <br/>
                        <a href="#" className="text-blue-500">see the future before it happens</a>
                    </p>
                    <p className="mt-2 text-gray-600"><a href="mailto:hello@meetexploding.com">hello@meetexploding.com</a></p>
                    <p className="text-gray-600">Mumbai, India</p>
                </div>

                {/* Middle - Product and Company Links */}
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
                    <div>
                        <h3 className=" text-gray-800 mb-2">Products</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="text-gray-600 hover:text-blue-500">Enterprise</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-500">Extension</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className=" text-gray-800 mb-2">Company</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="text-gray-600 hover:text-blue-500">Affiliate</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-500">Data</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-500">Privacy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-500">Terms</a></li>
                        </ul>
                    </div>
                </div>

                {/* Right Side - Trends Categories */}
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className=" text-gray-800">Trends</h3>
                        <a href="#" className="text-blue-500 text-sm">View all categories →</a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <h4 className=" text-gray-700">Health & Wellness Trends</h4>
                            <ul className="space-y-1 mt-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Diet Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Fitness Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Healthcare Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Pharma Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Sleep Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Vitamin & Supplement Trends</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className=" text-gray-700">Financial Trends</h4>
                            <ul className="space-y-1 mt-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Banking Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Crypto Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Insurance Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">NFT Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Payment Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Personal Finance Trends</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className=" text-gray-700">Consumer Goods Trends</h4>
                            <ul className="space-y-1 mt-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Baby Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Beauty Tool Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Furniture Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Kitchen Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Personal Care Trends</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Pet Trends</a></li>
                            </ul>
                        </div>
                        {/* Add more trend columns as needed */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
