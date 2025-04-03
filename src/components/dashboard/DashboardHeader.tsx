"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Bell,
  Search,
  Menu,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/database/User.model";

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
  };
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3); // Example notification count

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // Implement actual theme switching logic here if needed
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm dark:bg-gray-900 dark:border-gray-800">
      {/* Left side - Mobile menu trigger and search */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8 bg-gray-50 border-gray-200 focus-visible:ring-[#295E4F]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* Right side - Notifications, theme toggle, user menu */}
      <div className="flex items-center gap-3">
        {/* Search button (mobile) */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#295E4F] p-0 text-[10px] font-bold text-white flex items-center justify-center"
                  aria-label={`${notifications} unread notifications`}
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-sm">New student registered</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-sm">Staff meeting reminder</p>
                <p className="text-xs text-gray-500">Today at 3:00 PM</p>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-sm">System update completed</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router.push("/dashboard/notifications")}
              >
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 md:pl-3 md:pr-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.image || undefined}
                  alt={user.name || "User"}
                />
                <AvatarFallback className="bg-[#295E4F] text-white">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-gray-500">
                  {user.role || "USER"}
                </span>
              </div>
              <ChevronDown className="hidden h-4 w-4 md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
