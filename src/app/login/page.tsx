"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:9999/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Optional if cookies are being used
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        // Decode the token to extract the role
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userRole = payload.role;

        // Store token in session storage
        sessionStorage.setItem("token", token);

        // Redirect based on the role
        if (userRole === "Admin") {
          router.push("/dashboard");
        } else if (userRole === "manager") {
          router.push("/dashboard");
        } else {
          setError("Unauthorized access. Invalid role.");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-16">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold self-center">Login</CardTitle>
          <CardDescription className="self-center">Just for admin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="mx-8">
                Username
              </Label>
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
              <Label htmlFor="password" className="mx-8">
                Password
              </Label>
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
            {error && <p className="text-red-600 text-center">{error}</p>}
            <Button type="submit" className="w-64 mx-8" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
