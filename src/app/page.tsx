"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth"; // Assuming you're using Zustand for auth

export default function HomePage() {
  const { isAuthenticated, verfiySession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Verify session on mount
    verfiySession();

    // Redirect if the user is authenticated
    if (isAuthenticated) {
      router.push("/dashboard/insights-hub");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to My App</h1>
      <p className="mt-4">This is the landing page of your Next.js app.</p>
      <div className="mt-8">
        <Link href="/register" className=''>
          <p className="w-fit p-3 bg-blue-500 text-white rounded-md">Overview</p>
        </Link>
      </div>
    </main>
  );
}
