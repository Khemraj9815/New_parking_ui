"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/protected/page";
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);  // Handle login errors

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent form from submitting and refreshing the page
    setError(null);  // Reset error state
    try {
      const response = await fetch('http://localhost:9999/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store user role and userId in sessionStorage for role-based access
        sessionStorage.setItem('userId', data.user.id);
        sessionStorage.setItem('role', data.user.role);

        // Redirect based on user role
        if (data.user.role === 'Admin') {
          router.push('/dashboard');  // Redirect to admin page
        } else if (data.user.role === 'manager') {
          router.push('/manager');  // Redirect to manager page
        } else {
          router.push('/login');  // If no matching role, go back to login
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message);  // Display error message
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <ProtectedRoute allowedRoles={['Admin']}>
    <main className="py-16">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold self-center">Login</CardTitle>
          <CardDescription className="self-center">Just for admin</CardDescription>
        </CardHeader>
      
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="mx-8">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="username" 
                required 
                className="w-64 mx-8" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="mx-8">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="password" 
                required 
                className="w-64 mx-8" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}  {/* Display login errors */}
            <Button type="submit" className="w-64 mx-8">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
    </ProtectedRoute>
  );
};

export default LoginPage;
