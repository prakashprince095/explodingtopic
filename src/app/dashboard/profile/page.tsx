'use client'
import React from 'react'
import { useProfileUser } from '@/context/UserContext';
import appwriteService from '@/appwrite/config'; 
import { useRouter } from 'next/navigation';

const Profile: React.FC = () => {
  const router = useRouter();
  const { profileUser } = useProfileUser(); // Use profileUser from context
 
  const onLogout = async () => {
    try {
        await appwriteService.logout();
        router.push("/login");  // Redirect to login after logout
    } catch (error) {
        console.log("Error during logout:", error);
    }
};

  return (
    <div className="min-h-screen  flex items-center justify-center">
    <div className="max-w-6xl w-full p-8">
      {/* Header */}
      <div className="mb-8 text-left">
        <h1 className="text-2xl font-bold">My Account</h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Info */}
        <div className="p-6  border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">User Info</h2>
          <div className="mb-2">
            <p className="text-gray-600">Name</p>
            <p className="text-black">{profileUser.username}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Email</p>
            <p className="text-black">{profileUser.email}</p>
          </div>
          <button className="border border-white bg-white text-black py-2 px-4 rounded-md">
            Update Password
          </button>
        </div>

        {/* Manage Team */}
        <div className="p-6  border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Manage Team</h2>
          <div className="mb-4 flex items-center">
            <div className="bg-blue-100 text-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              P
            </div>
            <div className="ml-4">
              <p className="text-black">Phylliss Pentecost</p>
              <p className="text-gray-600">winifredmacleod534@gmail.com</p>
            </div>
          </div>
          <button className="border border-white bg-white text-black py-2 px-4 rounded-md">
            Add User
          </button>
          <p className="mt-2 text-gray-600">1 of 10 Seats Filled</p>
        </div>

        {/* Membership Info */}
        <div className="p-6  border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Membership Info</h2>
          <div className="mb-2">
            <p className="text-gray-600">Current Plan</p>
            <p className="text-black">Exploding Topics Pro Business</p>
          </div>
          <div className="mb-2">
            <p className="text-gray-600">Start Date</p>
            <p className="text-black">10/03/2024</p>
          </div>
          <a href="#" className="text-blue-500 underline">Update Billing Information</a>
          <div className="mt-4">
            <button className="border border-white bg-white text-black py-2 px-4 rounded-md mr-2">
              Upgrade Subscription
            </button>
            <button className="border border-white bg-white text-black py-2 px-4 rounded-md">
              Cancel
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="p-6  border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
          <div className="mb-2">
            <p className="text-gray-600">Email</p>
            <p className="text-black">support@explodingtopics.com</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 text-center text-gray-500">
        <p>Privacy Policy &nbsp; | &nbsp; Terms & Conditions &nbsp; | &nbsp; Affiliates</p>
        <p className="mt-4">&copy; 2024 Exploding.io</p>
      </div>
    </div>
  </div>
  )
}

export default Profile