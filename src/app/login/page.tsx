"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

    const handleLogin = (e: React.FormEvent) => {
          e.preventDefault();
          axios.post("http://localhost:9999/login", {
               username, password })
            .then((response) => {
              if (response.data.valid){
                console.log('login successful')
              }
              else {
                console.log('error')
              }
              console.log(response.data)
              
            })
            .catch((error) => {
              console.log(error.message);
            }
        )
    }

   return (
    <main className="py-16">
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold self-center">Login</CardTitle>
        <CardDescription className="self-center">Just for admin</CardDescription>
      </CardHeader>
    
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="mx-8">Username</Label>
            <Input id="email" type="email" placeholder="username" required className="w-64 mx-8" onChange={(e) => setusername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="mx-8">Password</Label>
            <Input id="password" type="password" placeholder="password" required className="w-64 mx-8" onChange={(e) => setpassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-64 mx-8" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
    </main>
  
    )
};

export default LoginPage;
