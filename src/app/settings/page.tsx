'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster";

export function SimpleUserManagement() {
  const [users, setUsers] = useState<{ id: number; name: string; role: string | { name: string } }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:9999/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        console.log('Fetched users:', data); // Debug API response structure.

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:9999/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Update state to remove the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      
      // Show success toast
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully",
        duration: 3000,
        className: "bg-green-500 border-green-600 text-white",
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Management</CardTitle>
        <CardDescription>
          View existing users and their roles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        typeof user.role === 'string' && user.role.toLowerCase() === 'admin'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {typeof user.role === 'object' && user.role !== null
                        ? user.role.name
                        : user.role || 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <Toaster />
    </Card>
  );
}

export default SimpleUserManagement;