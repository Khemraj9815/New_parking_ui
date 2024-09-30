"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Moon, Sun, LogOut, Settings, User, LayoutDashboard, UserPlus, Car, MapPin, ParkingCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const navigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className={`flex h-screen bg-gray-100 ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => navigate("/user")}
          >
            <UserPlus className="mr-3" size={20} />
            Create User
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => navigate("/parking-detail")}
          >
            <Car className="mr-3" size={20} />
            Parking Detail
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => navigate("/dzongkhag")}
          >
            <MapPin className="mr-3" size={20} />
            Dzongkhag
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => navigate("/parking-area")}
          >
            <ParkingCircle className="mr-3" size={20} />
            Parking Area
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex items-center justify-end p-4 bg-white dark:bg-gray-800 shadow-md">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="mr-2">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate("/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate("/profile")}>
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate("/logout")}>
            <LogOut className="h-5 w-5" />
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Welcome to the Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">this space is used for displaying data</p>
        </main>
      </div>
    </div>
  )
}