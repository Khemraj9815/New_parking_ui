// app/components/ProtectedRoute.tsx

"use client"; // This component must be rendered on the client side

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Use the new navigation hook

// ProtectedRoute component to restrict access based on user roles
const ProtectedRoute = ({ children, allowedRoles }: { children: ReactNode; allowedRoles: string[] }) => {
  const router = useRouter();
  
  useEffect(() => {
    const role = sessionStorage.getItem('role'); // Retrieve role from sessionStorage

    // If role is not found or doesn't match allowed roles, redirect 
    // task: if role is doesn't match toast an error "you are not authorized"
    if (!role || !allowedRoles.includes(role)) {
      router.push('/login'); // Redirect to login if unauthorized
    }
  }, [router, allowedRoles]); // Run when router or allowedRoles change

  return <>{children}</>; // Render children if authorized
};

export default ProtectedRoute;
