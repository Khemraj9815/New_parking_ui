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

type NotificationType = {
  message: string;
  type: 'success' | 'error';
}

export default function CreateUserForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [hint, setHint] = useState("")
  const [roleName, setRoleName] = useState("manager")
  const [roleDescription, setRoleDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<NotificationType | null>(null)

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000) // Hide notification after 5 seconds
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log("Submitting form with:", { username, password, hint, roleName, roleDescription })
  
    try {
      const response = await fetch('http://localhost:9999/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          hint,
          roleName,
          roleDescription,
        }),
      });
  
      // check if the response content type is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message || "Failed to create user")
        }
  
        showNotification(`Created ${username} with role ${roleName}`, 'success')
        setUsername("")
        setPassword("")
        setHint("")
        setRoleName("manager")
        setRoleDescription("")
      } else {
        throw new Error("Invalid response from server. Expected JSON.")
      }
    } catch (error) {
      console.error("Error in form submission:", error)
      showNotification(error.message || "Something went wrong", 'error')
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <ProtectedRoute allowedRoles={['Admin']}>
      <main className="py-16 flex justify-center">
        {notification && (
          <div className={`fixed top-4 right-4 p-4 rounded-md ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {notification.message}
          </div>
        )}
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
              {/* <div className="space-y-2">
                <Label htmlFor="hint">hint</Label>
                <Input
                  id="hint"
                  placeholder="password"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  maxLength={100}
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="role">User Role</Label>
                <Select value={roleName} onValueChange={setRoleName}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="roleDescription">Role Description</Label>
                <Input
                  id="roleDescription"
                  placeholder="role description"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                />
              </div> */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create User"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </ProtectedRoute>
  )
}