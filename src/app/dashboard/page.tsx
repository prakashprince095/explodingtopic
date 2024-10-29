"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

const Dashboard = () => {
  const { isAuthenticated, verfiySession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Verify session on mount
    verfiySession();

    // Redirect if the user is not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/dashboard/insights-hub"); // Redirect to insights-hub if authenticated
    }
  }, [isAuthenticated, router]);

  return (
    <div>Redirecting...</div> // Temporary content while redirecting
  );
};

export default Dashboard;
