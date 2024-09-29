"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useToast } from "../../components/hooks/use-toast";
import ProtectedRoute from "../../components/protected/page";

export default function CreateUserForm() {
  return (
    <ProtectedRoute allowedRoles={['Admin', 'manager']}> {/* Changed to allow both roles */}
      <main className="py-16 flex justify-center">
        <div>hello manager and admin</div>
      </main>
    </ProtectedRoute>
  );
}
