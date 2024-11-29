"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProtectedRoute from '@/components/protected/page'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function CreateUserForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [roleName, setRoleName] = useState("manager")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log("Submitting form with:", { username, password, roleName })
  
    try {
      const response = await fetch('http://localhost:9999/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          roleName,
        }),
      });
  
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message || "Failed to create user")
        }
  
        toast({
          title: "User Created",
          description: `Created ${username} with role ${roleName}`,
          duration: 5000,
          className: "bg-green-500 border-green-600 text-white",
        })
        setUsername("")
        setPassword("")
        setRoleName("manager")
      } else {
        throw new Error("Invalid response from server. Expected JSON.")
      }
    } catch (error) {
      console.error("Error in form submission:", error)
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <ProtectedRoute allowedRoles={['Admin']}>
      <main className="py-20 flex justify-center"> {/* Increased top padding here */}
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  maxLength={25}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength={50}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">User Role</Label>
                <Select value={roleName} onValueChange={setRoleName}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create User"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Toaster />
    </ProtectedRoute>
  )
}
