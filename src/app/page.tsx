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
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div> 
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
