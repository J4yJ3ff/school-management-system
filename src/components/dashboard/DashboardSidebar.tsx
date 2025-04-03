"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  Bell,
  BookOpen,
  ClipboardList,
  BarChart3,
  Home,
  DollarSign,
  Building2,
  UserCog,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { UserRole } from "@/database/User.model";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: NavItem[];
  roles?: UserRole[];
}

interface DashboardSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
  };
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  const navigation: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      href: "/dashboard/students",
      icon: Users,
      roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER],
      submenu: [
        {
          title: "All Students",
          href: "/dashboard/students",
          icon: ChevronRight,
        },
        {
          title: "Add Student",
          href: "/dashboard/students/new",
          icon: ChevronRight,
          roles: [UserRole.ADMIN, UserRole.STAFF],
        },
        {
          title: "Student Attendance",
          href: "/dashboard/students/attendance",
          icon: ChevronRight,
        },
      ],
    },
    {
      title: "Teachers",
      href: "/dashboard/teachers",
      icon: GraduationCap,
      roles: [UserRole.ADMIN, UserRole.STAFF],
      submenu: [
        {
          title: "All Teachers",
          href: "/dashboard/teachers",
          icon: ChevronRight,
        },
        {
          title: "Add Teacher",
          href: "/dashboard/teachers/new",
          icon: ChevronRight,
          roles: [UserRole.ADMIN],
        },
      ],
    },
    {
      title: "Classes",
      href: "/dashboard/classes",
      icon: BookOpen,
      roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER],
    },
    {
      title: "Timetable",
      href: "/dashboard/timetable",
      icon: Calendar,
      roles: [
        UserRole.ADMIN,
        UserRole.STAFF,
        UserRole.TEACHER,
        UserRole.STUDENT,
      ],
    },
    {
      title: "Examinations",
      href: "/dashboard/examinations",
      icon: ClipboardList,
      roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER],
      submenu: [
        {
          title: "Exam Schedule",
          href: "/dashboard/examinations/schedule",
          icon: ChevronRight,
        },
        {
          title: "Results",
          href: "/dashboard/examinations/results",
          icon: ChevronRight,
        },
      ],
    },
    {
      title: "Assignments",
      href: "/dashboard/assignments",
      icon: FileText,
      roles: [UserRole.TEACHER, UserRole.STUDENT],
    },
    {
      title: "Attendance",
      href: "/dashboard/attendance",
      icon: ClipboardList,
      roles: [UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER],
    },
    {
      title: "Finance",
      href: "/dashboard/finance",
      icon: DollarSign,
      roles: [UserRole.ADMIN, UserRole.STAFF],
      submenu: [
        {
          title: "Fee Collection",
          href: "/dashboard/finance/fees",
          icon: ChevronRight,
        },
        {
          title: "Expenses",
          href: "/dashboard/finance/expenses",
          icon: ChevronRight,
        },
        {
          title: "Reports",
          href: "/dashboard/finance/reports",
          icon: ChevronRight,
        },
      ],
    },
    {
      title: "Hostel",
      href: "/dashboard/hostel",
      icon: Building2,
      roles: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
      roles: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      roles: [UserRole.ADMIN],
    },
    {
      title: "User Management",
      href: "/dashboard/users",
      icon: UserCog,
      roles: [UserRole.ADMIN],
    },
    {
      title: "School Website",
      href: "/",
      icon: Home,
    },
  ];

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter((item) => {
    if (!item.roles) return true;
    return user.role && item.roles.includes(user.role as UserRole);
  });

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-[#295E4F] flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="text-xl font-bold">KBHS Admin</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {filteredNavigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuOpen = openSubmenu === item.title;

              // Filter submenu items based on user role
              const filteredSubmenu = item.submenu
                ? item.submenu.filter((subItem) => {
                    if (!subItem.roles) return true;
                    return (
                      user.role && subItem.roles.includes(user.role as UserRole)
                    );
                  })
                : [];

              return (
                <div key={item.title}>
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[#295E4F] text-white"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", {
                          "rotate-180": isSubmenuOpen,
                        })}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[#295E4F] text-white"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  )}

                  {/* Submenu */}
                  {hasSubmenu &&
                    isSubmenuOpen &&
                    filteredSubmenu.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2 dark:border-gray-700">
                        {filteredSubmenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                                isSubActive
                                  ? "bg-gray-100 font-medium text-[#295E4F] dark:bg-gray-800 dark:text-white"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                              )}
                            >
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="border-t p-4 dark:border-gray-800">
          <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">{user.name || "User"}</p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {user.role || "USER"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
