"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, LogOut, Settings, UserPlus, Car, MapPin, ParkingCircle, RectangleVertical, Bell } from "lucide-react";
import ProtectedRoute from "../../components/protected/page";






const chartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Parking Slot Usage",
      data: [10, 20, 15, 30, 25], // Example data
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color for area under line
      borderColor: "rgba(75, 192, 192, 1)", // Line color
      borderWidth: 2, // Line width
    },
  ],
};




const AdminDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const getUserFromToken = (): { username?: string } | null => {
    const token = sessionStorage.getItem("token");

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { username: payload.username };
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  useEffect(() => {
    const user = getUserFromToken();
    if (user?.username) {
      setUsername(user.username);
    }
  }, []);

  const navigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <ProtectedRoute allowedRoles={["Admin", "manager"]}>
      <div className={`flex h-screen bg-gray-100 ${isDarkMode ? "dark" : ""}`}>
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h1>
          </div>
          <nav className="mt-4">
            <Button
              onClick={() => navigate("/user")}
              variant="ghost"
              className="w-full px-4 py-2 justify-start"
            >
              <UserPlus size={20} className="mr-2" /> Create User
            </Button>
            <Button
              onClick={() => navigate("/parking-detail")}
              variant="ghost"
              className="w-full px-4 py-2 justify-start"
            >
              <Car size={20} className="mr-2" /> Parking Detail
            </Button>
            <Button
              onClick={() => navigate("/dzongkhag")}
              variant="ghost"
              className="w-full px-4 py-2 justify-start"
            >
              <MapPin size={20} className="mr-2" /> Dzongkhag
            </Button>
            <Button
              onClick={() => navigate("/parking-area")}
              variant="ghost"
              className="w-full px-4 py-2 justify-start"
            >
              <ParkingCircle size={20} className="mr-2" /> Parking Area
            </Button>
            <Button
              onClick={() => navigate("/parking-slot")}
              variant="ghost"
              className="w-full px-4 py-2 justify-start"
            >
              <RectangleVertical size={20} className="mr-2" /> Parking Slot
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <header className="flex items-center justify-end p-4 bg-white dark:bg-gray-800 shadow-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
            >
              <Settings size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut size={20} />
            </Button>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {username ? `Logged in as: ${username}` : ""}
            </p>

        
          </div>
        </div>

        {/* Logout Confirmation Card */}
        {showLogoutConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>Confirm Logout</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Are you sure you want to logout?</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button onClick={cancelLogout} variant="outline">
                  No
                </Button>
                <Button onClick={confirmLogout} variant="destructive">
                  Yes
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
