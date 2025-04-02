// src/components/marketing/Header.tsx
"use client"; // Needed for useState and client-side interactions

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogIn, LogOut, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose, // Import SheetClose
  SheetFooter,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/admissions-page", label: "Admission" },
  { href: "/contact", label: "Contact Us" },
  { href: "/facilities", label: "Facilities" },
  { href: "/news", label: "News & Events" },
  // Add other main nav links here
];

const dropdownLinks = [
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admission Form" }, // Keep distinct from public page?
  // { href: "/assignments", label: "Assignments" }, // Likely dashboard item
  { href: "/departments", label: "Departments" },
  { href: "/alumni", label: "Alumni" },
  { href: "/students", label: "Students Info" }, // Public student life page
  { href: "/gallery", label: "Gallery" },
  // Add other dropdown links here
];

const Header = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="bg-[#295E4F] text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
      {/* Left Side: Logo and Dropdown Trigger */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-white/20"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-[#295E4F] text-white border-r-0 w-[280px] sm:w-[320px]"
          >
            <SheetHeader className="mb-6">
              <SheetTitle className="text-white text-2xl text-left">
                KBHS Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    className="text-lg hover:bg-white/10 p-2 rounded"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <DropdownMenuSeparator className="bg-white/30" />
              <p className="text-sm text-gray-300 px-2 pt-2">More Sections</p>
              {dropdownLinks.map((link) => (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    className="text-lg hover:bg-white/10 p-2 rounded"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            {/* Add footer or auth buttons inside sheet if needed */}
            <SheetFooter className="mt-8">
              {/* Add social links or other footer items here */}
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:opacity-90">
          KBHS
        </Link>

        {/* Desktop Dropdown (Optional, alternative to Sheet trigger) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden md:inline-flex">
            <Button variant="ghost" className="hover:bg-white/20 text-lg ml-2">
              Explore <Menu className="h-5 w-5 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#20483c] text-white border-gray-600">
            <DropdownMenuLabel>More Sections</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/30" />
            {dropdownLinks.map((link) => (
              <DropdownMenuItem
                key={link.href}
                asChild
                className="cursor-pointer hover:bg-white/10 focus:bg-white/10"
              >
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center Navigation (Desktop) */}
      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-lg hover:underline underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right Side: Auth Actions */}
      <div className="flex items-center gap-3">
        {isLoading ? (
          <div className="h-8 w-20 bg-white/20 animate-pulse rounded"></div> // Placeholder while loading
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-white/20"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user?.image ?? ""}
                    alt={session.user?.name ?? "User"}
                  />
                  <AvatarFallback className="bg-sky-500">
                    <User className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white text-black"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-[#295E4F]"
            >
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
