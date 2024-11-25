"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  allowedRoles: string[]; // List of roles allowed to access the page
  children: ReactNode; // The page/component to render
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login
      router.push("/login");
      return;
    }

    try {
      // Decode the token
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userRole = payload.role;

      // Check if the user's role is allowed
      if (allowedRoles.includes(userRole)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.push("/unauthorized"); // Redirect unauthorized users
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      router.push("/login"); // Redirect if token is invalid
    }
  }, [allowedRoles, router]);

  // Show loading until authorization check is complete
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // Render the protected content
  return <>{isAuthorized && children}</>;
};

export default ProtectedRoute;
